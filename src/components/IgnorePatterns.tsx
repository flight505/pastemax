import React, { useState, useEffect, useRef } from 'react';
import { X, RefreshCw, ChevronDown, Trash2, Check } from "lucide-react";
import { Button, Switch } from "./ui";
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
  // State for the active tab
  const [activeTab, setActiveTab] = useState<"global" | "local">("global");
  
  // State for the textarea values
  const [globalPatterns, setGlobalPatterns] = useState<string>(globalIgnorePatterns);
  const [localPatterns, setLocalPatterns] = useState<string>(localIgnorePatterns);
  
  // State for expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.keys(systemPatternCategories).reduce((acc, category) => ({
      ...acc,
      [category]: true
    }), {})
  );
  
  // State for the merged preview
  const [mergedPreview, setMergedPreview] = useState<string>("");
  
  // State for the selected folder
  const [selectedFolder, setSelectedFolder] = useState<string | undefined>(localFolderPath);
  
  // State for pattern application status
  const [applyingPatterns, setApplyingPatterns] = useState<boolean>(false);
  const [folderSelectOpen, setFolderSelectOpen] = useState(false);
  
  // Ref for the textarea to focus it
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Effect to initialize the components with the props
  useEffect(() => {
    if (isOpen) {
      setGlobalPatterns(globalIgnorePatterns);
      setLocalPatterns(localIgnorePatterns);
      setSelectedFolder(localFolderPath);
      
      // Reset the pattern application status
      setApplyingPatterns(false);
    }
  }, [isOpen, globalIgnorePatterns, localIgnorePatterns, localFolderPath]);
  
  // Effect to update local patterns when selectedFolder changes
  useEffect(() => {
    if (selectedFolder === localFolderPath) {
      setLocalPatterns(localIgnorePatterns);
    } else {
      // Reset local patterns when a different folder is selected
      setLocalPatterns('');
    }
  }, [selectedFolder, localFolderPath, localIgnorePatterns]);
  
  // Effect to update UI based on processing status
  useEffect(() => {
    if (!processingStatus) {
      return; // Exit early if processingStatus is undefined or null
    }
    
    if (processingStatus.status === 'processing') {
      setApplyingPatterns(true);
    } else if (processingStatus.status === 'complete' || processingStatus.status === 'error') {
      // Delay resetting to allow for visual feedback
      setTimeout(() => {
        setApplyingPatterns(false);
      }, 500);
    }
  }, [processingStatus]);
  
  // Effect to generate merged preview
  useEffect(() => {
    // Get active patterns based on current tab
    const userPatterns = activeTab === "global" ? globalPatterns : localPatterns;
    
    // Filter system patterns (exclude disabled ones)
    const activeSystemPatterns = systemIgnorePatterns.filter(
      pattern => !excludedSystemPatterns.includes(pattern)
    );
    
    // Combine patterns
    const mergedLines = [
      ...activeSystemPatterns,
      ...userPatterns.split("\n").filter(line => line.trim() !== "")
    ];
    
    setMergedPreview(mergedLines.join("\n"));
  }, [activeTab, globalPatterns, localPatterns, systemIgnorePatterns, excludedSystemPatterns]);
  
  // Function to handle tab change
  const handleTabChange = (isGlobal: boolean) => {
    setActiveTab(isGlobal ? "global" : "local");
  };
  
  // Function to handle textarea change
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    
    if (activeTab === 'global') {
      setGlobalPatterns(value);
    } else {
      setLocalPatterns(value);
    }
  };
  
  // Function to handle folder selection
  const handleFolderChange = (folderPath: string) => {
    setSelectedFolder(folderPath);
    setFolderSelectOpen(false);
  };
  
  // Function to toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Function to handle system pattern toggling with visual feedback
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
  
  // Functions to handle saving patterns
  const handleSaveGlobalPatterns = async () => {
    setApplyingPatterns(true);
    const patternsWithDisabled = excludedSystemPatterns.length > 0
      ? excludedSystemPatterns
          .map(pattern => `# DISABLED: ${pattern}`)
          .join('\n') + '\n\n' + globalPatterns
      : globalPatterns;
    await saveIgnorePatterns(patternsWithDisabled, true);
  };
  
  const handleSaveLocalPatterns = async () => {
    if (selectedFolder) {
      setApplyingPatterns(true);
      await saveIgnorePatterns(localPatterns, false, selectedFolder);
    }
  };
  
  // Functions to handle resetting patterns
  const handleResetGlobalPatterns = async () => {
    setApplyingPatterns(true);
    await resetIgnorePatterns(true);
  };
  
  const handleResetLocalPatterns = async () => {
    if (selectedFolder) {
      setApplyingPatterns(true);
      await resetIgnorePatterns(false, selectedFolder);
    }
  };
  
  // Function to handle clearing patterns
  const handleClearLocalPatterns = async () => {
    if (selectedFolder) {
      setApplyingPatterns(true);
      await clearIgnorePatterns(selectedFolder);
    }
  };
  
  // Function to handle keyboard events
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
  
  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }
  
  // Function to render the processing status message
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
                      <div 
                        key={pattern} 
                        className={styles.systemPatternItem}
                        data-pattern={pattern}
                      >
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
            onClick={onClose}
            disabled={applyingPatterns}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IgnorePatterns; 