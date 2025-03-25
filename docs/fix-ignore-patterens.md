I'll create a detailed implementation guide for modernizing the PasteMax Ignore Patterns UI. The plan breaks down the necessary changes into clear, actionable steps that a coding assistant can follow systematically.

This implementation will focus on transforming the current interface into a more intuitive tool using the existing Switch component (scaled down by 10%), incorporating a categorized system for patterns, and providing a modern tabbed interface with preview functionality. The plan consists of 43 tasks divided into 10 major sections.

Let's begin with the implementation guide:

# Detailed Implementation Guide: Modernizing PasteMax Ignore Patterns UI

This implementation guide breaks down the process of transforming the current ignore patterns interface into a modern, intuitive tool. Each task is structured to be easily understood and implemented by a coding assistant LLM.

## 1. Core Component Updates

### Update IgnorePatterns.tsx Component Structure

- [ ] **Restructure the component in `src/components/IgnorePatterns.tsx`**:
  - [ ] Update imports to include Switch component: `import { Switch } from './ui';`
  - [ ] Reorganize sections into Header, Tabs, System Patterns, Pattern Entry, Pattern Preview, Actions
  - [ ] Replace checkbox inputs with the Switch component (scaled down by 10%)

### Add New State Variables

- [ ] **Add new state variables to `src/components/IgnorePatterns.tsx`**:
  ```typescript
  // For system pattern categories
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'versionControl': true,
    'buildFiles': true,
    'mediaFiles': true,
    'documentation': true,
    'dependencies': true
  });
  
  // For excluded system patterns
  const [excludedSystemPatterns, setExcludedSystemPatterns] = useState<string[]>([]);
  
  // For pattern preview
  const [mergedPreview, setMergedPreview] = useState<string>("");
  ```

### Add New Functions for Pattern Management

- [ ] **Add toggle function for system pattern categories in `src/components/IgnorePatterns.tsx`**:
  ```typescript
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  ```

- [ ] **Add system pattern toggle handler in `src/components/IgnorePatterns.tsx`**:
  ```typescript
  const handleToggleSystemPattern = (pattern: string) => {
    setExcludedSystemPatterns(prev => {
      if (prev.includes(pattern)) {
        return prev.filter(p => p !== pattern);
      } else {
        return [...prev, pattern];
      }
    });
  };
  ```

## 2. Update CSS Styling

### Create New Styles for Modernized UI

- [ ] **Update or add CSS styles in `src/components/IgnorePatterns.module.css`**:
  - [ ] Update the modal styling for cleaner appearance:
    ```css
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: var(--z-index-modal);
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease-out;
    }
  
    .content {
      background-color: var(--background-primary);
      border-radius: var(--radius-lg);
      width: 90%;
      max-width: 700px;
      max-height: 85vh;
      padding: 1.5rem;
      box-shadow: var(--shadow-lg);
      overflow-y: auto;
      animation: slideUp 0.2s ease-out;
    }
    ```

  - [ ] Add styles for improved tabs:
    ```css
    .scopeSelector {
      display: flex;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--border-color);
      gap: 1px;
    }
  
    .scopeBtn {
      flex: 1;
      border-radius: var(--radius) var(--radius) 0 0 !important;
      font-size: 0.95rem !important;
      padding: 10px 15px !important;
      transition: all 0.15s ease-out;
      border-bottom: 2px solid transparent;
      position: relative;
    }
  
    .scopeBtn.active::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--accent-color);
      animation: slideIn 0.2s ease-out;
    }
    ```

  - [ ] Add styles for system pattern categories:
    ```css
    .patternCategory {
      margin-bottom: 8px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      overflow: hidden;
    }
  
    .categoryHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 12px;
      background-color: var(--background-secondary);
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
  
    .categoryHeader:hover {
      background-color: var(--hover-color);
    }
  
    .categoryTitle {
      font-weight: 500;
      font-size: 14px;
      color: var(--text-primary);
    }
  
    .categoryItems {
      padding: 8px 12px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
    }
  
    .categoryExpanded .categoryItems {
      max-height: 1000px;
      padding: 8px 12px;
    }
    ```

  - [ ] Add styles for system pattern items with Switch component:
    ```css
    .systemPatternItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 8px;
      font-family: monospace;
      font-size: 13px;
      transition: background-color 0.15s ease;
      border-radius: var(--radius);
    }
  
    .systemPatternItem:hover {
      background-color: var(--hover-color);
    }
  
    /* Style for smaller switch component */
    .smallerSwitch {
      transform: scale(0.9);
    }
    ```

  - [ ] Add styles for pattern preview section:
    ```css
    .previewContainer {
      background-color: var(--background-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 12px;
      max-height: 150px;
      overflow-y: auto;
      margin-top: 16px;
      font-family: monospace;
      font-size: 13px;
    }
  
    .previewHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 14px;
    }
  
    .previewLine {
      padding: 2px 0;
    }
  
    .previewSystem {
      color: var(--accent-color);
    }
  
    .previewGlobal {
      color: var(--text-primary);
    }
  
    .previewLocal {
      color: var(--success-color);
    }
  
    .previewBadge {
      display: inline-block;
      font-size: 10px;
      padding: 1px 4px;
      border-radius: 4px;
      margin-left: 8px;
      background-color: var(--background-secondary);
      color: var(--text-secondary);
    }
    ```

  - [ ] Add animation keyframes:
    ```css
    @keyframes slideIn {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }
  
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    ```

