// List of common files to exclude by default
// Users can still manually select these files if needed
// Paths can include glob patterns (*, **, etc.)

// These are exclusions that users can manually override
// (Universal hardcoded exclusions are now defined directly in electron.js and main.js)

module.exports = {
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
    "*.py",
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
