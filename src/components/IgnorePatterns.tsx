import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, RefreshCw, ChevronDown, Trash2, Check } from "lucide-react";
import { Button, Switch } from "./ui";
import { ErrorBoundary } from './ErrorBoundary';
import styles from "./IgnorePatterns.module.css";

// Props interface
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
  systemPatternCategories?: Record<string, string[]>;
}

/**
 * Custom error for pattern validation
 */
class PatternValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PatternValidationError';
  }
}

/**
 * Validates a glob pattern for syntax errors
 */
const validatePattern = (pattern: string): boolean => {
  // Allow all characters in glob patterns - they are valid in .gitignore
  // Only check for empty patterns
  if (!pattern.trim()) {
    throw new PatternValidationError(`Invalid pattern: Pattern cannot be empty`);
  }
  return true;
};

/**
 * IgnorePatterns Component wrapped with error boundary
 */
const IgnorePatternsWithErrorBoundary: React.FC<IgnorePatternsProps> = (props) => (
  <ErrorBoundary
    fallback={
      <div className={styles.errorFallback}>
        <h3>Error in Ignore Patterns</h3>
        <p>There was an error managing ignore patterns. Please try again.</p>
        <Button variant="primary" onClick={props.onClose}>Close</Button>
      </div>
    }
  >
    <IgnorePatterns {...props} />
  </ErrorBoundary>
);

/**
 * Inner component with actual implementation
 */
