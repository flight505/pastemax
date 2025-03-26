# PasteMax

<div align="center">
  <img src="assets/pastemax-logo.png" alt="PasteMax Logo" width="180">
  <p>A powerful code formatter and exporter for sharing code with AI models.</p>
</div>

## Overview

PasteMax is a desktop application designed to help developers easily format and export their code for sharing with AI models like Claude, ChatGPT, and others. It provides an intuitive interface to select specific files from your project, generate file trees, add custom instructions, and export everything in a well-formatted manner that preserves context.

<div align="center">
  <img width="700" alt="PasteMax application screenshot" src="https://github.com/user-attachments/assets/7d69f136-5dae-456a-8a69-fa8b12af2aad" />
  <p>Current state of PasteMax</p>
</div>

## Branch Structure

The repository maintains a simple, clean branch structure:

- `main` - Active development branch with the latest stable code
- `main-backup` - Historical reference of the previous main branch (preserved for reference)

For detailed information about our branch workflow, see [Branch Workflow Guide](docs/branch_workflow.md).

## Development Workflow

1. **Feature Development**
   - Create feature branches from `main`
   - Follow the naming convention: `feature/descriptive-name`
   - Keep changes focused and atomic

2. **Code Quality**
   - Follow the [Component System Guide](docs/style-guide/component-system.md)
   - Ensure all components use our theme system
   - Run linting before commits: `npm run lint:strict`

3. **Testing**
   - Add tests for new features
   - Run tests locally: `npm test`
   - Ensure CI passes before merging

4. **Documentation**
   - Update relevant documentation
   - Add usage examples if needed
   - Keep README.md current

For more details, check our documentation in the `docs` directory.

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

## Features Highlights

PasteMax offers a comprehensive set of features for efficient file management and code viewing:

- 🌳 **Smart File Tree** - Intuitive navigation with multi-select and custom ignore patterns
- 🔍 **Advanced Search** - Real-time search with regex support and flexible filtering
- 🎨 **Theme Support** - Light/Dark modes with system theme integration
- ⌨️ **Keyboard Friendly** - Full keyboard navigation and shortcuts
- 🔒 **Secure** - Local-only processing with no external dependencies
- ⚡ **Performant** - Optimized for large codebases with virtual rendering
- 🔄 **Session Persistence** - Remembers your preferences and selections
- 🎯 **Token Management** - Track and optimize token usage for AI interactions

For a complete list of features and detailed documentation, see [FEATURES.md](FEATURES.md).

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
npm run package

# Build for specific platform
npm run package:mac
npm run package:win
npm run package:linux

# Build for all platforms at once
npm run package:all
```

### Project Structure for Building

The project follows this structure for Electron files:
- `electron/main.js` - Main process file
- `electron/preload.js` - Preload script
- `electron/excluded-files.js` - File exclusion patterns

Make sure these files exist in the `electron/` directory before building.

### Common Build Issues

1. **Missing Entry File**: Ensure `electron/main.js` exists and is properly configured
2. **Build Configuration**: Check that `package.json` has correct paths in the `build.files` array
3. **Dependencies**: Run `npm install` before building to ensure all dependencies are installed

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

For detailed guidance on our feature branch workflow, see [Branch Workflow Guide](docs/branch_workflow.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Recent Improvements

### March 2025 Updates
- **Fixed Reload Functionality**: The reload button now properly refreshes the file tree to reflect external changes made in other editors or applications
- **Improved Directory Caching**: Enhanced caching system with proper invalidation when reloading
- **Code Refactoring**: Extracted file processing logic for better maintainability and error handling
- **Fixed Application Loading**: Resolved issue with the app getting stuck in loading state when trying to scan its own directory
- **Improved Error Handling**: Added clear error messages when attempting to scan the application directory

## Development

### Continuous Integration

PasteMax uses GitHub Actions for continuous integration and deployment:

- **PR Checks**: Runs automatically on all pull requests to validate code quality and ensure the application builds correctly on all supported platforms.
- **Build Workflow**: Builds the application when a new tag is pushed and creates platform-specific artifacts.
- **Release Workflow**: Creates official releases with proper code signing when release tags are pushed.

To create a proper PR:
1. Fork the repository and create a feature branch
2. Make your changes and ensure all PR checks pass
3. Submit your PR with a clear description of the changes

For maintainers releasing new versions:
1. Update version in `package.json`
2. Create a git tag: `git tag v1.x.x`
3. Push the tag: `git push origin v1.x.x`
4. The release workflow will automatically build and create a draft release

---

<div align="center">
  <p>Built with ❤️ using Vite and Electron</p>
</div>

## Documentation

- [Features Documentation](FEATURES.md) - Complete feature list with screenshots and diagrams
- [Branch Workflow Guide](docs/branch_workflow.md) - Development workflow and branch management
- [Component System Guide](docs/style-guide/component-system.md) - UI component guidelines
- [Screenshots](docs/screenshots/) - Visual documentation of the application
