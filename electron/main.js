const { app, BrowserWindow, ipcMain, dialog, globalShortcut, shell } = require("electron");
const fs = require("fs");
const path = require("path");
const os = require("os");
const minimatch = require("minimatch");
const { promisify } = require("util");
const micromatch = require('micromatch');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const { execSync } = require('child_process');
const { excludedFiles, binaryExtensions, systemExclusions, defaultUserPatterns } = require("./excluded-files");
const ignore = require("ignore");

// For backward compatibility - use systemExclusions as the new single source of truth
const DEFAULT_EXCLUSIONS = systemExclusions;

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
      this.clearAll();
    }
  },
  
  // Clear all cached entries
  clearAll: function() {
    this.cache = {};
    console.log('Cleared all directory caches');
  }
};

// Add handling for the 'ignore' module
try {
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
// Already imported at the top of the file, so this is removed to prevent duplicate declaration
// const { excludedFiles, binaryExtensions, universalExclusions } = require("./excluded-files");

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

// Add promisify for fs operations
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

// Create a clear pattern organization system with three distinct categories:
// 1. SYSTEM_EXCLUSIONS: Always excluded, not user-configurable (binary files, media, etc.)
// 2. DEFAULT_USER_PATTERNS: Initial user-editable patterns, restored on reset
// 3. Current user patterns: Stored in global_patterns.ignore or .repo_ignore files

// Category 1: System-level exclusions (not user-editable)
const SYSTEM_EXCLUSIONS = [
  // Version control
  "**/.git/**",
  "**/.svn/**",
  "**/.hg/**",
  
  // Build artifacts and dependencies
  "**/node_modules/**", 
  "**/dist/**",
  "**/build/**",
  "**/.next/**",
  
  // Cache files
  "**/.cache/**",
  "**/__pycache__/**",
  
  // Logs
  "**/logs/**",
  "**/*.log",
  
  // IDE files
  "**/.idea/**",
  "**/.vscode/**",
  
  // OS files
  "**/.DS_Store",
  "**/Thumbs.db"
];

// Category 2: Default user patterns (user-editable, used when resetting to defaults)
const DEFAULT_USER_PATTERNS = ""; // Start with empty patterns

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Set Content Security Policy
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'"
        ]
      }
    });
  });

  // Load the app
  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, "dist", "index.html")}`;
  mainWindow.loadURL(startUrl);

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  // Open dev tools in development
  if (process.env.ELECTRON_START_URL) {
    mainWindow.webContents.openDevTools();
  }

  // Add basic error handling for failed loads
  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription, validatedURL) => {
      console.error(
        `Failed to load the application: ${errorDescription} (${errorCode})`,
      );
      console.error(`Attempted to load URL: ${validatedURL}`);

      if (process.env.ELECTRON_START_URL) {
        // Retry with explicit file URL
        const indexPath = path.join(__dirname, "dist", "index.html");
        const indexUrl = `file://${indexPath}`;
        mainWindow.loadURL(indexUrl);
      }
    },
  );

  // Handle window ready-to-show event
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window closed event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

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

// Helper function to check if window is valid and can receive messages
function isWindowValid(window) {
  try {
    return window && !window.isDestroyed() && window.webContents;
  } catch (error) {
    console.error('Error checking window validity:', error);
    return false;
  }
}

// Function to safely send to renderer
function safeRendererSend(window, channel, ...args) {
  try {
    if (!isWindowValid(window)) {
      console.warn(`Cannot send to renderer (${channel}): window is not valid`);
      return false;
    }
    window.webContents.send(channel, ...args);
    return true;
  } catch (error) {
    console.error(`Error sending to renderer (${channel}):`, error);
    return false;
  }
}

// Function to get all patterns (system + user)
function getAllPatterns(userPatterns) {
  // Combine system exclusions with user patterns
  // System exclusions always apply and come first
  return [...SYSTEM_EXCLUSIONS, ...(userPatterns || [])];
}