## 3. Update the JSX Structure in IgnorePatterns Component

### Improve the Header and Tab Structure

- [ ] **Update the header and tab structure in `src/components/IgnorePatterns.tsx`**:
  ```jsx
  <div className={styles.header}>
    <h2>
      Ignore Patterns
      {applyingPatterns && <span className={styles.applying}>(Applying...)</span>}
    </h2>
    <Button 
      variant="ghost" 
      size="sm" 
      iconOnly
      onClick={onClose}
      startIcon={<X size={16} />}
      title="Close"
      disabled={applyingPatterns}
    />
  </div>
  
  <div className={styles.description}>
    Edit ignore patterns. Global patterns apply to all folders, while local patterns apply only to the selected folder.
  </div>
  
  <div className={styles.scopeSelector}>
    <Button 
      variant={activeTab === "local" ? "secondary" : "ghost"}
      className={`${styles.scopeBtn} ${activeTab === "local" ? styles.active : ""}`}
      onClick={() => handleTabChange(false)}
      disabled={applyingPatterns}
    >
      Local Folder
    </Button>
    <Button 
      variant={activeTab === "global" ? "secondary" : "ghost"}
      className={`${styles.scopeBtn} ${activeTab === "global" ? styles.active : ""}`}
      onClick={() => handleTabChange(true)}
      disabled={applyingPatterns}
    >
      Global Defaults
    </Button>
  </div>
  ```

### Implement System Patterns with Categories

