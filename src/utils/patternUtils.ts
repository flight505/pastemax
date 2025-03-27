// System pattern categories - Moved from App.tsx
export const SYSTEM_PATTERN_CATEGORIES = {
    versionControl: [
      "**/.git/**",
      "**/.svn/**",
      "**/.hg/**",
      "**/.cvs/**" // Added .cvs
    ],
    buildOutput: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.output/**", // Added .output
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
  
  // Parse ignore patterns content to extract disabled patterns and user patterns - Moved from App.tsx
  export const parseIgnorePatternsContent = (content: string): { excludedPatterns: string[]; userPatterns: string } => {
    if (!content) {
      return { excludedPatterns: [], userPatterns: '' };
    }
    const lines = content.split('\n');
    const excludedPatterns: string[] = [];
    const userPatterns: string[] = [];
  
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('# DISABLED:')) {
        const pattern = trimmedLine.substring('# DISABLED:'.length).trim();
        if (pattern) {
          excludedPatterns.push(pattern);
        }
      } else if (trimmedLine !== '' && !trimmedLine.startsWith('#')) {
        // Add non-empty, non-comment lines to user patterns
        userPatterns.push(line); // Keep original line to preserve indentation/whitespace if any
      }
      // Ignore empty lines and regular comments
    });
  
    // Ensure excluded patterns are unique
    const uniqueExcluded = Array.from(new Set(excludedPatterns));
  
    return {
      excludedPatterns: uniqueExcluded,
      userPatterns: userPatterns.join('\n')
    };
  };
  
  
  // --- Keep existing functions below if they are used ---
  
  // Selection handlers (Example, confirm if used or remove)
  export const handleSelectionChange = (prevSelected: string[], newSelected: string[]) => {
    return newSelected;
  };
  
  export const handleFolderSelect = (prev: string[]) => {
    return prev;
  };
  
  // Pattern state update function (Example, confirm if used or remove)
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