// Parse patterns to extract disabled system patterns
const parsePatterns = (content) => {
  const lines = content.split('\n');
  const excludedPatterns = [];
  const userPatterns = [];
  
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('# DISABLED:')) {
      excludedPatterns.push(trimmed.substring('# DISABLED:'.length).trim());
    } else if (trimmed !== '' && !trimmed.startsWith('#')) {
      userPatterns.push(line);
    }
  });
  
  return {
    excludedPatterns,
    userPatterns: userPatterns.join('\n')
  };
};

// Update IPC handlers with improved error handling
ipcMain.on("open-folder", async (event) => {
  try {
    // Don't allow selecting a new folder if we're already loading one
    if (isLoadingDirectory) {
      console.log("Directory loading in progress, ignoring new request");
      return;
    }

    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      const selectedPath = result.filePaths[0];
      try {
        // Ensure we're only sending a string, not an object
        const pathString = String(selectedPath);
        
        if (isWindowValid(mainWindow)) {
          console.log("Sending folder-selected event with path:", pathString);
          if (safeRendererSend(mainWindow, "folder-selected", pathString)) {
            // Set loading state and start timeout only if send was successful
            isLoadingDirectory = true;
            setupDirectoryLoadingTimeout(mainWindow, pathString);
          }
        }
      } catch (error) {
        console.error("Error processing selected folder:", error);
        safeRendererSend(mainWindow, "file-processing-status", {
          status: "error",
          message: "Error processing selected folder"
        });
      }
    }
  } catch (error) {
    console.error("Error in open-folder dialog:", error);
    safeRendererSend(mainWindow, "file-processing-status", {
      status: "error",
      message: "Error opening folder dialog"
    });
  }
});

ipcMain.on("request-file-list", (event, data) => {
  try {
    if (!isWindowValid(mainWindow)) {
      console.warn("Window is not valid for request-file-list");
      return;
    }
    handleRequestFileList(event, data);
  } catch (error) {
    console.error("Error in request-file-list handler:", error);
  }
});

ipcMain.on("reload-file-list", (event, folderPath) => {
  try {
    if (!isWindowValid(mainWindow)) {
      console.warn("Window is not valid for reload-file-list");
      return;
    }
    
    if (!folderPath) return;
    
    console.log(`Forcing reload of file list for ${folderPath}`);
    directoryCache.clear(folderPath);
    
    mainWindow.webContents.send("file-processing-status", {
      status: "processing",
      message: "Reloading directory...",
    });
    
    // Process the request directly using the same handler for request-file-list
    try {
      // Create data object with force refresh flag
      const data = {
        path: folderPath,
        forceRefresh: true
      };
      
      // Handle the request-file-list directly
      handleRequestFileList(event, data);
    } catch (err) {
      console.error("Error reloading file list:", err);
      if (isWindowValid(mainWindow)) {
        mainWindow.webContents.send("file-processing-status", {
          status: "error",
          message: `Error reloading directory: ${err.message}`,
        });
      }
    }
  } catch (error) {
    console.error("Error in reload-file-list handler:", error);
  }
});

// Function to cancel loading directory with improved error handling
function cancelDirectoryLoading(window) {
  try {
    if (!isWindowValid(window)) {
      console.warn("Window is not valid for cancelDirectoryLoading");
      return;
    }

    isLoadingDirectory = false;
    
    if (loadingTimeoutId) {
      clearTimeout(loadingTimeoutId);
      loadingTimeoutId = null;
    }
    
    safeRendererSend(window, "file-processing-status", {
      status: "error",
      message: "Directory loading cancelled - try selecting a smaller directory",
    });
  } catch (error) {
    console.error("Error in cancelDirectoryLoading:", error);
    // Try to reset state even if sending to renderer failed
    isLoadingDirectory = false;
    loadingTimeoutId = null;
  }
}