- [ ] **Add the system patterns section with categories in `src/components/IgnorePatterns.tsx`**:
  ```jsx
  {activeTab === "global" && (
    <div className={styles.systemPatternsSection}>
      <h3 className={styles.sectionTitle}>System Patterns</h3>
      
      {/* Version Control Category */}
      <div className={`${styles.patternCategory} ${expandedCategories.versionControl ? styles.categoryExpanded : ''}`}>
        <div 
          className={styles.categoryHeader} 
          onClick={() => toggleCategory('versionControl')}
        >
          <div className={styles.categoryTitle}>Version Control</div>
          <ChevronDown size={16} className={expandedCategories.versionControl ? styles.chevronRotated : ''} />
        </div>
        {expandedCategories.versionControl && (
          <div className={styles.categoryItems}>
            {/* Example system pattern items */}
            <div className={styles.systemPatternItem}>
              <span>**/.git/**</span>
              <Switch
                checked={!excludedSystemPatterns.includes('**/.git/**')}
                onChange={() => handleToggleSystemPattern('**/.git/**')}
                className={styles.smallerSwitch}
              />
            </div>
            <div className={styles.systemPatternItem}>
              <span>**/.svn/**</span>
              <Switch
                checked={!excludedSystemPatterns.includes('**/.svn/**')}
                onChange={() => handleToggleSystemPattern('**/.svn/**')}
                className={styles.smallerSwitch}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Build Files Category */}
      <div className={`${styles.patternCategory} ${expandedCategories.buildFiles ? styles.categoryExpanded : ''}`}>
        <div 
          className={styles.categoryHeader} 
          onClick={() => toggleCategory('buildFiles')}
        >
          <div className={styles.categoryTitle}>Build Files</div>
          <ChevronDown size={16} className={expandedCategories.buildFiles ? styles.chevronRotated : ''} />
        </div>
        {expandedCategories.buildFiles && (
          <div className={styles.categoryItems}>
            <div className={styles.systemPatternItem}>
              <span>**/dist/**</span>
              <Switch
                checked={!excludedSystemPatterns.includes('**/dist/**')}
                onChange={() => handleToggleSystemPattern('**/dist/**')}
                className={styles.smallerSwitch}
              />
            </div>
            <div className={styles.systemPatternItem}>
              <span>**/build/**</span>
              <Switch
                checked={!excludedSystemPatterns.includes('**/build/**')}
                onChange={() => handleToggleSystemPattern('**/build/**')}
                className={styles.smallerSwitch}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Media Files Category */}
      <div className={`${styles.patternCategory} ${expandedCategories.mediaFiles ? styles.categoryExpanded : ''}`}>
        <div 
          className={styles.categoryHeader} 
          onClick={() => toggleCategory('mediaFiles')}
        >
          <div className={styles.categoryTitle}>Media Files</div>
          <ChevronDown size={16} className={expandedCategories.mediaFiles ? styles.chevronRotated : ''} />
        </div>
        {expandedCategories.mediaFiles && (
          <div className={styles.categoryItems}>
            {/* Implement similar pattern items for media files */}
          </div>
        )}
      </div>
      
      {/* Add similar sections for other categories */}
    </div>
  )}
  ```

### Update the Pattern Entry Area

- [ ] **Enhance the pattern entry area in `src/components/IgnorePatterns.tsx`**:
  ```jsx
  <div className={styles.patternEntrySection}>
    <h3 className={styles.sectionTitle}>
      {activeTab === "global" ? "Global Custom Patterns" : "Local Custom Patterns"}
    </h3>
    
    {activeTab === "local" && (
      <div className={styles.folderSelector}>
        <label>Select Folder</label>
        <div className={styles.customSelect} onClick={() => !applyingPatterns && setFolderSelectOpen(!folderSelectOpen)}>
          <div className={styles.selectedValue}>
            {selectedFolder || 'Select a folder'}
            <ChevronDown size={16} className={`${styles.chevron} ${folderSelectOpen ? styles.open : ''}`} />
          </div>
          {folderSelectOpen && (
            <div className={styles.optionsContainer}>
              {recentFolders.length > 0 ? (
                recentFolders.map((folder, index) => (
                  <div 
                    key={index} 
                    className={styles.option} 
                    onClick={() => handleFolderChange(folder)}
                  >
                    {folder}
                  </div>
                ))
              ) : (
                <div className={styles.option}>{selectedFolder || 'No folders available'}</div>
              )}
            </div>
          )}
        </div>
        <div className={styles.pathDisplay}>
          {selectedFolder ? `${selectedFolder}/.repo_ignore` : 'No folder selected'}
        </div>
      </div>
    )}
    
    <textarea 
      className={styles.patternsInput}
      value={activeTab === "global" ? globalPatterns : localPatterns}
      onChange={handleTextareaChange}
      onKeyDown={handleKeyDown}
      placeholder="Enter ignore patterns, one per line..."
      disabled={applyingPatterns || (activeTab === "local" && !selectedFolder)}
    />
  </div>
  ```

### Add Pattern Preview Section

