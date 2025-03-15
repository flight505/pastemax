const { app, BrowserWindow, ipcMain, dialog, globalShortcut } = require("electron");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Global variables for directory loading control
let isLoadingDirectory = false;
let loadingTimeoutId = null;
const MAX_DIRECTORY_LOAD_TIME = 30000; // 30 seconds timeout

// Cache for directory contents to avoid repeated processing
const directoryCache = {
  // Format: { path: { timestamp: Date, files: [] } }
  cache: {},
  // Cache expiration time (5 minutes)
  CACHE_EXPIRY: 5 * 60 * 1000,
  
  // Get files from cache if available and not expired
  get: function(path) {
    const normalizedPath = normalizePath(path);
    const entry = this.cache[normalizedPath];
    if (!entry) return null;
    
    // Check if cache is expired
    const now = new Date().getTime();
    if (now - entry.timestamp > this.CACHE_EXPIRY) {
      delete this.cache[normalizedPath];
      return null;
    }
    
    console.log(`Using cached directory content for ${normalizedPath}`);
    return entry.files;
  },
  
  // Store files in cache
  set: function(path, files) {
    const normalizedPath = normalizePath(path);
    this.cache[normalizedPath] = {
      timestamp: new Date().getTime(),
      files: files
    };
    console.log(`Cached directory content for ${normalizedPath}`);
  },
  
  // Clear cache for a specific path or all paths
  clear: function(path = null) {
    if (path) {
      const normalizedPath = normalizePath(path);
      delete this.cache[normalizedPath];
      console.log(`Cleared cache for ${normalizedPath}`);
    } else {
      this.cache = {};
      console.log('Cleared entire directory cache');
    }
  }
};

// Add handling for the 'ignore' module
let ignore;
try {
  ignore = require("ignore");
  console.log("Successfully loaded ignore module");
} catch (err) {
  console.error("Failed to load ignore module:", err);
  // Simple fallback implementation for when the ignore module fails to load
  ignore = {
    // Simple implementation that just matches exact paths
    createFilter: () => {
      return (path) => !excludedFiles.includes(path);
    },
  };
  console.log("Using fallback for ignore module");
}

/**
 * Normalize file paths to use forward slashes regardless of OS
 * This ensures consistent path formatting between main and renderer processes
 */
function normalizePath(filePath) {
  if (!filePath) return filePath;
  return filePath.replace(/\\/g, '/');
}

/**
 * Get the platform-specific path separator
 */
function getPathSeparator() {
  return os.platform() === 'win32' ? '\\' : '/';
}

// Initialize tokenizer with better error handling
let tiktoken;
try {
  tiktoken = require("tiktoken");
  console.log("Successfully loaded tiktoken module");
} catch (err) {
  console.error("Failed to load tiktoken module:", err);
  tiktoken = null;
}

// Import the excluded files list
const { excludedFiles, binaryExtensions } = require("./excluded-files");

// Initialize the encoder once at startup with better error handling
let encoder;
try {
  if (tiktoken) {
    encoder = tiktoken.get_encoding("o200k_base"); // gpt-4o encoding
    console.log("Tiktoken encoder initialized successfully");
  } else {
    throw new Error("Tiktoken module not available");
  }
} catch (err) {
  console.error("Failed to initialize tiktoken encoder:", err);
  // Fallback to a simpler method if tiktoken fails
  console.log("Using fallback token counter");
  encoder = null;
}

// Binary file extensions that should be excluded from token counting
const BINARY_EXTENSIONS = [
  // Images
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".tiff",
  ".ico",
  ".webp",
  ".svg",
  // Audio/Video
  ".mp3",
  ".mp4",
  ".wav",
  ".ogg",
  ".avi",
  ".mov",
  ".mkv",
  ".flac",
  // Archives
  ".zip",
  ".rar",
  ".tar",
  ".gz",
  ".7z",
  // Documents
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".xls",
  ".xlsx",
  // Compiled
  ".exe",
  ".dll",
  ".so",
  ".class",
  ".o",
  ".pyc",
  // Database
  ".db",
  ".sqlite",
  ".sqlite3",
  // Others
  ".bin",
  ".dat",
].concat(binaryExtensions || []); // Add any additional binary extensions from excluded-files.js