const IgnorePatterns: React.FC<IgnorePatternsProps> = ({
  isOpen,
  onClose,
  globalIgnorePatterns,
  localIgnorePatterns,
  localFolderPath,
  processingStatus = { status: "idle", message: "" },
  saveIgnorePatterns,
  resetIgnorePatterns,
  clearIgnorePatterns,
  systemIgnorePatterns,
  recentFolders,
  excludedSystemPatterns = [],
  setExcludedSystemPatterns,
  systemPatternCategories = {
    versionControl: ["**/.git/**", "**/.svn/**"],
    buildFiles: ["**/dist/**", "**/build/**"],
    mediaFiles: ["**/*.png", "**/*.jpg", "**/*.jpeg"],
    documentation: ["**/*.pdf", "**/*.doc"],
    dependencies: ["**/node_modules/**", "**/__pycache__/**"]
  }
}) => {
  /**
   * Component State Management
   */
  
  // Track initialization
  const isInitialized = useRef(false);
  
  // Controlled mode detection
  const isControlled = useRef(typeof setExcludedSystemPatterns === 'function').current;
  
  // Pattern management state with memoized initializer
  const [internalExcludedPatterns, setInternalExcludedPatterns] = useState(() => 
    excludedSystemPatterns || []
  );
  const [globalPatterns, setGlobalPatterns] = useState<string>(globalIgnorePatterns);
  const [localPatterns, setLocalPatterns] = useState<string>(localIgnorePatterns);
  const [mergedPreview, setMergedPreview] = useState<string>("");
  
  // UI state
  const [activeTab, setActiveTab] = useState<"global" | "local">("global");
  const [selectedFolder, setSelectedFolder] = useState<string | undefined>(localFolderPath);
  const [applyingPatterns, setApplyingPatterns] = useState<boolean>(false);
  const [folderSelectOpen, setFolderSelectOpen] = useState(false);
  
  // Category expansion state
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.keys(systemPatternCategories).reduce((acc, category) => ({
      ...acc,
      [category]: true
    }), {})
  );
  
  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  /**
   * Initialize component state when modal opens
   */
  useEffect(() => {
    if (!isOpen || isInitialized.current) return;
    
    setGlobalPatterns(globalIgnorePatterns);
    setLocalPatterns(localIgnorePatterns);
    setSelectedFolder(localFolderPath);
    setInternalExcludedPatterns(excludedSystemPatterns || []);
    setApplyingPatterns(false);
    
    isInitialized.current = true;
  }, [isOpen]); // Only depend on isOpen
  
  /**
   * Reset initialization flag when modal closes
   */
  useEffect(() => {
    if (!isOpen) {
      isInitialized.current = false;
    }
  }, [isOpen]);
  
  /**
   * Sync with parent in controlled mode
   */
  useEffect(() => {
    if (isControlled && isOpen && setExcludedSystemPatterns) {
      const currentPatterns = JSON.stringify(internalExcludedPatterns);
      const propPatterns = JSON.stringify(excludedSystemPatterns || []);
      
      if (currentPatterns !== propPatterns) {
        setExcludedSystemPatterns(internalExcludedPatterns);
      }
    }
  }, [internalExcludedPatterns, isControlled, isOpen, setExcludedSystemPatterns, excludedSystemPatterns]);
  
  // Update local patterns when selected folder changes
  useEffect(() => {
    if (selectedFolder === localFolderPath) {
      setLocalPatterns(localIgnorePatterns);
    } else {
      // Reset local patterns when a different folder is selected
      setLocalPatterns('');
    }
  }, [selectedFolder, localFolderPath, localIgnorePatterns]);
  
  // Update UI based on processing status
  useEffect(() => {
    if (!processingStatus) return;
    
    if (processingStatus.status === 'processing') {
      setApplyingPatterns(true);
    } else if (processingStatus.status === 'complete' || processingStatus.status === 'error') {
      // Delay resetting to allow for visual feedback
      setTimeout(() => setApplyingPatterns(false), 500);
    }
  }, [processingStatus]);
  
  // Generate merged preview
  useEffect(() => {
    // Get active patterns based on current tab
    const userPatterns = activeTab === "global" ? globalPatterns : localPatterns;
    
    // Filter system patterns using internal state
    const activeSystemPatterns = systemIgnorePatterns.filter(
      pattern => !internalExcludedPatterns.includes(pattern)
    );
    
    // Split and filter user patterns to remove empty lines
    const userPatternLines = userPatterns
      .split("\n")
      .filter(line => line.trim() !== "");
    
    // Combine patterns with system patterns first
    const mergedLines = [
      ...activeSystemPatterns,
      ...userPatternLines
    ];
    
    // Update preview with combined patterns
    setMergedPreview(mergedLines.join("\n"));
  }, [
    activeTab,
    globalPatterns,
    localPatterns,
    systemIgnorePatterns,
    internalExcludedPatterns
  ]);
  
  /**
   * Event Handlers
   */
  
  // Tab and input handlers
  const handleTabChange = (isGlobal: boolean) => {
    setActiveTab(isGlobal ? "global" : "local");
  };
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (activeTab === 'global') {
      setGlobalPatterns(value);
    } else {
      setLocalPatterns(value);
    }
  };
  
  // Folder selection handlers
  const handleFolderChange = (folderPath: string) => {
    setSelectedFolder(folderPath);
    setFolderSelectOpen(false);
  };
  
  // Category management
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // System pattern management
  const handleToggleSystemPattern = useCallback((pattern: string) => {
    try {
      validatePattern(pattern);
      
      setInternalExcludedPatterns(prev => {
        const newPatterns = prev.includes(pattern)
          ? prev.filter(p => p !== pattern)
          : [...prev, pattern];
        return newPatterns;
      });

      // Visual feedback
      const patternElement = document.querySelector(`[data-pattern="${pattern}"]`);
      if (patternElement) {
        patternElement.classList.add(styles.patternToggled);
        setTimeout(() => {
          patternElement.classList.remove(styles.patternToggled);
        }, 300);
      }
    } catch (error) {
      console.error('Error toggling pattern:', error);
      // Show error in UI instead of console
      if (error instanceof PatternValidationError) {
        // You could add a toast/notification system here
        console.warn('Pattern validation failed:', error.message);
      }
    }
  }, []);
  
  // Pattern saving handlers
  const handleSaveGlobalPatterns = async () => {
    try {
      setApplyingPatterns(true);
      
      // Validate all patterns before saving
      const userPatterns = globalPatterns.split('\n').filter(p => p.trim());
      userPatterns.forEach(validatePattern);
      
      // Format disabled patterns with comments
      const disabledPatternsSection = internalExcludedPatterns.length > 0
        ? internalExcludedPatterns
            .map(pattern => `# DISABLED: ${pattern}`)
            .join('\n')
        : '';
      
      // Combine disabled patterns with global patterns
      const patternsWithDisabled = disabledPatternsSection
        ? `${disabledPatternsSection}\n\n${globalPatterns}`
        : globalPatterns;
      
      // Save patterns and sync state if in controlled mode
      try {
        await saveIgnorePatterns(patternsWithDisabled, true);
        if (isControlled && setExcludedSystemPatterns) {
          setExcludedSystemPatterns(internalExcludedPatterns);
        }
      } catch (error) {
        // Handle IPC errors
        if (error instanceof Error && error.message.includes('No handler registered')) {
          console.error('IPC handler not found:', error);
          // You could show a user-friendly error message here
        } else {
          throw error; // Re-throw other errors
        }
      }
    } catch (error) {
      console.error('Error saving global patterns:', error);
      if (error instanceof PatternValidationError) {
        // Handle validation error
        console.warn('Pattern validation failed:', error.message);
      }
    } finally {
      setApplyingPatterns(false);
    }
  };
  
  const handleSaveLocalPatterns = async () => {
    if (!selectedFolder) return;
    
    try {
      setApplyingPatterns(true);
      
      // Validate all patterns before saving
      const userPatterns = localPatterns.split('\n').filter(p => p.trim());
      userPatterns.forEach(validatePattern);
      
      try {
        await saveIgnorePatterns(localPatterns, false, selectedFolder);
      } catch (error) {
        // Handle IPC errors
        if (error instanceof Error && error.message.includes('No handler registered')) {
          console.error('IPC handler not found:', error);
          // You could show a user-friendly error message here
        } else {
          throw error; // Re-throw other errors
        }
      }
    } catch (error) {
      console.error('Error saving local patterns:', error);
      if (error instanceof PatternValidationError) {
        // Handle validation error
        console.warn('Pattern validation failed:', error.message);
      }
    } finally {
      setApplyingPatterns(false);
    }
  };
  
  // Pattern reset handlers
  const handleResetGlobalPatterns = async () => {
    setApplyingPatterns(true);
    await resetIgnorePatterns(true);
  };
  
  const handleResetLocalPatterns = async () => {
    if (!selectedFolder) return;
    setApplyingPatterns(true);
    await resetIgnorePatterns(false, selectedFolder);
  };
  
  const handleClearLocalPatterns = async () => {
    if (!selectedFolder) return;
    setApplyingPatterns(true);
    await clearIgnorePatterns(selectedFolder);
  };
  
  // Modal management
  const handleModalClose = () => {
    // If controlled, call parent's setter with final state
    if (isControlled && setExcludedSystemPatterns) {
      setExcludedSystemPatterns(internalExcludedPatterns);
    }
    
    // Call the original onClose
    onClose();
  };
  
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
      handleModalClose();
    }
  };
  
  /**
   * Helper Functions
   */
  
  // Status message renderer
  const renderStatusMessage = () => {
    if (!processingStatus || processingStatus.status === 'idle') {
      return null;
    }
    
    let statusClass = styles.statusMessage;
    switch (processingStatus.status) {
      case 'processing':
        statusClass += ` ${styles.processing}`;
        break;
      case 'complete':
        statusClass += ` ${styles.complete}`;
        break;
      case 'error':
        statusClass += ` ${styles.error}`;
        break;
      default:
        statusClass += ` ${styles.idle}`;
    }
    
    return (
      <div className={statusClass}>
        {processingStatus.message}
      </div>
    );
  };
  
  // Early return if modal is not open
  if (!isOpen) {
    return null;
  }
  
  /**
   * Component Render
   */
  
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>
            Ignore Patterns
            {applyingPatterns && <span className={styles.applying}>(Applying...)</span>}
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleModalClose}
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
        
        {activeTab === "global" && (
          <div className={styles.systemPatternsSection}>
            <h3 className={styles.sectionTitle}>
              System Patterns
              <span className={styles.totalCount}>
                ({systemIgnorePatterns.length - internalExcludedPatterns.length} active)
              </span>
            </h3>
            
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
                    {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                  <div className={styles.categoryMeta}>
                    <span className={styles.categoryCount}>
                      {patterns.filter(p => !internalExcludedPatterns.includes(p)).length}/{patterns.length}
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`${styles.chevron} ${expandedCategories[category] ? styles.chevronRotated : ''}`} 
                    />
                  </div>
                </div>
                
                {expandedCategories[category] && (
                  <div className={styles.categoryItems}>
                    {patterns.map(pattern => {
                      const isEnabled = !internalExcludedPatterns.includes(pattern);
                      return (
                        <div 
                          key={pattern} 
                          className={`${styles.systemPatternItem} ${isEnabled ? styles.enabled : styles.disabled}`}
                          data-pattern={pattern}
                        >
                          <span className={styles.patternText}>{pattern}</span>
                          <Switch
                            checked={isEnabled}
                            onChange={() => handleToggleSystemPattern(pattern)}
                            className={styles.smallerSwitch}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
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
            ref={textareaRef}
            className={styles.patternsInput}
            value={activeTab === "global" ? globalPatterns : localPatterns}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter ignore patterns, one per line..."
            disabled={applyingPatterns || (activeTab === "local" && !selectedFolder)}
          />
        </div>
        
        <div className={styles.previewSection}>
          <div className={styles.previewContainer}>
            <div className={styles.previewHeader}>
              <span>Effective Patterns</span>
              <span className={styles.patternCount}>
                {mergedPreview.split('\n').filter(line => line.trim()).length} patterns active
              </span>
            </div>
            {mergedPreview.split('\n').map((line, index) => {
              if (!line.trim()) return null;
              
              const isSystemPattern = systemIgnorePatterns.includes(line);
              const isGlobalPattern = globalPatterns.includes(line);
              const isLocalPattern = !isSystemPattern && !isGlobalPattern;
              
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
        
        {/* Status Message */}
        {renderStatusMessage()}
        
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
            onClick={handleModalClose}
            disabled={applyingPatterns}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IgnorePatternsWithErrorBoundary; 