- [ ] **Implement the pattern preview section in `src/components/IgnorePatterns.tsx`**:
  ```jsx
  <div className={styles.previewSection}>
    <div className={styles.previewContainer}>
      <div className={styles.previewHeader}>
        <span>Effective Patterns</span>
        <span className={styles.patternCount}>
          {mergedPreview.split('\n').filter(line => line.trim()).length} patterns active
        </span>
      </div>
      {mergedPreview.split('\n').map((line, index) => {
        // Determine the pattern type for styling
        const isSystemPattern = systemIgnorePatterns.includes(line);
        const isGlobalPattern = globalPatterns.includes(line);
        const isLocalPattern = !isSystemPattern && !isGlobalPattern;
        
        // Skip empty lines
        if (!line.trim()) return null;
        
        return (
          <div 
            key={index} 
            className={`${styles.previewLine} ${
              isSystemPattern ? styles.previewSystem : 
              isGlobalPattern ? styles.previewGlobal : 
              styles.previewLocal
            }`}
          >
            {line}
            <span className={styles.previewBadge}>
              {isSystemPattern ? 'system' : isGlobalPattern ? 'global' : 'local'}
            </span>
          </div>
        );
      })}
    </div>
  </div>
  ```

### Update Action Buttons

- [ ] **Update the action buttons in `src/components/IgnorePatterns.tsx`**:
  ```jsx
  <div className={styles.modalActions}>
    {activeTab === "global" ? (
      <>
        <Button 
          variant="primary" 
          onClick={handleSaveGlobalPatterns}
          disabled={applyingPatterns}
        >
          Save Global Patterns
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleResetGlobalPatterns}
          disabled={applyingPatterns}
        >
          Reset to Defaults
        </Button>
      </>
    ) : (
      <>
        <Button 
          variant="primary" 
          onClick={handleSaveLocalPatterns}
          disabled={!selectedFolder || applyingPatterns}
        >
          Save Local Patterns
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleResetLocalPatterns}
          disabled={!selectedFolder || applyingPatterns}
        >
          Reset to Defaults
        </Button>
        <Button 
          variant="destructive" 
          onClick={handleClearLocalPatterns}
          disabled={!selectedFolder || applyingPatterns}
        >
          Clear All Patterns
        </Button>
      </>
    )}
    
    <Button 
      variant="ghost"
      onClick={onClose}
      disabled={applyingPatterns}
    >
      Cancel
    </Button>
  </div>
  ```

## 4. Implement Pattern Processing Logic

### Add Preview Generator in IgnorePatterns.tsx

- [ ] **Implement the merged preview generator in `src/components/IgnorePatterns.tsx`**:
  ```typescript
  useEffect(() => {
    // Skip if no system patterns are loaded
    if (!systemIgnorePatterns.length) return;
    
    // Get active patterns
    const userPatterns = activeTab === "global" ? globalPatterns : localPatterns;
    
    // Filter system patterns (exclude ones the user has disabled)
    const activeSystemPatterns = systemIgnorePatterns.filter(
      (pattern) => !excludedSystemPatterns.includes(pattern)
    );
    
    // Combine patterns
    const mergedLines = [
      ...activeSystemPatterns,
      ...userPatterns.split("\n").filter((line) => line.trim() !== "")
    ];
    
    // Set the preview
    setMergedPreview(mergedLines.join("\n"));
  }, [
    activeTab, 
    globalPatterns, 
    localPatterns, 
    systemIgnorePatterns, 
    excludedSystemPatterns
  ]);
  ```

### Update Pattern Saving Functions