// Max file size to read (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Global reference to the mainWindow to prevent garbage collection
let mainWindow;

function createWindow() {
  // Check if we're starting in safe mode (Shift key pressed)
  const isSafeMode = process.argv.includes('--safe-mode');

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      devTools: {
        // Add these settings to prevent Autofill warnings
        isDevToolsExtension: false,
        htmlFullscreen: false,
      },
    },
  });

  // In development, load from Vite dev server
  // In production, load from built files
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    // Use the URL provided by the dev script, or fall back to default
    const startUrl = process.env.ELECTRON_START_URL || "http://localhost:3000";
    // Wait a moment for dev server to be ready
    setTimeout(() => {
      // Clear any cached data to prevent redirection loops
      mainWindow.webContents.session.clearCache().then(() => {
        mainWindow.loadURL(startUrl);
        
        // Notify renderer about startup mode
        mainWindow.webContents.on('did-finish-load', () => {
          mainWindow.webContents.send('startup-mode', { safeMode: isSafeMode });
        });
        
        // Open DevTools in development mode with options to reduce warnings
        if (mainWindow.webContents.isDevToolsOpened()) {
          mainWindow.webContents.closeDevTools();
        }
        mainWindow.webContents.openDevTools({ mode: "detach" });
        console.log(`Loading from dev server at ${startUrl}`);
      });
    }, 1000);
  } else {
    const indexPath = path.join(__dirname, "dist", "index.html");
    console.log(`Loading from built files at ${indexPath}`);

    // Use loadURL with file protocol for better path resolution
    const indexUrl = `file://${indexPath}`;
    mainWindow.loadURL(indexUrl);
    
    // Notify renderer about startup mode
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('startup-mode', { safeMode: isSafeMode });
    });
  }

  // Add basic error handling for failed loads
  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription, validatedURL) => {
      console.error(
        `Failed to load the application: ${errorDescription} (${errorCode})`,
      );
      console.error(`Attempted to load URL: ${validatedURL}`);

      if (isDev) {
        const retryUrl =
          process.env.ELECTRON_START_URL || "http://localhost:3000";
        // Clear cache before retrying
        mainWindow.webContents.session.clearCache().then(() => {
          setTimeout(() => mainWindow.loadURL(retryUrl), 1000);
        });
      } else {
        // Retry with explicit file URL
        const indexPath = path.join(__dirname, "dist", "index.html");
        const indexUrl = `file://${indexPath}`;
        mainWindow.loadURL(indexUrl);
      }
    },
  );
}

