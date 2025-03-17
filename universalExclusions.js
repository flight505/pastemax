// Universal patterns to always exclude regardless of user settings
// These patterns are hardcoded and not shown or editable in the UI
// They focus on large binary files, images, and other content that should
// almost never be included in summaries or code reviews

module.exports = {
  // Array of patterns to always exclude
  universalExclusions: [
    // Binary and image files
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.png",
    "**/*.gif",
    "**/*.ico",
    "**/*.webp",
    "**/*.svg",
    "**/*.pdf",
    "**/*.zip",
    "**/*.tar.gz",
    "**/*.tgz",
    "**/*.rar",
    "**/*.7z",

    // Video and audio files
    "**/*.mp4",
    "**/*.mov",
    "**/*.avi",
    "**/*.mkv",
    "**/*.mp3",
    "**/*.wav",
    "**/*.flac",

    // Database files
    "**/*.sqlite",
    "**/*.db",
    "**/*.sql",

    // Document files
    "**/*.doc",
    "**/*.docx",
    "**/*.xls",
    "**/*.xlsx",
    "**/*.ppt",
    "**/*.pptx",

    // Large binary files
    "**/*.iso",
    "**/*.bin",
    "**/*.exe",
    "**/*.dll",
    "**/*.so",
    "**/*.dylib",
    
    // Other large files
    "**/*.min.js", // Minified JavaScript files
    "**/*.min.css", // Minified CSS files
  ]
}; 