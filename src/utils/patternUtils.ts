// System pattern categories
export const SYSTEM_PATTERN_CATEGORIES = {
  versionControl: [
    "**/.git/**",
    "**/.svn/**",
    "**/.hg/**",
  ],
  buildOutput: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.next/**",
  ],
  caches: [
    "**/.cache/**",
    "**/__pycache__/**",
    "**/.pytest_cache/**",
  ],
  logs: [
    "**/logs/**",
    "**/*.log",
  ],
  ide: [
    "**/.idea/**",
    "**/.vscode/**",
    "**/.vs/**",
  ],
  temp: [
    "**/tmp/**",
    "**/temp/**",
  ],
  os: [
    "**/.DS_Store",
    "**/Thumbs.db",
  ],
};

// Selection handlers
export const handleSelectionChange = (prevSelected: string[], newSelected: string[]) => {
  return newSelected;
};

export const handleFolderSelect = (prev: string[]) => {
  return prev;
};

// Pattern state update function
export const handlePatternStateUpdate = (patterns: string | string[]): string => {
  return Array.isArray(patterns) ? patterns.join('\n') : patterns;
};

export const updatePatternState = (
  patterns: string | string[],
  isGlobal: boolean,
  setGlobalPatterns: (value: any) => void,
  setLocalPatterns: (value: any) => void,
  folderPath?: string
) => {
  const normalizedPatterns = handlePatternStateUpdate(patterns);
  
  if (isGlobal) {
    setGlobalPatterns((prev: any) => ({
      ...prev,
      patterns: normalizedPatterns
    }));
  } else if (folderPath) {
    setLocalPatterns((prev: any) => ({
      ...prev,
      patterns: normalizedPatterns
    }));
  }
}; 