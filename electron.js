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
const { excludedFiles, binaryExtensions, systemExclusions } = require('./excluded-files');
const mainModule = require('./main'); // Import main.js functions

// Disable security warnings in development mode
// These warnings don't appear in production builds anyway
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

// Constants for binary detection, large files, and default exclusions
const MAX_BINARY_CHECK_SIZE = 512;
const BINARY_CHECK_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB size limit

// Use the systemExclusions from excluded-files.js as the single source of truth
const DEFAULT_EXCLUSIONS = systemExclusions;

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

// Use pattern handling functions from main.js
const { shouldExcludeByDefault, normalizePath } = mainModule;

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

// Load global ignore patterns - using main.js pattern handling
async function getGlobalIgnorePatterns() {
  // Simply use the system exclusions since main.js will handle the actual global patterns
  return DEFAULT_EXCLUSIONS;
}

// Default ignore patterns to use when no global_patterns.ignore exists
function getDefaultIgnorePatterns() {
  return DEFAULT_EXCLUSIONS;
}

// Use shouldIgnoreFile from electron.js for backward compatibility
// but delegate to main.js shouldExcludeByDefault
function shouldIgnoreFile(filePath, folderPath, ignorePatterns = []) {
  return shouldExcludeByDefault(filePath, folderPath);
}

// Process all files in a directory
async function processFiles(folderPath) {
  const allFiles = [];
  
  async function scanDirectory(dir) {
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await scanDirectory(fullPath);
        } else if (entry.isFile()) {
          // Skip processing if file should be ignored - use main.js function
          if (shouldExcludeByDefault(fullPath, folderPath)) {
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
      console.error('Error scanning directory:', error);
    }
  }
  
  await scanDirectory(folderPath);
  return allFiles;
}

// IPC handlers
// Now delegating to handlers in main.js

// Handle folder selection
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

// Handle file list request
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

// Delegate to main.js for pattern handling
const mainHandlers = mainModule;

// Enable clipboard reading/writing (for security reasons, this is restricted by default)
app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer');

// For backward compatibility - export app and BrowserWindow
module.exports = { app, BrowserWindow }; 