// Handler for directory loading timeout with improved error handling
function setupDirectoryLoadingTimeout(window, folderPath) {
  try {
    if (!isWindowValid(window)) {
      console.warn("Window is not valid for setupDirectoryLoadingTimeout");
      return;
    }

    // Clear any existing timeout
    if (loadingTimeoutId) {
      clearTimeout(loadingTimeoutId);
    }
    
    // Set a new timeout
    loadingTimeoutId = setTimeout(() => {
      try {
        console.log(`Directory loading timed out after ${MAX_DIRECTORY_LOAD_TIME / 1000} seconds: ${folderPath}`);
        
        if (isWindowValid(window)) {
          cancelDirectoryLoading(window);
        } else {
          // Just clean up the loading state without window reference
          isLoadingDirectory = false;
          loadingTimeoutId = null;
          console.log("Directory loading timed out but window is no longer available");
        }
      } catch (error) {
        console.error("Error in directory loading timeout handler:", error);
        // Ensure we clean up state even if there's an error
        isLoadingDirectory = false;
        loadingTimeoutId = null;
      }
    }, MAX_DIRECTORY_LOAD_TIME);
  } catch (error) {
    console.error("Error setting up directory loading timeout:", error);
    // Clean up state on error
    isLoadingDirectory = false;
    if (loadingTimeoutId) {
      clearTimeout(loadingTimeoutId);
      loadingTimeoutId = null;
    }
  }
}

ipcMain.on("cancel-directory-loading", (event) => {
  try {
    if (!isWindowValid(mainWindow)) {
      console.warn("Window is not valid for cancel-directory-loading");
      return;
    }
    
    if (isLoadingDirectory) {
      console.log("Received cancel directory loading request");
      cancelDirectoryLoading(mainWindow);
    }
  } catch (error) {
    console.error("Error in cancel-directory-loading handler:", error);
  }
});

