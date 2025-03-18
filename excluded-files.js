// List of common files to exclude by default
// Users can still manually select these files if needed
// Paths can include glob patterns (*, **, etc.)

// Central repository for all exclusion patterns
// This file is the single source of truth for file exclusions

module.exports = {
  // System exclusions - should never be modified/overridden
  // These are the absolute minimum exclusions for the application to function properly
  systemExclusions: [
    "**/node_modules/**",
    "**/dist/**", 
    "**/build/**",
    "**/.git/**",
    "**/*.pyc", // Python compiled files only, not source
    // Binary files
    "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.ico", 
    "**/*.webp", "**/*.svg", "**/*.pdf", "**/*.zip", "**/*.tar.gz",
    "**/*.tgz", "**/*.rar", "**/*.7z", "**/*.mp4", "**/*.mov",
    "**/*.woff", "**/*.woff2", "**/*.ttf", "**/*.eot",
    "**/*.avi", "**/*.mkv", "**/*.mp3", "**/*.wav", "**/*.flac"
  ],

  // Default user patterns - these are restored when user resets to defaults
  // These can be modified by users
  defaultUserPatterns: `# Default ignore patterns (editable)
# These patterns can be modified in the Ignore Patterns UI

# Common directories
node_modules/
.git/
dist/
build/
__pycache__/
venv/
.venv/

# Common files
**/*.log
.DS_Store
*.tmp
*.class
# Not excluding Python source files
*.pyc
*.pyo
.env
`,

  // Files to always exclude by default when a folder is first loaded
  // Users can override these by selecting them manually
  excludedFiles: [
    // NPM/Yarn/Node related
    "package-lock.json",
    "yarn.lock",
    "npm-debug.log*",
    "yarn-debug.log*",
    "yarn-error.log*",
    "pnpm-lock.yaml",
    ".npmrc",
    ".yarnrc",
    ".nvmrc",
    "node_modules/**",

    // JavaScript/TypeScript related
    ".eslintrc*",
    ".prettierrc*",
    "tsconfig*.json",
    "*.d.ts",
    "*.min.js",
    "*.map",

    // Python related
    "__pycache__/**",
    "*.pyc",
    "*.pyo",
    "*.pyd",
    ".pytest_cache/**",
    ".coverage",
    ".python-version",
    "venv/**",
    ".venv/**",
    "*.egg-info/**",
    "pip-log.txt",
    "pip-delete-this-directory.txt",

    // Go related
    "go.sum",
    "go.mod",
    "vendor/**",

    // Java related
    "*.class",
    "*.jar",
    "target/**",
    ".gradle/**",

    // Ruby related
    "Gemfile.lock",
    ".bundle/**",

    // PHP related
    "composer.lock",
    "vendor/**",

    // Rust related
    "Cargo.lock",
    "target/**",

    // .NET related
    "bin/**",
    "obj/**",
    "*.suo",
    "*.user",

    // Binary and image files
    "*.jpg",
    "*.jpeg",
    "*.png",
    "*.gif",
    "*.ico",
    "*.webp",
    "*.svg",
    "*.pdf",
    "*.zip",
    "*.tar.gz",
    "*.tgz",
    "*.rar",

    // IDE and editor files
    ".idea/**",
    ".vscode/**",
    "*.swp",
    "*.swo",
    ".DS_Store",

    // Build output
    "dist/**",
    "build/**",
    "out/**",
    ".next/**",

    // Log files
    "logs/**",
    "*.log",

    // Database files
    "*.sqlite",
    "*.db",

    // Environment and secrets
    ".env*",
    ".aws/**",
    "*.pem",
    "*.key",

    // Docker related
    "docker-compose.override.yml",

    // Misc
    ".git/**",
    ".github/**",
    ".gitlab/**",
  ],

  // File extensions to always mark as binary/unselectable
  // The app already has binary detection, but this ensures specific types
  // are always treated as binary regardless of content detection
  binaryExtensions: [
    // Images (including .svg which might not be detected as binary)
    ".svg",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".tiff",
    ".ico",
    ".webp",

    // Other binary formats
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
  ]
};
