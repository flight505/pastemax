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
  
  /**
   * Interface for ignore patterns state
   */
  export interface IgnorePatternsState {
    patterns: string;
    excludedSystemPatterns: string[];
  }
  
  /**
   * Parse ignore patterns content to extract disabled patterns and user patterns
   */
  export const parseIgnorePatternsContent = (content: string): { excludedPatterns: string[]; userPatterns: string } => {
    if (!content) {
      return { excludedPatterns: [], userPatterns: '' };
    }
    const lines = content.split('\n');
    const excludedPatterns: string[] = [];
    const userPatterns: string[] = [];
  
    let inUserSection = false;
  
    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Check for section headers
      if (trimmedLine === '# USER PATTERNS:') {
        inUserSection = true;
        return;
      }
      
      if (trimmedLine.startsWith('# DISABLED:')) {
        // Extract pattern removing the DISABLED marker
        const pattern = trimmedLine.substring('# DISABLED:'.length).trim();
        if (pattern) {
          excludedPatterns.push(pattern);
        }
      } else if (inUserSection && trimmedLine !== '' && !trimmedLine.startsWith('#')) {
        // In user section, add non-comment lines to user patterns
        userPatterns.push(line); // Keep original line to preserve indentation/whitespace
      } else if (!inUserSection && !trimmedLine.startsWith('#') && trimmedLine !== '') {
        // Not in user section yet, but found a pattern - also add to user patterns
        // This handles the case where user patterns aren't properly marked with a section
        userPatterns.push(line);
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
  
  /**
   * Load ignore patterns state from localStorage
   */
  export const loadIgnoreStateFromStorage = (storageKey: string): IgnorePatternsState => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Basic validation
        if (typeof parsed.patterns === 'string' && Array.isArray(parsed.excludedSystemPatterns)) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse saved ignore patterns:", e);
      }
    }
    // Default state if nothing saved or parsing failed
    return { patterns: '', excludedSystemPatterns: [] };
  };
  
  // --- Keep existing functions below if they are used ---
  
  // Selection handlers (Example, confirm if used or remove)
  export const handleSelectionChange = (prevSelected: string[], newSelected: string[]): string[] => {
    return newSelected;
  };
  
  export const handleFolderSelect = (prev: string[]): string[] => {
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
  ): void => {
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

  /**
   * Format global patterns for saving
   */
  export const formatPatternsForSaving = (
    userPatterns: string,
    excludedSystemPatterns: string[]
  ): string => {
    const disabledLines = excludedSystemPatterns
      .map(pattern => `# DISABLED:${pattern}`)
      .join('\n');
      
    return disabledLines ? `${disabledLines}\n\n${userPatterns}` : userPatterns;
  };