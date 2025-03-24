/**
 * Central repository for all file exclusion patterns
 * This file is the single source of truth for determining which files
 * should be excluded from processing in the application.
 */

// Constants for pattern groups to avoid duplication
const BINARY_IMAGE_PATTERNS = [
  "**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.gif", "**/*.ico",
  "**/*.webp", "**/*.svg", "**/*.pdf" 
];

const BINARY_ARCHIVE_PATTERNS = [
  "**/*.zip", "**/*.tar.gz", "**/*.tgz", "**/*.rar", "**/*.7z"
];

const BINARY_AUDIO_VIDEO_PATTERNS = [
  "**/*.mp4", "**/*.mov", "**/*.avi", "**/*.mkv", 
  "**/*.mp3", "**/*.wav", "**/*.flac"
];

const BINARY_FONT_PATTERNS = [
  "**/*.woff", "**/*.woff2", "**/*.ttf", "**/*.eot"
];

const COMMON_DIR_PATTERNS = [
  "**/node_modules/**", "**/dist/**", "**/build/**", "**/.git/**",
  "**/__pycache__/**", "**/venv/**", "**/.venv/**"
];

module.exports = {
  /**
   * System exclusions - should never be modified/overridden
   * These are the absolute minimum exclusions for the application to function properly
   */
  systemExclusions: [
    // Common directories
    ...COMMON_DIR_PATTERNS,
    
    // Compiled Python files (not source)
    "**/*.pyc",
    
    // Binary files
    ...BINARY_IMAGE_PATTERNS,
    ...BINARY_ARCHIVE_PATTERNS,
    ...BINARY_AUDIO_VIDEO_PATTERNS,
    ...BINARY_FONT_PATTERNS
  ],

  /**
   * Default user patterns - these are restored when user resets to defaults
   * These can be modified by users through the UI
   */
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

  /**
   * Files to always exclude by default when a folder is first loaded
   * Users can override these by selecting them manually
   */
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

  /**
   * File extensions to always mark as binary/unselectable
   * The app already has binary detection, but this ensures specific types
   * are always treated as binary regardless of content detection
   */
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
