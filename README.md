# PasteMax

<div align="center">
  <img src="assets/pastemax-logo.png" alt="PasteMax Logo" width="180">
  <p>A powerful code formatter and exporter for sharing code with AI models.</p>
</div>

## Overview

PasteMax is a desktop application designed to help developers easily format and export their code for sharing with AI models like Claude, ChatGPT, and others. It provides an intuitive interface to select specific files from your project, generate file trees, add custom instructions, and export everything in a well-formatted manner that preserves context.

## Features

- 🗂️ **Project Navigation**: Browse and select files from your project directory
- 🌲 **File Tree Generation**: Create an ASCII file tree representation of your project structure
- 🔍 **Smart Search**: Filter files by name or content
- 📝 **Custom Instructions**: Add context or specific instructions for AI models
- 🔄 **Multiple File Tree Modes**:
  - None: No file tree included
  - Selected: Only show selected files
  - Selected with Roots: Show selected files with parent directories
  - Complete: Show the entire project structure
- 🔁 **Reload File Tree**: Instantly refresh file list to catch external changes
- 🚫 **Ignore Patterns**: Configure glob patterns for files to exclude
- 🌗 **Light/Dark/System Theme**: Choose your preferred appearance mode
- 📊 **Token Counting**: Track token usage to stay within AI model limits
- 📋 **One-Click Copy**: Easily copy formatted output to clipboard

## Tech Stack

- **Electron**: Cross-platform desktop framework
- **React**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tooling with HMR
- **Lucide**: Beautiful, minimal icons

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/user/pastemax.git
cd pastemax

# Install dependencies
npm install
# or
yarn install

# Start development server with hot-reload
npm run dev
# Or for Electron development mode
npm run dev:electron
```

## Building for Production

PasteMax uses Electron Builder for creating production builds across platforms.

### Building for All Platforms

```bash
# Build for your current platform
npm run build

# Build for specific platform
npm run build:win
npm run build:mac
npm run build:linux
```

### Building from Different OS

#### Windows

```bash
# Build for Windows only
npm run build:win

# Build for macOS (requires code signing)
npm run build:mac

# Build for Linux
npm run build:linux
```

#### macOS

```bash
# Build for macOS only
npm run build:mac

# Build for Windows (works on Apple Silicon with cross-compilation)
npm run build:win

# Build for Linux
npm run build:linux
```

#### Linux

```bash
# Build for Linux only
npm run build:linux

# Build for Windows
npm run build:win

# Build for macOS (requires macOS for code signing)
# Not fully supported from Linux
```

## Installation on Different Systems

### Windows

1. Download the latest `.exe` installer from the [Releases](https://github.com/user/pastemax/releases) page
2. Run the installer and follow the prompts
3. PasteMax will be available in your Start menu

### macOS

1. Download the latest `.dmg` file from the [Releases](https://github.com/user/pastemax/releases) page
2. Open the DMG file
3. Drag PasteMax to your Applications folder
4. First launch: Right-click the app and select "Open" to bypass Gatekeeper

### Linux

#### Debian/Ubuntu

```bash
# Install the .deb package
sudo dpkg -i pastemax_1.0.0_amd64.deb
sudo apt-get install -f
```

#### Other Distributions

1. Download the AppImage from the [Releases](https://github.com/user/pastemax/releases) page
2. Make it executable: `chmod +x PasteMax-1.0.0.AppImage`
3. Run it: `./PasteMax-1.0.0.AppImage`

## Usage Guide

1. **Select a Project Folder**: Click "Select Folder" to choose your project directory
2. **Browse Files**: Navigate through your project structure in the sidebar
3. **Select Files**: Check the files you want to include in your export
4. **Configure Output**:
   - Choose a file tree mode
   - Add custom instructions if needed
5. **Copy to Clipboard**: Click the "Copy" button at the bottom
6. **Paste into AI**: Paste the formatted content into your preferred AI model

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Recent Improvements

### March 2025 Updates
- **Fixed Reload Functionality**: The reload button now properly refreshes the file tree to reflect external changes made in other editors or applications
- **Improved Directory Caching**: Enhanced caching system with proper invalidation when reloading
- **Code Refactoring**: Extracted file processing logic for better maintainability and error handling
- **Fixed Application Loading**: Resolved issue with the app getting stuck in loading state when trying to scan its own directory
- **Improved Error Handling**: Added clear error messages when attempting to scan the application directory

---

<div align="center">
  <p>Built with ❤️ using Vite and Electron</p>
</div>