- [ ] **Update the `handleSaveGlobalPatterns` function in `src/components/IgnorePatterns.tsx`**:
  ```typescript
  const handleSaveGlobalPatterns = async () => {
    setApplyingPatterns(true);
    
    // Create the final pattern string with excluded info
    let finalPatterns = globalPatterns;
    
    // Add comments indicating which system patterns are excluded
    if (excludedSystemPatterns.length > 0) {
      finalPatterns = excludedSystemPatterns
        .map(pattern => `# DISABLED: ${pattern}`)
        .join('\n') + '\n\n' + finalPatterns;
    }
    
    // Save to global location
    await saveIgnorePatterns(finalPatterns, true);
  };
  ```

- [ ] **Update the `handleSaveLocalPatterns` function in `src/components/IgnorePatterns.tsx`**:
  ```typescript
  const handleSaveLocalPatterns = async () => {
    setApplyingPatterns(true);
    
    // Create the final pattern string
    let finalPatterns = localPatterns;
    
    // Save to local location
    await saveIgnorePatterns(finalPatterns, false, selectedFolder);
  };
  ```

## 5. Update App.tsx to Handle Excluded Patterns

### Add Pattern Parsing Function

- [ ] **Add the `parseIgnorePatternsContent` function to `src/App.tsx`**:
  ```typescript
  const parseIgnorePatternsContent = (content: string) => {
    const lines = content.split('\n');
    const excludedPatterns: string[] = [];
    const userPatterns: string[] = [];
    
    let inDisabledSection = true;
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('# DISABLED:')) {
        const pattern = trimmed.substring('# DISABLED:'.length).trim();
        if (pattern) {
          excludedPatterns.push(pattern);
        }
      } else if (trimmed === '') {
        // Empty line could separate disabled section from user patterns
        inDisabledSection = false;
      } else {
        inDisabledSection = false;
        userPatterns.push(line);
      }
    });
    
    return {
      excludedPatterns,
      userPatterns: userPatterns.join('\n')
    };
  };
  ```

### Update loadIgnorePatterns Function

- [ ] **Update the `loadIgnorePatterns` function in `src/App.tsx`**:
  ```typescript
  const loadIgnorePatterns = useCallback(async (folderPath: string, isGlobal: boolean = false) => {
    if (!window.electron) {
      console.log("Not in Electron environment, skipping loadIgnorePatterns");
      return "";
    }
    
    // Prevent duplicate loading of patterns
    if (isGlobal && globalIgnorePatterns !== "") {
      console.log("Global ignore patterns already loaded, skipping...");
      return globalIgnorePatterns;
    }
    
    if (!isGlobal && folderPath === selectedFolder && localIgnorePatterns !== "") {
      console.log("Local ignore patterns already loaded for current folder, skipping...");
      return localIgnorePatterns;
    }
    
    console.log(`Loading ${isGlobal ? 'global' : 'local'} ignore patterns${!isGlobal ? ` for ${folderPath}` : ''}`);
    
    try {
      const result = await window.electron.ipcRenderer.invoke("load-ignore-patterns", {
        folderPath,
        isGlobal
      });
      
      // Parse the content to extract disabled system patterns
      const { excludedPatterns, userPatterns } = parseIgnorePatternsContent(
        result.patterns || ''
      );
      
      // Store system patterns if provided
      if (result.systemPatterns && Array.isArray(result.systemPatterns)) {
        console.log(`Received ${result.systemPatterns.length} system patterns from main process`);
        setSystemIgnorePatterns(result.systemPatterns);
      } else {
        console.warn('Using default system patterns');
        setSystemIgnorePatterns(DEFAULT_SYSTEM_PATTERNS);
      }
      
      // Update pattern state
      if (isGlobal) {
        setGlobalIgnorePatterns(userPatterns);
        setExcludedSystemPatterns(excludedPatterns);
      } else if (folderPath === selectedFolder) {
        // Only update local patterns if they're for the current folder
        setLocalIgnorePatterns(userPatterns);
      }
      
      return userPatterns;
    } catch (error) {
      console.error(`Error loading ${isGlobal ? 'global' : 'local'} ignore patterns:`, error);
      // Return empty string for local patterns, defaults for global
      const defaultPatterns = isGlobal ? DEFAULT_SYSTEM_PATTERNS : '';
      if (isGlobal) {
        setGlobalIgnorePatterns(defaultPatterns);
      } else if (folderPath === selectedFolder) {
        setLocalIgnorePatterns(defaultPatterns);
      }
      setSystemIgnorePatterns(DEFAULT_SYSTEM_PATTERNS);
      return defaultPatterns;
    }
  }, [globalIgnorePatterns, localIgnorePatterns, selectedFolder]);
  ```

## 6. Update Ignore Patterns Component Props to Support New Features

- [ ] **Update the props interface in `src/components/IgnorePatterns.tsx`**:
  ```typescript
  interface IgnorePatternsProps {
    isOpen: boolean;
    onClose: () => void;
    globalIgnorePatterns: string;
    localIgnorePatterns: string;
    localFolderPath?: string;
    processingStatus?: {
      status: "idle" | "processing" | "complete" | "error";
      message: string;
    };
    saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath?: string) => Promise<void>;
    resetIgnorePatterns: (isGlobal: boolean, folderPath?: string) => Promise<void>;
    clearIgnorePatterns: (folderPath: string) => Promise<void>;
    systemIgnorePatterns: string[];
    recentFolders: string[];
    excludedSystemPatterns?: string[];
    setExcludedSystemPatterns?: (patterns: string[]) => void;
  }
  ```

## 7. Group System Patterns into Categories

- [ ] **Create pattern categories in `src/App.tsx`**:
  ```typescript
  const SYSTEM_PATTERN_CATEGORIES = {
    versionControl: [
      "**/.git/**",
      "**/.svn/**",
      "**/.hg/**",
      "**/.cvs/**"
    ],
    buildFiles: [
      "**/dist/**",
      "**/build/**",
      "**/.output/**"
    ],
    mediaFiles: [
      "**/*.png",
      "**/*.jpg",
      "**/*.jpeg",
      "**/*.gif",
      "**/*.webp",
      "**/*.svg",
      "**/*.mp4",
      "**/*.mp3",
      "**/*.flac",
      "**/*.wav"
    ],
    documentation: [
      "**/*.pdf",
      "**/*.doc",
      "**/*.docx",
      "**/*.xls",
      "**/*.xlsx"
    ],
    dependencies: [
      "**/node_modules/**",
      "**/__pycache__/**",
      "**/venv/**",
      "**/vendor/**"
    ]
  };
  ```

- [ ] **Pass categorized patterns to IgnorePatterns component from `src/App.tsx`**:
  ```typescript
  <IgnorePatterns 
    isOpen={ignoreModalOpen}
    onClose={() => setIgnoreModalOpen(false)}
    globalIgnorePatterns={globalIgnorePatterns}
    localIgnorePatterns={localIgnorePatterns}
    localFolderPath={selectedFolder || ""}
    processingStatus={{ status: "idle", message: "" }}
    saveIgnorePatterns={saveIgnorePatterns}
    resetIgnorePatterns={resetIgnorePatterns}
    clearIgnorePatterns={clearLocalIgnorePatterns}
    systemIgnorePatterns={systemIgnorePatterns}
    recentFolders={getAvailableFolders()}
    excludedSystemPatterns={excludedSystemPatterns}
    setExcludedSystemPatterns={setExcludedSystemPatterns}
    systemPatternCategories={SYSTEM_PATTERN_CATEGORIES}
  />
  ```

## 8. Update IgnorePatterns Component to Use Categorized Patterns

- [ ] **Update the system patterns section to use categories in `src/components/IgnorePatterns.tsx`**:
  ```jsx
  {activeTab === "global" && (
    <div className={styles.systemPatternsSection}>
      <h3 className={styles.sectionTitle}>System Patterns</h3>
      
      {Object.entries(systemPatternCategories).map(([category, patterns]) => (
        <div 
          key={category}
          className={`${styles.patternCategory} ${expandedCategories[category] ? styles.categoryExpanded : ''}`}
        >
          <div 
            className={styles.categoryHeader} 
            onClick={() => toggleCategory(category)}
          >
            <div className={styles.categoryTitle}>
              {/* Convert category from camelCase to Title Case for display */}
              {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </div>
            <div className={styles.categoryMeta}>
              <span className={styles.categoryCount}>
                {patterns.filter(p => !excludedSystemPatterns.includes(p)).length}/{patterns.length}
              </span>
              <ChevronDown 
                size={16} 
                className={`${styles.chevron} ${expandedCategories[category] ? styles.chevronRotated : ''}`} 
              />
            </div>
          </div>
          
          {expandedCategories[category] && (
            <div className={styles.categoryItems}>
              {patterns.map(pattern => (
                <div key={pattern} className={styles.systemPatternItem}>
                  <span className={styles.patternText}>{pattern}</span>
                  <Switch
                    checked={!excludedSystemPatterns.includes(pattern)}
                    onChange={() => handleToggleSystemPattern(pattern)}
                    className={styles.smallerSwitch}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )}
  ```

Here are the major steps 9 and 10 to complete the implementation guide:

## 9. Add Keyboard Shortcuts

- [ ] **Update the `handleKeyDown` function in `src/components/IgnorePatterns.tsx`**:
  ```typescript
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Save on Ctrl+S / Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      
      if (activeTab === 'global') {
        handleSaveGlobalPatterns();
      } else if (selectedFolder) {
        handleSaveLocalPatterns();
      }
    }
    
    // Close on Escape
    if (e.key === 'Escape') {
      onClose();
    }
  };
  ```

- [ ] **Add global keydown event listener for the entire modal**:
  ```typescript
  useEffect(() => {
    if (isOpen) {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault();
          if (activeTab === 'global') {
            handleSaveGlobalPatterns();
          } else if (selectedFolder) {
            handleSaveLocalPatterns();
          }
        }
      };
      
      document.addEventListener('keydown', handleGlobalKeyDown);
      return () => {
        document.removeEventListener('keydown', handleGlobalKeyDown);
      };
    }
  }, [isOpen, activeTab, selectedFolder]);
  ```

## 10. Add Visual Feedback for User Actions

- [ ] **Add visual feedback for pattern toggling in `src/components/IgnorePatterns.tsx`**:
  ```typescript
  const handleToggleSystemPattern = (pattern: string) => {
    // Add visual feedback animation when toggling
    const patternElement = document.querySelector(`[data-pattern="${pattern}"]`);
    if (patternElement) {
      patternElement.classList.add(styles.patternToggled);
      setTimeout(() => {
        patternElement.classList.remove(styles.patternToggled);
      }, 300);
    }
    
    setExcludedSystemPatterns(prev => {
      if (prev.includes(pattern)) {
        return prev.filter(p => p !== pattern);
      } else {
        return [...prev, pattern];
      }
    });
  };
  ```

- [ ] **Add toast notification for save actions in `src/components/IgnorePatterns.tsx`**:
  ```typescript
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    const notification = document.createElement('div');
    notification.className = `${styles.notification} ${styles[type]}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.add(styles.visible);
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.remove(styles.visible);
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };
  
  const handleSaveGlobalPatterns = async () => {
    setApplyingPatterns(true);
    
    // Create the final pattern string with excluded info
    let finalPatterns = globalPatterns;
    
    // Add comments indicating which system patterns are excluded
    if (excludedSystemPatterns.length > 0) {
      finalPatterns = excludedSystemPatterns
        .map(pattern => `# DISABLED: ${pattern}`)
        .join('\n') + '\n\n' + finalPatterns;
    }
    
    try {
      // Save to global location
      await saveIgnorePatterns(finalPatterns, true);
      showNotification('Global patterns saved successfully!');
    } catch (error) {
      showNotification(`Error saving patterns: ${error}`, 'error');
    } finally {
      setApplyingPatterns(false);
    }
  };
  ```

- [ ] **Add CSS styles for visual feedback in `src/components/IgnorePatterns.module.css`**:
  ```css
  .patternToggled {
    animation: togglePulse 0.3s ease-in-out;
  }
  
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 16px;
    border-radius: var(--radius);
    background-color: var(--background-primary);
    color: var(--text-primary);
    box-shadow: var(--shadow-md);
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    z-index: var(--z-index-modal);
  }
  
  .notification.visible {
    transform: translateY(0);
    opacity: 1;
  }
  
  .notification.success {
    border-left: 4px solid var(--success-color);
  }
  
  .notification.error {
    border-left: 4px solid var(--error-color);
  }
  
  @keyframes togglePulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  ```