app.whenReady().then(() => {
  createWindow();

  // Register ESC key shortcut to cancel directory loading
  globalShortcut.register('Escape', () => {
    if (isLoadingDirectory && mainWindow) {
      console.log('ESC key pressed - cancelling directory loading');
      cancelDirectoryLoading(mainWindow);
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Clean up shortcuts on app quit
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Handle folder selection
ipcMain.on("open-folder", async (event) => {
  // Don't allow selecting a new folder if we're already loading one
  if (isLoadingDirectory) {
    console.log("Directory loading in progress, ignoring new request");
    return;
  }

  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (!result.canceled && result.filePaths && result.filePaths.length > 0) {
      const selectedPath = result.filePaths[0];
      try {
        // Ensure we're only sending a string, not an object
        const pathString = String(selectedPath);
        console.log("Sending folder-selected event with path:", pathString);
        event.sender.send("folder-selected", pathString);
        
        // Set loading state and start timeout
        isLoadingDirectory = true;
        setupDirectoryLoadingTimeout(mainWindow, pathString);
      } catch (err) {
        console.error("Error sending folder-selected event:", err);
        // Try a more direct approach as a fallback
        event.sender.send("folder-selected", String(selectedPath));
      }
    }
  } catch (err) {
    console.error("Error sending folder-selected event:", err);
    // Try a more direct approach as a fallback
    event.sender.send("folder-selected", String(selectedPath));
  }
});

// Function to parse .gitignore file if it exists
function loadGitignore(rootDir) {
  const ig = ignore();
  const gitignorePath = path.join(rootDir, ".gitignore");

  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
    ig.add(gitignoreContent);
  }

  // Add some default ignores that are common
  ig.add([".git", "node_modules", ".DS_Store"]);

  // Add the excludedFiles patterns for gitignore-based exclusion
  ig.add(excludedFiles);

  return ig;
}

// Check if file is binary based on extension
function isBinaryFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.includes(ext);
}

// Count tokens using tiktoken with o200k_base encoding
function countTokens(text) {
  if (!text) return 0;
  
  // Very large files (over 100K) - use approximate counting only
  if (text.length > 100000) {
    console.log(`Using approximate token count for large file (${text.length} chars)`);
    // Rough approximation: ~4 characters per token on average
    return Math.ceil(text.length / 4);
  }
  
  // Normal files - use tiktoken if available
  if (encoder) {
    try {
      const tokens = encoder.encode(text);
      return tokens.length;
    } catch (err) {
      console.error("Error counting tokens:", err);
      // Fallback to character-based estimation on error
      return Math.ceil(text.length / 4);
    }
  } else {
    // Fallback for when tiktoken is not available
    return Math.ceil(text.length / 4);
  }
}

// Function to recursively read files from a directory
function readFilesRecursively(dir, rootDir, ignoreFilter) {
  rootDir = rootDir || dir;
  ignoreFilter = ignoreFilter || loadGitignore(rootDir);

  // Normalize paths for consistent comparisons
  dir = normalizePath(dir);
  rootDir = normalizePath(rootDir);

  let results = [];

  // Skip directories that are obviously going to be very large or problematic
  const dirName = path.basename(dir);
  const skipDirectories = [
    'node_modules', '.git', 'dist', 'build', 'target',
    'bin', 'obj', 'venv', 'env', '.venv', '.env',
    '.next', '.idea', '.gradle', '.cache', 'coverage'
  ];
  
  if (skipDirectories.includes(dirName)) {
    console.log(`Skipping known large directory: ${dir}`);
    return results;
  }

  // Check if this directory is the app's directory or contains .app
  if (dirName.endsWith('.app') || dir === normalizePath(path.resolve(__dirname))) {
    console.log(`Skipping app directory: ${dir}`);
    return results;
  }

  try {
    // Try to read the directory
    let dirents;
    try {
      dirents = fs.readdirSync(dir, { withFileTypes: true });
    } catch (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return results;
    }

    // Quick check if there are too many files in this directory (likely not useful)
    if (dirents.length > 10000) {
      console.log(`Skipping directory with too many files (${dirents.length}): ${dir}`);
      return results;
    }

    // Process directories first, then files
    const directories = [];
    const files = [];

    // First pass: quick filtering
    for (const dirent of dirents) {
      const name = dirent.name;
      
      // Skip hidden files and directories (starting with .)
      if (name.startsWith('.') && name !== '.gitignore') {
        continue;
      }
      
      const fullPath = path.join(dir, name);
      const normalizedPath = normalizePath(fullPath);
      const relativePath = path.relative(rootDir, normalizedPath);

      // Skip if the path is ignored
      if (ignoreFilter.ignores(relativePath)) {
        continue;
      }

      if (dirent.isDirectory()) {
        // Skip .app directories (macOS application bundles)
        if (name.endsWith('.app')) {
          continue;
        }

        // Skip the application's own directory if we're somehow inside it
        const appPath = normalizePath(path.resolve(__dirname));
        if (normalizedPath.startsWith(appPath)) {
          continue;
        }
        
        directories.push(dirent);
      } else if (dirent.isFile()) {
        // Skip file if it's a binary file or too large (quick check by extension)
        const ext = path.extname(name).toLowerCase();
        if (BINARY_EXTENSIONS.includes(ext)) {
          // Add it to results but mark as binary
          results.push({
            name: name,
            path: normalizedPath,
            tokenCount: 0,
            size: 0,
            content: "",
            isBinary: true,
            isSkipped: false,
            fileType: ext.substring(1).toUpperCase(),
          });
        } else {
          files.push(dirent);
        }
      }
    }

    // Process directories recursively but limit depth and count
    let dirCount = 0;
    for (const dirent of directories) {
      if (dirCount++ > 100) {
        console.log(`Limiting directory processing to 100 subdirectories in ${dir}`);
        break;
      }
      
      const fullPath = path.join(dir, dirent.name);
      const normalizedPath = normalizePath(fullPath);
      // Recursively read subdirectory
      const subResults = readFilesRecursively(normalizedPath, rootDir, ignoreFilter);
      results = results.concat(subResults);
    }

    // Process files but limit to a reasonable number
    let fileCount = 0;
    for (const dirent of files) {
      if (fileCount++ > 1000) {
        console.log(`Limiting file processing to 1000 files in ${dir}`);
        break;
      }
      
      const fullPath = path.join(dir, dirent.name);
      const normalizedPath = normalizePath(fullPath);
      
      try {
        // Get file stats for size
        const stats = fs.statSync(normalizedPath);
        const fileSize = stats.size;

        // Skip files that are too large
        if (fileSize > MAX_FILE_SIZE) {
          results.push({
            name: dirent.name,
            path: normalizedPath,
            tokenCount: 0,
            size: fileSize,
            content: "",
            isBinary: false,
            isSkipped: true,
            error: "File too large to process",
          });
          continue;
        }

        // Check if the file is binary
        const isBinary = isBinaryFile(normalizedPath);

        if (isBinary) {
          // Skip token counting for binary files
          results.push({
            name: dirent.name,
            path: normalizedPath,
            tokenCount: 0,
            size: fileSize,
            content: "",
            isBinary: true,
            isSkipped: false,
            fileType: path.extname(normalizedPath).substring(1).toUpperCase(),
          });
        } else {
          // Read file content
          const fileContent = fs.readFileSync(normalizedPath, "utf8");

          // Calculate token count
          const tokenCount = countTokens(fileContent);

          // Add file info with content and token count
          results.push({
            name: dirent.name,
            path: normalizedPath,
            content: fileContent,
            tokenCount: tokenCount,
            size: fileSize,
            isBinary: false,
            isSkipped: false,
          });
        }
      } catch (err) {
        console.error(`Error reading file ${normalizedPath}:`, err);
        results.push({
          name: dirent.name,
          path: normalizedPath,
          tokenCount: 0,
          size: 0,
          isBinary: false,
          isSkipped: true,
          error: "Could not read file",
        });
      }
    }
  } catch (err) {
    console.error(`Error processing directory ${dir}:`, err);
  }

  return results;
}

// Handle file list request
ipcMain.on("request-file-list", (event, data) => {
  try {
    // Allow either simple string or object with options
    const folderPath = typeof data === 'string' ? data : data.path;
    const forceRefresh = typeof data === 'object' && data.forceRefresh === true;
    
    console.log("Processing file list for folder:", folderPath);
    console.log("OS platform:", os.platform());
    console.log("Path separator:", getPathSeparator());
    
    // Check cache first (unless forced refresh)
    if (!forceRefresh) {
      const cachedFiles = directoryCache.get(folderPath);
      if (cachedFiles) {
        console.log(`Using ${cachedFiles.length} cached files for ${folderPath}`);
        
        // Send cached files immediately
        event.sender.send("file-processing-status", {
          status: "complete",
          message: `Found ${cachedFiles.length} files (from cache)`,
        });
        
        event.sender.send("file-list-data", cachedFiles);
        return;
      }
    } else {
      console.log("Force refreshing directory:", folderPath);
      directoryCache.clear(folderPath);
    }

    // Send initial progress update
    event.sender.send("file-processing-status", {
      status: "processing",
      message: "Scanning directory structure...",
    });

    // Process files in chunks to avoid blocking the UI
    const processFiles = () => {
      // First, get all files in the directory
      const files = readFilesRecursively(folderPath, folderPath);
      console.log(`Found ${files.length} files in ${folderPath}`);

      // Update with initial processing status
      event.sender.send("file-processing-status", {
        status: "processing",
        message: `Processing ${files.length} files...`,
      });

      // Optimize chunk size based on file count
      const CHUNK_SIZE = files.length < 100 ? 50 : 20; // Larger chunks for small directories
      let currentIndex = 0;
      const processedFiles = [];

      const processNextChunk = () => {
        // Calculate the end index for this chunk
        const endIndex = Math.min(currentIndex + CHUNK_SIZE, files.length);
        
        // Get the chunk of files to process
        const currentChunk = files.slice(currentIndex, endIndex);
        
        // Process each file in the chunk
        currentChunk.forEach(file => {
          // Normalize the path to use forward slashes consistently
          const normalizedPath = normalizePath(file.path);
          
          // Create a clean file object
          processedFiles.push({
            name: file.name ? String(file.name) : "",
            path: normalizedPath, // Use normalized path
            tokenCount: typeof file.tokenCount === "number" ? file.tokenCount : 0,
            size: typeof file.size === "number" ? file.size : 0,
            content: file.isBinary
              ? ""
              : typeof file.content === "string"
              ? file.content
              : "",
            isBinary: Boolean(file.isBinary),
            isSkipped: Boolean(file.isSkipped),
            error: file.error ? String(file.error) : null,
            fileType: file.fileType ? String(file.fileType) : null,
            excludedByDefault: shouldExcludeByDefault(normalizedPath, normalizePath(folderPath)),
          });
        });
        
        // Update the current index
        currentIndex = endIndex;
        
        // Update progress
        const progressPercentage = Math.round((currentIndex / files.length) * 100);
        event.sender.send("file-processing-status", {
          status: "processing",
          message: `Processing files... ${progressPercentage}% (${currentIndex}/${files.length})`,
        });
        
        // If there are more files to process, schedule the next chunk
        if (currentIndex < files.length) {
          // Use setTimeout to allow the UI to update between chunks
          setTimeout(processNextChunk, 0);
        } else {
          // All files processed, send the complete list
          console.log(`Finished processing all ${processedFiles.length} files`);
          
          // Cache the processed files
          directoryCache.set(folderPath, processedFiles);
          
          // Send completion status
          event.sender.send("file-processing-status", {
            status: "complete",
            message: `Found ${processedFiles.length} files`,
          });
          
          try {
            console.log(`Sending ${processedFiles.length} files to renderer`);
            // Log a sample of paths to check normalization
            if (processedFiles.length > 0) {
              console.log("Sample file paths (first 3):");
              processedFiles.slice(0, 3).forEach(file => {
                console.log(`- ${file.path}`);
              });
            }
            
            // Send the files to the renderer process
            event.sender.send("file-list-data", processedFiles);
            
            // Clear loading state
            isLoadingDirectory = false;
            if (loadingTimeoutId) {
              clearTimeout(loadingTimeoutId);
              loadingTimeoutId = null;
            }
          } catch (sendErr) {
            console.error("Error sending file data:", sendErr);
            
            // If sending fails, try again with minimal data
            const minimalFiles = processedFiles.map((file) => ({
              name: file.name,
              path: file.path,
              tokenCount: file.tokenCount,
              size: file.size,
              isBinary: file.isBinary,
              isSkipped: file.isSkipped,
              excludedByDefault: file.excludedByDefault,
            }));
            
            event.sender.send("file-list-data", minimalFiles);
            
            // Clear loading state
            isLoadingDirectory = false;
            if (loadingTimeoutId) {
              clearTimeout(loadingTimeoutId);
              loadingTimeoutId = null;
            }
          }
        }
      };
      
      // Start processing the first chunk
      processNextChunk();
    };

    // Start processing files
    processFiles();
  } catch (error) {
    console.error("Error processing file list:", error);
    
    // Send error status to the renderer
    event.sender.send("file-processing-status", {
      status: "error",
      message: `Error loading directory: ${error.message}`,
    });
    
    // Clear loading state on error
    isLoadingDirectory = false;
    if (loadingTimeoutId) {
      clearTimeout(loadingTimeoutId);
      loadingTimeoutId = null;
    }
  }
});

// Check if a file should be excluded by default, using glob matching
function shouldExcludeByDefault(filePath, rootDir) {
  // Normalize both paths to ensure consistent handling
  filePath = normalizePath(filePath);
  rootDir = normalizePath(rootDir);
  
  try {
    // Ensure we're using a relative path for pattern matching
    let relativePath = filePath;
    if (filePath.startsWith(rootDir)) {
      relativePath = path.relative(rootDir, filePath);
    }
    
    // Normalize for consistent pattern matching
    const relativePathNormalized = normalizePath(relativePath);
    
    // Use the ignore package to do glob pattern matching
    const ig = ignore().add(excludedFiles);
    return ig.ignores(relativePathNormalized);
  } catch (err) {
    console.error(`Error checking if file should be excluded: ${filePath}`, err);
    // Default to not excluding in case of an error
    return false;
  }
}

// Add a debug handler for file selection
ipcMain.on("debug-file-selection", (event, data) => {
  console.log("DEBUG - File Selection:", data);
});

// Handle reload file list request (force refresh)
ipcMain.on("reload-file-list", (event, folderPath) => {
  if (!folderPath) return;
  
  console.log(`Forcing reload of file list for ${folderPath}`);
  directoryCache.clear(folderPath);
  
  // Request file list with force refresh flag
  event.sender.send("file-processing-status", {
    status: "processing",
    message: "Reloading directory...",
  });
  
  // Process the request
  try {
    const data = {
      path: folderPath,
      forceRefresh: true
    };
    ipcMain.emit("request-file-list", event, data);
  } catch (err) {
    console.error("Error reloading file list:", err);
    event.sender.send("file-processing-status", {
      status: "error",
      message: `Error reloading directory: ${err.message}`,
    });
  }
});

// Function to cancel loading directory
function cancelDirectoryLoading(window) {
  isLoadingDirectory = false;
  
  if (loadingTimeoutId) {
    clearTimeout(loadingTimeoutId);
    loadingTimeoutId = null;
  }
  
  window.webContents.send("file-processing-status", {
    status: "error",
    message: "Directory loading cancelled - try selecting a smaller directory",
  });
}

// Handler for directory loading timeout
function setupDirectoryLoadingTimeout(window, folderPath) {
  // Clear any existing timeout
  if (loadingTimeoutId) {
    clearTimeout(loadingTimeoutId);
  }
  
  // Set a new timeout
  loadingTimeoutId = setTimeout(() => {
    console.log(`Directory loading timed out after ${MAX_DIRECTORY_LOAD_TIME / 1000} seconds: ${folderPath}`);
    cancelDirectoryLoading(window);
  }, MAX_DIRECTORY_LOAD_TIME);
}

// Handle cancel directory loading request
ipcMain.on("cancel-directory-loading", (event) => {
  if (isLoadingDirectory) {
    console.log("Received cancel directory loading request");
    cancelDirectoryLoading(mainWindow);
  }
});

// This module pattern is preserved
module.exports = { app, BrowserWindow };
