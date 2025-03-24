# Electron Main Process Code

This directory contains all code related to the Electron main process, including:

- `main.js` - The main entry point for the Electron application
- `preload.js` - The preload script that securely exposes Electron APIs to the renderer process
- `excluded-files.js` - Configuration for file exclusion patterns

## Architecture

The code follows a clear separation of concerns:

1. **Main Process** (this directory) - Handles file system operations, window management, and IPC communication
2. **Renderer Process** (`src/` directory) - Contains the React application for the user interface

## Security

The preload script implements a context isolation pattern to securely expose only specific IPC channels to the renderer process, following Electron security best practices.

## Development

When making changes to the main process code, consider:

1. Running `npm run dev:electron` to test changes with the development build
2. Using the same TypeScript patterns and code style as the rest of the codebase
3. Keeping the preload.js file minimal and focused on API exposure 