// Update async handlers with improved error handling and window checks
ipcMain.handle('load-ignore-patterns', async (event, { folderPath, isGlobal }) => {
  try {
    if (!isWindowValid(mainWindow)) {
      console.warn("Window not initialized yet or destroyed");
      return { 
        success: true, 
        patterns: isGlobal ? DEFAULT_USER_PATTERNS : '',
        systemPatterns: SYSTEM_EXCLUSIONS,
        excludedPatterns: []
      };
    }

    if (isGlobal) {
      try {
        const appDataPath = app.getPath('userData');
        const globalIgnorePath = path.join(appDataPath, 'global_patterns.ignore');
        
        if (fs.existsSync(globalIgnorePath)) {
          const content = await readFile(globalIgnorePath, 'utf8');
          const { excludedPatterns, userPatterns } = parsePatterns(content);
          console.log(`Loaded global ignore patterns from ${globalIgnorePath}`);
          return { 
            success: true, 
            patterns: userPatterns,
            systemPatterns: SYSTEM_EXCLUSIONS,
            excludedPatterns
          };
        } else {
          console.log('No global ignore patterns file found, creating with defaults');
          try {
            if (!fs.existsSync(appDataPath)) {
              fs.mkdirSync(appDataPath, { recursive: true });
            }
            await writeFile(globalIgnorePath, DEFAULT_USER_PATTERNS, 'utf8');
            console.log(`Created default global ignore patterns at ${globalIgnorePath}`);
          } catch (error) {
            console.error('Error creating default global patterns:', error);
          }
          return { 
            success: true, 
            patterns: DEFAULT_USER_PATTERNS,
            systemPatterns: SYSTEM_EXCLUSIONS,
            excludedPatterns: []
          };
        }
      } catch (error) {
        console.error('Error handling global patterns:', error);
        return { 
          success: true, 
          patterns: DEFAULT_USER_PATTERNS,
          systemPatterns: SYSTEM_EXCLUSIONS,
          excludedPatterns: []
        };
      }
    } else {
      try {
        if (!folderPath) {
          return { 
            success: true, 
            patterns: '',
            systemPatterns: SYSTEM_EXCLUSIONS,
            excludedPatterns: []
          };
        }
        
        const ignoreFilePath = path.join(folderPath, '.repo_ignore');
        if (fs.existsSync(ignoreFilePath)) {
          const content = await readFile(ignoreFilePath, 'utf8');
          const { excludedPatterns, userPatterns } = parsePatterns(content);
          console.log(`Loaded local ignore patterns from ${ignoreFilePath}`);
          return { 
            success: true, 
            patterns: userPatterns,
            systemPatterns: SYSTEM_EXCLUSIONS,
            excludedPatterns
          };
        } else {
          console.log(`No local ignore patterns file found at ${ignoreFilePath}`);
          return { 
            success: true, 
            patterns: '',
            systemPatterns: SYSTEM_EXCLUSIONS,
            excludedPatterns: []
          };
        }
      } catch (error) {
        console.error('Error handling local patterns:', error);
        return { 
          success: true, 
          patterns: '',
          systemPatterns: SYSTEM_EXCLUSIONS,
          excludedPatterns: []
        };
      }
    }
  } catch (error) {
    console.error('Error in load-ignore-patterns handler:', error);
    return { 
      success: true, 
      patterns: isGlobal ? DEFAULT_USER_PATTERNS : '',
      systemPatterns: SYSTEM_EXCLUSIONS,
      excludedPatterns: []
    };
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

  // Get actual app paths for comparison
  const appDirectoryPath = normalizePath(app.getAppPath());
  const resourcesPath = path.dirname(appDirectoryPath);
  
  // Skip ONLY if it's the exact running app directory or its Resources parent
  const isRunningAppDirectory = 
      dir === appDirectoryPath || 
      dir === resourcesPath || 
      dir === normalizePath(path.resolve(__dirname));
  
  if (isRunningAppDirectory) {
    console.log(`Skipping running application directory: ${dir}`);
    return [{
      name: "_APP_DIRECTORY_",
      path: dir,
      content: "Please select a project directory instead of the PasteMax application directory.",
      tokenCount: 0,
      size: 0,
      isBinary: false,
      isSkipped: true,
      error: "This is the running PasteMax application directory. Please select a different project directory.",
      isAppDirectory: true
    }];
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
        const appDirectoryPath = normalizePath(app.getAppPath());
        const resourcesPath = path.dirname(appDirectoryPath);
        
        // Compare with exact app path instead of just checking if it starts with app path
        if (normalizedPath === appDirectoryPath || normalizedPath === resourcesPath) {
          console.log(`Skipping running app directory: ${normalizedPath}`);
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

// Extract file list processing into a reusable function
function handleRequestFileList(event, data) {
  try {
    // Allow either simple string or object with options
    const folderPath = typeof data === 'string' ? data : data.path;
    
    if (!folderPath) {
      console.log("No folder path provided");
      event.sender.send("file-processing-status", {
        status: "error",
        message: "No folder selected. Please select a project directory.",
      });
      return;
    }
    
    const forceRefresh = typeof data === 'object' && data.forceRefresh === true;
    
    console.log("Processing file list for folder:", folderPath);
    console.log("OS platform:", os.platform());
    console.log("Path separator:", getPathSeparator());
    
    // Get actual app paths for comparison
    const normalizedFolderPath = normalizePath(folderPath);
    const appDirectoryPath = normalizePath(app.getAppPath());
    const resourcesPath = path.dirname(appDirectoryPath);
    
    // Check ONLY if it's the exact running app directory or its Resources parent
    const isRunningAppDirectory = 
        normalizedFolderPath === appDirectoryPath || 
        normalizedFolderPath === resourcesPath || 
        normalizedFolderPath === normalizePath(path.resolve(__dirname));
    
    if (isRunningAppDirectory) {
      console.log(`Preventing recursive scan of running app instance at: ${appDirectoryPath}`);
      console.log(`Selected path: ${normalizedFolderPath}`);
      
      event.sender.send("file-list-data", [{
        name: "_APP_DIRECTORY_",
        path: normalizedFolderPath,
        content: "Please select a project directory instead of the PasteMax application directory.",
        tokenCount: 0,
        size: 0,
        isBinary: false,
        isSkipped: true,
        error: "This is the running PasteMax application directory. Please select a different project directory.",
        isAppDirectory: true
      }]);
      
      event.sender.send("file-processing-status", {
        status: "error",
        message: "Please select a project directory instead of the PasteMax application.",
      });
      
      return;
    }
    
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
        
        // Check cached files for reload functionality too
        if (data.forceRefresh) {
          // If forceRefresh is specified, ensure excluded property is set correctly
          cachedFiles = cachedFiles.map(file => {
            const normalizedPath = normalizePath(file.path);
            const isExcluded = shouldExcludeByDefault(normalizedPath, folderPath);
            return {
              ...file,
              excludedByDefault: isExcluded,
              excluded: isExcluded
            };
          });
        }
        
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
    
    // Set loading flag
    isLoadingDirectory = true;
    
    // Set timeout to abort if it takes too long
    if (loadingTimeoutId) {
      clearTimeout(loadingTimeoutId);
    }
    loadingTimeoutId = setTimeout(() => {
      if (isLoadingDirectory) {
        console.log("Loading directory timed out");
        cancelDirectoryLoading(mainWindow);
      }
    }, 120000); // 2 minutes timeout
    
    // Rest of your original file processing logic
    // ...
    
    // Start processing files logic goes here (unchanged from the original function)
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
          
          // Check if file should be excluded by patterns
          const isExcluded = shouldExcludeByDefault(normalizedPath, folderPath);
          
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
            excludedByDefault: isExcluded,
            excluded: isExcluded, // Set the excluded property as well
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
    console.error("Error processing files:", error);
    event.sender.send("file-processing-status", {
      status: "error",
      message: `Error processing files: ${error.message}`,
    });
    
    // Clear loading state
    isLoadingDirectory = false;
    if (loadingTimeoutId) {
      clearTimeout(loadingTimeoutId);
      loadingTimeoutId = null;
    }
  }
}

// Check if a file should be excluded by default, using gitignore-style pattern matching
// Create a pattern cache to avoid recreating ignore instances
const patternCache = {
  global: null,
  local: {},  // Cache by rootDir
  combined: {}, // Cache by rootDir
  excludedLocal: {}, // Initialize excludedLocal object
  excludedGlobal: [] // Initialize excludedGlobal array
};

// Counter to limit debug output
let debugCounter = 0;
const MAX_DEBUG_FILES = 5;

function shouldExcludeByDefault(filePath, rootDir) {
  // Normalize both paths to ensure consistent handling
  const normalizedPath = normalizePath(filePath);
  const normalizedRoot = normalizePath(rootDir);
  
  // Use cached ignore instance if available
  if (!patternCache.combined[rootDir]) {
    // Initialize cache for this root directory
    const ig = ignore();
    
    // Track all patterns for debugging
    let allPatterns = [];
    
    // Add built-in patterns - convert array to a proper string format for the ignore package
    const builtInPatterns = [...excludedFiles, ...DEFAULT_EXCLUSIONS];
    ig.add(builtInPatterns);
    allPatterns = builtInPatterns;
    
    // Try to load global patterns if not already cached
    if (!patternCache.global) {
      try {
        const appDataPath = app.getPath('userData');
        const globalIgnorePath = path.join(appDataPath, 'global_patterns.ignore');
        
        if (fs.existsSync(globalIgnorePath)) {
          const content = fs.readFileSync(globalIgnorePath, 'utf8');
          if (content.trim()) {
            const { excludedPatterns, userPatterns } = parsePatterns(content);
            // Cache global patterns and excluded patterns
            patternCache.global = userPatterns;
            patternCache.excludedGlobal = excludedPatterns;
          }
        }
      } catch (err) {
        console.error('Error loading global ignore patterns:', err);
        patternCache.global = '';
        patternCache.excludedGlobal = [];
      }
    }
    
    // Add global patterns if available
    if (patternCache.global) {
      ig.add(patternCache.global);
    }
    
    // Try to load local patterns if not already cached
    if (!patternCache.local[rootDir]) {
      try {
        const ignoreFilePath = path.join(rootDir, '.repo_ignore');
        if (fs.existsSync(ignoreFilePath)) {
          const content = fs.readFileSync(ignoreFilePath, 'utf8');
          if (content.trim()) {
            const { excludedPatterns, userPatterns } = parsePatterns(content);
            // Cache local patterns and excluded patterns
            patternCache.local[rootDir] = userPatterns;
            patternCache.excludedLocal[rootDir] = excludedPatterns;
          } else {
            patternCache.local[rootDir] = '';
            patternCache.excludedLocal[rootDir] = [];
          }
        } else {
          patternCache.local[rootDir] = '';
          patternCache.excludedLocal[rootDir] = [];
        }
      } catch (err) {
        console.error('Error loading local ignore patterns:', err);
        patternCache.local[rootDir] = '';
        patternCache.excludedLocal[rootDir] = [];
      }
    }
    
    // Add local patterns if available
    if (patternCache.local[rootDir]) {
      ig.add(patternCache.local[rootDir]);
    }
    
    // Cache the ignore instance
    patternCache.combined[rootDir] = ig;
  }
  
  // Get the ignore instance from cache
  const ig = patternCache.combined[rootDir];
  
  // Check if the file should be ignored
  const relativePath = path.relative(normalizedRoot, normalizedPath);
  const shouldIgnore = ig.ignores(relativePath);
  
  // Check if the pattern that would ignore this file is disabled
  if (shouldIgnore) {
    const excludedGlobal = patternCache.excludedGlobal || [];
    const excludedLocal = patternCache.excludedLocal[rootDir] || [];
    const allExcluded = [...excludedGlobal, ...excludedLocal];
    
    // If any pattern that would match this file is disabled, don't ignore it
    for (const pattern of allExcluded) {
      try {
        if (minimatch(relativePath, pattern)) {
          return false;
        }
      } catch (e) {
        console.error(`Error with minimatch for pattern "${pattern}":`, e);
        // Continue processing other patterns if one fails
      }
    }
  }
  
  return shouldIgnore;
}

// Function to clear pattern cache when patterns change
function clearPatternCache(rootDir) {
  if (rootDir) {
    delete patternCache.local[rootDir];
    delete patternCache.combined[rootDir];
    delete patternCache.excludedLocal[rootDir];
  } else {
    patternCache.global = null;
    patternCache.local = {};
    patternCache.combined = {};
    patternCache.excludedLocal = {};
    patternCache.excludedGlobal = [];
  }
  debugCounter = 0;
}

// Add a debug handler for file selection
ipcMain.on("debug-file-selection", (event, data) => {
  console.log("DEBUG - File Selection:", data);
});

// Handle resetting patterns to defaults
ipcMain.handle('reset-ignore-patterns', async (event, { folderPath, isGlobal }) => {
  try {
    if (isGlobal) {
      // Reset global patterns to defaults
      const appDataPath = app.getPath('userData');
      const globalIgnorePath = path.join(appDataPath, 'global_patterns.ignore');
      
      // Write default patterns to the file
      await writeFile(globalIgnorePath, DEFAULT_USER_PATTERNS);
      console.log(`Reset global ignore patterns to defaults at ${globalIgnorePath}`);
      
      // Clear all pattern caches to ensure new patterns are applied
      clearPatternCache();
      
      // Clear all directory caches to ensure new patterns are applied
      directoryCache.clearAll();
      
      return { 
        success: true, 
        patterns: DEFAULT_USER_PATTERNS,
        systemPatterns: SYSTEM_EXCLUSIONS
      };
    } else {
      // Reset local patterns (delete the file)
      if (!folderPath) {
        return { success: false, error: 'No folder path provided' };
      }
      
      const ignoreFilePath = path.join(folderPath, '.repo_ignore');
      if (fs.existsSync(ignoreFilePath)) {
        fs.unlinkSync(ignoreFilePath);
        console.log(`Deleted local ignore file at ${ignoreFilePath}`);
      }
      
      // Clear pattern cache for this folder
      clearPatternCache(folderPath);
      
      // Clear cache for this folder
      directoryCache.clear(folderPath);
      
      return { 
        success: true, 
        patterns: '',
        systemPatterns: SYSTEM_EXCLUSIONS
      };
    }
  } catch (error) {
    console.error('Error resetting ignore patterns:', error);
    return { success: false, error: error.message };
  }
});

// Handle clearing ignore patterns (only for local patterns)
ipcMain.handle('clear-local-ignore-patterns', async (event, { folderPath }) => {
  console.log('Clearing local ignore patterns for:', folderPath);
  
  try {
    if (!folderPath) {
      return { success: false, error: 'No folder path provided' };
    }

    const result = await clearLocalIgnorePatterns(folderPath);
    
    // Clear the cache for this folder to ensure patterns are reloaded
    if (patternCache.combined[folderPath]) {
      delete patternCache.combined[folderPath];
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error in clear-local-ignore-patterns handler:', error);
    return { success: false, error: String(error) };
  }
});

// Disable security warnings in development mode
// These warnings don't appear in production builds anyway
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

// Enable clipboard reading/writing (for security reasons, this is restricted by default)
app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer');

// This module pattern is preserved
module.exports = { 
  app, 
  BrowserWindow,
  // Export pattern-related functions
  shouldExcludeByDefault,
  getAllPatterns,
  loadGitignore,
  normalizePath
};

/**
 * Clears local ignore patterns for a specific folder
 * @param {string} folderPath - Path of the folder for which to clear ignore patterns
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
async function clearLocalIgnorePatterns(folderPath) {
  try {
    const ignoreFilePath = path.join(folderPath, '.repo_ignore');
    
    // Delete the file if it exists
    if (fs.existsSync(ignoreFilePath)) {
      await unlink(ignoreFilePath);
      console.log(`Cleared local ignore patterns by deleting ${ignoreFilePath}`);
    } else {
      console.log(`No local ignore file found at ${ignoreFilePath}, nothing to clear`);
    }
    
    // Clear pattern cache for this folder
    clearPatternCache(folderPath);
    
    // Clear cache for this folder
    directoryCache.clear(folderPath);
    
    return true;
  } catch (error) {
    console.error('Error clearing local ignore patterns:', error);
    throw error;
  }
}

// Handle saving ignore patterns
ipcMain.handle('save-ignore-patterns', async (event, { patterns, isGlobal, folderPath }) => {
  try {
    if (!isWindowValid(mainWindow)) {
      console.warn("Window not initialized yet or destroyed");
      return { success: false, error: 'Window not initialized' };
    }

    if (isGlobal) {
      try {
        const appDataPath = app.getPath('userData');
        const globalIgnorePath = path.join(appDataPath, 'global_patterns.ignore');
        
        // Ensure directory exists
        if (!fs.existsSync(appDataPath)) {
          await fs.promises.mkdir(appDataPath, { recursive: true });
        }
        
        // Write patterns to file
        await fs.promises.writeFile(globalIgnorePath, patterns, 'utf8');
        console.log(`Saved global ignore patterns to ${globalIgnorePath}`);
        
        // Clear pattern cache to ensure new patterns are applied
        clearPatternCache();
        
        // Clear all directory caches to ensure new patterns are applied
        directoryCache.clearAll();
        
        return { success: true };
      } catch (error) {
        console.error('Error saving global patterns:', error);
        return { success: false, error: error.message };
      }
    } else {
      if (!folderPath) {
        return { success: false, error: 'No folder path provided for local patterns' };
      }
      
      try {
        const ignoreFilePath = path.join(folderPath, '.repo_ignore');
        
        // Write patterns to file
        await fs.promises.writeFile(ignoreFilePath, patterns, 'utf8');
        console.log(`Saved local ignore patterns to ${ignoreFilePath}`);
        
        // Clear pattern cache for this folder
        clearPatternCache(folderPath);
        
        // Clear cache for this folder
        directoryCache.clear(folderPath);
        
        return { success: true };
      } catch (error) {
        console.error('Error saving local patterns:', error);
        return { success: false, error: error.message };
      }
    }
  } catch (error) {
    console.error('Error in save-ignore-patterns handler:', error);
    return { success: false, error: error.message };
  }
});

// Add handlers for file reading operations
ipcMain.handle('read-file', async (event, filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      return { success: false, error: 'File does not exist' };
    }
    
    const content = await fs.promises.readFile(filePath, 'utf-8');
    return { success: true, content };
  } catch (error) {
    console.error('Error reading file:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-file-content', async (event, filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      return { success: false, error: 'File does not exist' };
    }
    
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const stats = await fs.promises.stat(filePath);
    
    return { 
      success: true, 
      content,
      size: stats.size,
      lastModified: stats.mtime.getTime()
    };
  } catch (error) {
    console.error('Error getting file content:', error);
    return { success: false, error: error.message };
  }
});
