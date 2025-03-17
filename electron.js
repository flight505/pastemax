const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const minimatch = require("minimatch");
const micromatch = require('micromatch');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const { execSync } = require('child_process');
const { excludedFiles, binaryExtensions } = require('./excluded-files');

// Disable security warnings in development mode
// These warnings don't appear in production builds anyway
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

// Constants for binary detection, large files, and default exclusions
const MAX_BINARY_CHECK_SIZE = 512;
const BINARY_CHECK_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB size limit

// These are universal exclusions that should never be removed
// Moving them inline instead of a separate file to reduce clutter in the root directory
const DEFAULT_EXCLUSIONS = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/.git/**",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/*.min.js",
  "**/*.map",
  // Binary and image files
  "**/*.png",
  "**/*.jpg",
  "**/*.jpeg",
  "**/*.gif",
  "**/*.ico",
  "**/*.svg",
  "**/*.woff",
  "**/*.woff2",
  "**/*.ttf",
  "**/*.eot",
  "**/*.mp3",
  "**/*.mp4",
  "**/*.webm",
  "**/*.wav",
  "**/*.ogg",
  "**/*.zip",
  "**/*.tar",
  "**/*.gz",
  "**/*.pdf",
];

// Create the main window
function createWindow() {
  const mainWindow = new BrowserWindow({
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
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'"
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
}

// App is ready
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed (except on macOS)
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// Function to check if a file is likely binary
async function isBinary(filePath) {
  try {
    const buffer = Buffer.alloc(MAX_BINARY_CHECK_SIZE);
    const fd = await promisify(fs.open)(filePath, "r");
    const { bytesRead } = await promisify(fs.read)(
      fd,
      buffer,
      0,
      MAX_BINARY_CHECK_SIZE,
      0
    );
    await promisify(fs.close)(fd);

    if (bytesRead === 0) return false;

    // Check for binary characters in the buffer
    for (let i = 0; i < bytesRead; i++) {
      if (BINARY_CHECK_CHARS.includes(buffer[i])) return true;
    }

    return false;
  } catch (error) {
    console.error("Error checking if file is binary:", error);
    return false;
  }
}

// Load global ignore patterns
async function getGlobalIgnorePatterns() {
  try {
    const appDataPath = app.getPath('userData');
    const globalIgnorePath = path.join(appDataPath, 'global_patterns.ignore');
    
    if (fs.existsSync(globalIgnorePath)) {
      const content = await readFile(globalIgnorePath, 'utf8');
      return content.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'));
    }
    return getDefaultIgnorePatterns();
  } catch (error) {
    console.error('Error reading global ignore patterns:', error);
    return getDefaultIgnorePatterns();
  }
}

// Default ignore patterns to use when no global_patterns.ignore exists
function getDefaultIgnorePatterns() {
  return DEFAULT_EXCLUSIONS;
}

// Function to read ignore patterns from a .repo_ignore file
async function readIgnorePatterns(folderPath) {
  try {
    const ignoreFilePath = path.join(folderPath, '.repo_ignore');
    if (fs.existsSync(ignoreFilePath)) {
      const content = await readFile(ignoreFilePath, 'utf8');
      return content.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'));
    }
    return [];
  } catch (error) {
    console.error('Error reading ignore patterns:', error);
    return [];
  }
}

// Function to get all ignore patterns from universal, global, and local sources
async function getAllIgnorePatterns(folderPath) {
  try {
    // Storage for all patterns
    const allPatterns = [...DEFAULT_EXCLUSIONS];
    
    // Get global patterns
    const appDataPath = app.getPath('userData');
    const globalIgnorePath = path.join(appDataPath, 'global_patterns.ignore');
    
    // Read global patterns
    if (fs.existsSync(globalIgnorePath)) {
      try {
        const content = await readFile(globalIgnorePath, 'utf8');
        const globalPatterns = content.split('\n')
          .map(line => line.trim())
          .filter(line => line && !line.startsWith('#'));
          
        if (globalPatterns.length > 0) {
          console.log(`getAllIgnorePatterns: Loaded ${globalPatterns.length} global patterns`);
          allPatterns.push(...globalPatterns);
        }
      } catch (err) {
        console.error('Error reading global ignore patterns:', err);
      }
    }
    
    // Get local ignore patterns for this folder
    const localIgnorePath = path.join(folderPath, '.repo_ignore');
    if (fs.existsSync(localIgnorePath)) {
      try {
        const content = await readFile(localIgnorePath, 'utf8');
        const localPatterns = content.split('\n')
          .map(line => line.trim())
          .filter(line => line && !line.startsWith('#'));
          
        if (localPatterns.length > 0) {
          console.log(`getAllIgnorePatterns: Loaded ${localPatterns.length} local patterns`);
          allPatterns.push(...localPatterns);
        }
      } catch (err) {
        console.error('Error reading local ignore patterns:', err);
      }
    }
    
    console.log(`getAllIgnorePatterns: Total ${allPatterns.length} patterns`);
    return allPatterns;
  } catch (error) {
    console.error('Error getting all ignore patterns:', error);
    return [...DEFAULT_EXCLUSIONS];
  }
}

// Function to check if a file should be ignored based on patterns
function shouldIgnoreFile(filePath, folderPath, ignorePatterns = []) {
  try {
    // Get relative path for matching
    const relativePath = path.relative(folderPath, filePath);
    
    // Check each pattern
    for (const pattern of ignorePatterns) {
      if (minimatch(relativePath, pattern, { dot: true })) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking if file should be ignored:', error);
    return false;
  }
}

// Process all files in a directory
async function processFiles(folderPath) {
  const allFiles = [];
  const ignorePatterns = await getAllIgnorePatterns(folderPath);
  
  async function scanDirectory(dir) {
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await scanDirectory(fullPath);
        } else if (entry.isFile()) {
          // Skip processing if file should be ignored
          if (shouldIgnoreFile(fullPath, folderPath, ignorePatterns)) {
            allFiles.push({
              name: entry.name,
              path: fullPath,
              content: "",
              tokenCount: 0,
              size: 0,
              isBinary: false,
              isSkipped: true,
              excludedByDefault: true,
            });
            continue;
          }
          
          try {
            const stats = await stat(fullPath);
            const lastModified = stats.mtimeMs;
            
            // Skip large files
            if (stats.size > MAX_FILE_SIZE) {
              allFiles.push({
                name: entry.name,
                path: fullPath,
                content: "",
                tokenCount: 0,
                size: stats.size,
                isBinary: false,
                isSkipped: true,
                lastModified,
              });
              continue;
            }
            
            // Check if binary
            const binary = await isBinary(fullPath);
            if (binary) {
              allFiles.push({
                name: entry.name,
                path: fullPath,
                content: "",
                tokenCount: 0,
                size: stats.size,
                isBinary: true,
                isSkipped: true,
                lastModified,
              });
              continue;
            }
            
            // Read file content
            const content = await readFile(fullPath, "utf8");
            
            // Rough token count estimation (this is a simplification)
            const tokenCount = Math.ceil(content.length / 4);
            
            allFiles.push({
              name: entry.name,
              path: fullPath,
              content: content,
              tokenCount: tokenCount,
              size: stats.size,
              isBinary: false,
              isSkipped: false,
              lastModified,
            });
          } catch (error) {
            allFiles.push({
              name: entry.name,
              path: fullPath,
              content: "",
              tokenCount: 0,
              size: 0,
              isBinary: false,
              isSkipped: true,
              error: error.message,
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }
  
  await scanDirectory(folderPath);
  return allFiles;
}

// IPC handlers

// Open folder dialog
ipcMain.on("open-folder", async (event) => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      event.reply("folder-selected", result.filePaths[0]);
    }
  } catch (error) {
    console.error("Error opening folder dialog:", error);
  }
});

// Process files in a selected folder
ipcMain.on("request-file-list", async (event, folderPath) => {
  try {
    if (!folderPath) {
      event.reply("file-processing-status", {
        status: "error",
        message: "No folder selected",
      });
      return;
    }

    event.reply("file-processing-status", {
      status: "processing",
      message: "Scanning files...",
    });

    const allFiles = await processFiles(folderPath);

    event.reply("file-processing-status", {
      status: "complete",
      message: `Found ${allFiles.length} files`,
    });

    event.reply("file-list-data", allFiles);
  } catch (error) {
    console.error("Error processing files:", error);
    event.reply("file-processing-status", {
      status: "error",
      message: `Error processing files: ${error.message}`,
    });
  }
});

// Note: The 'load-ignore-patterns' handler is now defined in main.js
// Commenting out the duplicate handler to avoid conflicts

// Save ignore patterns to file and clear cache
ipcMain.handle('save-ignore-patterns', async (event, { patterns, isGlobal, folderPath }) => {
  try {
    const appDataPath = app.getPath('userData');
    
    // Determine which file to save to
    const targetPath = isGlobal 
      ? path.join(appDataPath, 'global_patterns.ignore')
      : path.join(folderPath, '.repo_ignore');
      
    console.log(`Saving ignore patterns to ${targetPath}, isGlobal: ${isGlobal}`);
    console.log(`Patterns to save: ${patterns}`);
    
    // Ensure directory exists for global patterns
    if (isGlobal && !fs.existsSync(appDataPath)) {
      fs.mkdirSync(appDataPath, { recursive: true });
    }
    
    // Write the patterns to the file
    fs.writeFileSync(targetPath, patterns);
    
    // Clear cache to ensure files are reloaded with new patterns
    if (directoryCache) {
      if (isGlobal) {
        // Clear all caches for global pattern changes
        directoryCache.clearAll();
        console.log('Cleared all directory caches due to global pattern change');
      } else {
        // Clear just this folder's cache
        directoryCache.clear(folderPath);
        console.log(`Cleared directory cache for ${folderPath}`);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error saving ignore patterns:', error);
    return { success: false, error: error.message };
  }
});

// Reset ignore patterns
ipcMain.handle('reset-ignore-patterns', async (event, { isGlobal, folderPath }) => {
  try {
    if (!folderPath) {
      return { success: false, error: 'No folder path provided' };
    }
    
    if (isGlobal) {
      // Reset global patterns
      const appDataPath = app.getPath('userData');
      const globalIgnorePath = path.join(appDataPath, 'global_patterns.ignore');
      
      // If the file exists, delete it
      if (fs.existsSync(globalIgnorePath)) {
        fs.unlinkSync(globalIgnorePath);
        console.log(`Reset global ignore patterns by removing ${globalIgnorePath}`);
      }
      
      // Clear all caches for global pattern changes
      if (directoryCache) {
        directoryCache.clearAll();
        console.log('Cleared all directory caches due to global pattern reset');
      }
    } else {
      // Reset local patterns
      const ignoreFilePath = path.join(folderPath, '.repo_ignore');
      
      // If the file exists, delete it
      if (fs.existsSync(ignoreFilePath)) {
        fs.unlinkSync(ignoreFilePath);
        console.log(`Reset local ignore patterns by removing ${ignoreFilePath}`);
      }
      
      // Clear just this folder's cache
      if (directoryCache) {
        directoryCache.clear(folderPath);
        console.log(`Cleared directory cache for ${folderPath}`);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error resetting ignore patterns:', error);
    return { success: false, error: error.message };
  }
}); 