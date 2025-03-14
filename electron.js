const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const minimatch = require("minimatch");

// Constants for binary detection, large files, and default exclusions
const MAX_BINARY_CHECK_SIZE = 512;
const BINARY_CHECK_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB size limit
const DEFAULT_EXCLUSIONS = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/.git/**",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/*.min.js",
  "**/*.map",
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

// Function to check if a file should be ignored based on patterns
function shouldIgnoreFile(filePath, folderPath, ignorePatterns = []) {
  try {
    // Combine default exclusions with custom ignore patterns
    const patterns = [...DEFAULT_EXCLUSIONS, ...ignorePatterns];
    
    // Get relative path for matching
    const relativePath = path.relative(folderPath, filePath);
    
    // Check each pattern
    for (const pattern of patterns) {
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
  const ignorePatterns = await readIgnorePatterns(folderPath);
  
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

// Load ignore patterns from a .repo_ignore file
ipcMain.on("load-ignore-patterns", async (event, folderPath) => {
  try {
    if (!folderPath) {
      event.reply("ignore-patterns-loaded", "");
      return;
    }
    
    const ignoreFilePath = path.join(folderPath, '.repo_ignore');
    
    if (fs.existsSync(ignoreFilePath)) {
      const patterns = await readFile(ignoreFilePath, 'utf8');
      event.reply("ignore-patterns-loaded", patterns);
    } else {
      event.reply("ignore-patterns-loaded", "");
    }
  } catch (error) {
    console.error("Error loading ignore patterns:", error);
    event.reply("ignore-patterns-loaded", "");
  }
});

// Save ignore patterns to a .repo_ignore file
ipcMain.on("save-ignore-patterns", async (event, { patterns, isGlobal, folderPath }) => {
  try {
    if (!folderPath) {
      event.reply("ignore-patterns-saved", false);
      return;
    }
    
    if (!isGlobal) {
      const ignoreFilePath = path.join(folderPath, '.repo_ignore');
      await writeFile(ignoreFilePath, patterns, 'utf8');
      event.reply("ignore-patterns-saved", true);
    } else {
      // For global patterns, you would typically save to a user settings file
      // This is a simplified implementation
      const appDataPath = app.getPath('userData');
      const globalIgnorePath = path.join(appDataPath, 'global_patterns.ignore');
      await writeFile(globalIgnorePath, patterns, 'utf8');
      event.reply("ignore-patterns-saved", true);
    }
  } catch (error) {
    console.error("Error saving ignore patterns:", error);
    event.reply("ignore-patterns-saved", false);
  }
}); 