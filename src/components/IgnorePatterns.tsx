import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronDown } from "lucide-react";
import { Button, Switch } from "./ui";
import { ErrorBoundary } from './ErrorBoundary';
import styles from "./IgnorePatterns.module.css";
import { SYSTEM_PATTERN_CATEGORIES } from "../utils/patternUtils";

// Define the structure for pattern state passed from App
interface IgnorePatternsState {
  patterns: string;
  excludedSystemPatterns: string[];
}

// Props interface - Updated
interface IgnorePatternsProps {
  isOpen: boolean;
  onClose: () => void;
  // Pass the full state objects
  globalPatternsState: IgnorePatternsState;
  localPatternsState: IgnorePatternsState; // Only 'patterns' part is relevant here
  localFolderPath?: string;
  processingStatus?: {
    status: "idle" | "processing" | "complete" | "error";
    message: string;
  };
  // Callbacks to App.tsx
  saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath?: string) => Promise<void>;
  resetIgnorePatterns: (isGlobal: boolean, folderPath?: string) => Promise<void>;
  clearIgnorePatterns: (folderPath: string) => Promise<void>;
  // For controlling excluded system patterns
  onExcludedSystemPatternsChange: (patterns: string[]) => void;
  systemIgnorePatterns: string[]; // Full list of available system patterns
  recentFolders: string[];
}

// Custom error for pattern validation
class PatternValidationError extends Error {
 constructor(message: string) {
  super(message);
  this.name = 'PatternValidationError';
 }
}

// Validates a glob pattern for syntax errors
const validatePattern = (pattern: string): boolean => {
  if (!pattern.trim()) {
   throw new PatternValidationError(`Invalid pattern: Pattern cannot be empty`);
  }
  return true;
};


const IgnorePatternsWithErrorBoundary: React.FC<IgnorePatternsProps> = (props) => (
  <ErrorBoundary fallback={ <div>Error loading ignore patterns component.</div> }>
    <IgnorePatterns {...props} />
  </ErrorBoundary>
);

const IgnorePatterns: React.FC<IgnorePatternsProps> = ({
  isOpen,
  onClose,
  globalPatternsState, // Now an object { patterns, excludedSystemPatterns }
  localPatternsState,  // Now an object { patterns, excludedSystemPatterns } (but we only use patterns)
  localFolderPath,
  processingStatus = { status: "idle", message: "" },
  saveIgnorePatterns,
  resetIgnorePatterns,
  clearIgnorePatterns,
  onExcludedSystemPatternsChange,
  systemIgnorePatterns,
  recentFolders,
}) => {
  /**
   * Component State Management
   */
  const isInitialized = useRef(false);

  // Use safe initializers for useState, relying on useEffect for sync
  const [currentGlobalPatterns, setCurrentGlobalPatterns] = useState<string>('');
  const [currentLocalPatterns, setCurrentLocalPatterns] = useState<string>('');
  const [mergedPreview, setMergedPreview] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"global" | "local">("global");
  const [selectedFolder, setSelectedFolder] = useState<string | undefined>(localFolderPath);
  const [applyingPatterns, setApplyingPatterns] = useState<boolean>(false);
  const [folderSelectOpen, setFolderSelectOpen] = useState(false);

  // Derive excluded patterns directly from props for controlled behavior
  // Add safe fallback for initial render if globalPatternsState is somehow undefined briefly
  const excludedSystemPatterns = globalPatternsState?.excludedSystemPatterns || [];

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.keys(SYSTEM_PATTERN_CATEGORIES).reduce((acc, category) => ({ ...acc, [category]: true }), {})
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Sync internal state with props when modal opens or props change
   */
  useEffect(() => {
    if (isOpen) {
      // Safely access props, providing defaults if undefined during initial render cycle
      setCurrentGlobalPatterns(globalPatternsState?.patterns ?? '');
      if (selectedFolder === localFolderPath) {
          setCurrentLocalPatterns(localPatternsState?.patterns ?? '');
      } else if (!isInitialized.current) {
          setCurrentLocalPatterns(''); // Start fresh if different folder on init
      }
      setSelectedFolder(localFolderPath); // Sync selected folder
      setApplyingPatterns(processingStatus.status === 'processing');

      if (!isInitialized.current) {
        isInitialized.current = true;
      }
    } else {
      // Reset init flag when closed
      isInitialized.current = false;
    }
  }, [isOpen, globalPatternsState, localPatternsState, localFolderPath, processingStatus, selectedFolder]); // Ensure all relevant props are dependencies


  // Generate merged preview - depends on local edits and props
  useEffect(() => {
    const userPatterns = activeTab === "global" ? currentGlobalPatterns : currentLocalPatterns;
    // Ensure excludedSystemPatterns is an array before filtering
    const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
    const activeSystemPatterns = systemIgnorePatterns.filter(
      pattern => !safeExcluded.includes(pattern)
    );
    const userPatternLines = userPatterns.split("\n").filter(line => line.trim() !== "");
    const mergedLines = [...activeSystemPatterns, ...userPatternLines];
    setMergedPreview(mergedLines.join("\n"));
  }, [activeTab, currentGlobalPatterns, currentLocalPatterns, systemIgnorePatterns, excludedSystemPatterns]); // excludedSystemPatterns comes from props via globalPatternsState

  /**
   * Event Handlers
   */
  const handleTabChange = (isGlobal: boolean) => setActiveTab(isGlobal ? "global" : "local");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (activeTab === 'global') setCurrentGlobalPatterns(value);
    else setCurrentLocalPatterns(value);
  };

  const handleFolderChange = (folderPath: string) => {
    setSelectedFolder(folderPath);
    setFolderSelectOpen(false);
    if (folderPath === localFolderPath) {
       // Safely access patterns from prop state
       setCurrentLocalPatterns(localPatternsState?.patterns ?? '');
    } else {
       setCurrentLocalPatterns('');
       console.warn("Selecting a different folder than the App's current one. Local patterns shown are temporary until saved for that specific folder.");
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  // System pattern management - Calls the callback prop
  const handleToggleSystemPattern = useCallback((pattern: string) => {
    try {
      validatePattern(pattern);
       // Ensure excludedSystemPatterns is an array before operating on it
      const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
      const newExcluded = safeExcluded.includes(pattern)
        ? safeExcluded.filter(p => p !== pattern)
        : [...safeExcluded, pattern];
      onExcludedSystemPatternsChange(newExcluded); // Update App state

      // Visual feedback (optional)
      const patternElement = document.querySelector(`[data-pattern="${pattern}"]`);
      if (patternElement) {
        patternElement.classList.add(styles.patternToggled);
        setTimeout(() => patternElement.classList.remove(styles.patternToggled), 300);
      }
    } catch (error) {
      console.error('Error toggling pattern:', error);
      if (error instanceof PatternValidationError) console.warn('Pattern validation failed:', error.message);
    }
  }, [excludedSystemPatterns, onExcludedSystemPatternsChange]); // Use derived excludedSystemPatterns

  // Pattern saving handlers - Use current local edits + props
  const handleSaveGlobalPatterns = useCallback(async () => {
    try {
      setApplyingPatterns(true);
      const userPatterns = currentGlobalPatterns.split('\n').filter(p => p.trim());
      userPatterns.forEach(validatePattern);

      // Format disabled patterns using the derived prop value
      const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
      const disabledPatternsSection = safeExcluded
        .map(pattern => `# DISABLED: ${pattern}`)
        .join('\n');

      const patternsToSave = disabledPatternsSection
        ? `${disabledPatternsSection}\n\n${currentGlobalPatterns}`
        : currentGlobalPatterns;

      await saveIgnorePatterns(patternsToSave, true); // Call App's save function
    } catch (error) {
      console.error('Error saving global patterns:', error);
      if (error instanceof PatternValidationError) console.warn('Pattern validation failed:', error.message);
    } finally {
       // Let useEffect watching processingStatus handle resetting applyingPatterns
    }
  }, [currentGlobalPatterns, excludedSystemPatterns, saveIgnorePatterns]);

  const handleSaveLocalPatterns = useCallback(async () => {
    if (!selectedFolder) return;
    try {
      setApplyingPatterns(true);
      const userPatterns = currentLocalPatterns.split('\n').filter(p => p.trim());
      userPatterns.forEach(validatePattern);
      await saveIgnorePatterns(currentLocalPatterns, false, selectedFolder); // Call App's save function
    } catch (error) {
      console.error('Error saving local patterns:', error);
      if (error instanceof PatternValidationError) console.warn('Pattern validation failed:', error.message);
    } finally {
       // Let useEffect watching processingStatus handle resetting applyingPatterns
    }
  }, [currentLocalPatterns, selectedFolder, saveIgnorePatterns]);

  // Trigger confirmation dialogs via App's handlers - Passed via props
  const triggerReset = useCallback((isGlobal: boolean) => {
     // This now correctly calls the prop passed from App, which should show a dialog
     resetIgnorePatterns(isGlobal, selectedFolder || "");
  }, [resetIgnorePatterns, selectedFolder]);

  const triggerClear = useCallback(() => {
    if (selectedFolder) {
      // This now correctly calls the prop passed from App, which should show a dialog
      clearIgnorePatterns(selectedFolder);
    }
  }, [clearIgnorePatterns, selectedFolder]);


  // Modal management
  const handleModalClose = useCallback(() => onClose(), [onClose]); // Wrap in useCallback

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => { // Wrap in useCallback
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      if (activeTab === 'global') handleSaveGlobalPatterns();
      else if (selectedFolder) handleSaveLocalPatterns();
    }
    if (e.key === 'Escape') handleModalClose();
  }, [activeTab, selectedFolder, handleSaveGlobalPatterns, handleSaveLocalPatterns, handleModalClose]); // Add dependencies

  // --- Render ---
  if (!isOpen) return null;

  return (
    <div className={styles.modal} onKeyDown={handleKeyDown}> {/* Attach keydown listener here */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>
            Ignore Patterns
            {applyingPatterns && <span className={styles.applying}>(Applying...)</span>}
          </h2>
          <Button variant="ghost" size="sm" onClick={handleModalClose} startIcon={<X size={16} />} title="Close" aria-label="Close" disabled={applyingPatterns} />
        </div>

        <div className={styles.description}>
            Manage patterns to exclude files from processing. Global patterns apply everywhere, local patterns apply only to the selected folder. System patterns can be toggled on/off globally.
        </div>

        {/* Scope Selector (Tabs) */}
        <div className={styles.scopeSelector}>
            <Button variant={activeTab === "global" ? "secondary" : "ghost"} className={`${styles.scopeBtn} ${activeTab === "global" ? styles.active : ""}`} onClick={() => handleTabChange(true)} disabled={applyingPatterns}> Global </Button>
            <Button variant={activeTab === "local" ? "secondary" : "ghost"} className={`${styles.scopeBtn} ${activeTab === "local" ? styles.active : ""}`} onClick={() => handleTabChange(false)} disabled={applyingPatterns}> Local Folder </Button>
        </div>

        {/* Global Tab Content */}
        {activeTab === "global" && (
          <>
            {/* System Patterns Section */}
            <div className={styles.systemPatternsSection}>
              {/* Ensure excludedSystemPatterns is array before calculating length */}
              <h3 className={styles.sectionTitle}> System Defaults ({systemIgnorePatterns.length - (Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns.length : 0)} active) </h3>
               {Object.entries(SYSTEM_PATTERN_CATEGORIES).map(([category, patternsInCategory]) => { // Renamed variable
                    // Ensure excludedSystemPatterns is array before filtering
                    const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
                    // Filter patterns from the *main* system list that belong to this category
                    const categoryPatterns = systemIgnorePatterns.filter(p => patternsInCategory.includes(p));
                    if (categoryPatterns.length === 0) return null; // Skip empty categories
                    const enabledInCategory = categoryPatterns.filter(p => !safeExcluded.includes(p)).length;

                    return (
                        <div key={category} className={`${styles.patternCategory} ${expandedCategories[category] ? styles.categoryExpanded : ''}`}>
                          <div className={styles.categoryHeader} onClick={() => toggleCategory(category)}>
                            <div className={styles.categoryTitle}> {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} </div>
                            <div className={styles.categoryMeta}>
                              <span className={styles.categoryCount}> {enabledInCategory}/{categoryPatterns.length} </span>
                              <ChevronDown size={16} className={`${styles.chevron} ${expandedCategories[category] ? styles.chevronRotated : ''}`} />
                            </div>
                          </div>
                          {expandedCategories[category] && (
                            <div className={styles.categoryItems}>
                              {categoryPatterns.map(pattern => {
                                // Ensure excludedSystemPatterns is array before checking includes
                                const safeExcludedInner = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
                                const isEnabled = !safeExcludedInner.includes(pattern);
                                return (
                                  <div key={pattern} className={`${styles.systemPatternItem} ${isEnabled ? '' : styles.disabledPattern}`} data-pattern={pattern}>
                                    <span className={styles.patternText} title={pattern}>{pattern}</span>
                                    <Switch
                                        checked={isEnabled}
                                        onChange={() => handleToggleSystemPattern(pattern)}
                                        className={styles.smallerSwitch}
                                        id={`switch-${pattern}-${category}`} // Make ID more unique
                                        aria-label={pattern} // Use pattern as label
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                    );
                })}
            </div>

            {/* Global Custom Patterns Section */}
            <div className={styles.patternEntrySection}>
                <h3 className={styles.sectionTitle}> Global Custom Patterns </h3>
                <textarea ref={textareaRef} className={styles.patternsInput} value={currentGlobalPatterns} onChange={handleTextareaChange} placeholder="Enter global ignore patterns..." disabled={applyingPatterns} />
            </div>
          </>
        )}

        {/* Local Tab Content */}
        {activeTab === "local" && (
            <div className={styles.patternEntrySection}>
                <h3 className={styles.sectionTitle}> Local Custom Patterns </h3>
                <div className={styles.folderSelector}>
                    <label htmlFor="folder-select-dropdown">Select Folder</label> {/* Add label */}
                    <div id="folder-select-dropdown" className={styles.customSelect} onClick={() => !applyingPatterns && setFolderSelectOpen(!folderSelectOpen)} aria-haspopup="listbox">
                        <div className={styles.selectedValue} role="button" aria-expanded={folderSelectOpen}>
                            {selectedFolder || 'Select a folder'}
                            <ChevronDown size={16} className={`${styles.chevron} ${folderSelectOpen ? styles.open : ''}`} />
                        </div>
                        {folderSelectOpen && (
                        <div className={styles.optionsContainer} role="listbox">
                            {recentFolders.length > 0 ? (
                            recentFolders.map((folder, index) => (
                                <div key={index} className={styles.option} onClick={() => handleFolderChange(folder)} role="option" aria-selected={folder === selectedFolder}> {folder} </div>
                            ))
                            ) : (
                            <div className={styles.option} role="option" aria-disabled="true"> {selectedFolder || 'No recent folders'} </div>
                            )}
                        </div>
                        )}
                    </div>
                    <div className={styles.pathDisplay}> Path: {selectedFolder ? `${selectedFolder}/.repo_ignore` : 'N/A'} </div>
                </div>
                <textarea ref={textareaRef} className={styles.patternsInput} value={currentLocalPatterns} onChange={handleTextareaChange} placeholder="Enter local ignore patterns..." disabled={applyingPatterns || !selectedFolder} />
            </div>
        )}

        {/* Preview Section (Always visible) */}
        <div className={styles.previewSection}>
            <div className={styles.previewContainer}>
                <div className={styles.previewHeader}>
                    <span>Effective Patterns Preview</span>
                    <span className={styles.patternCount}>{mergedPreview.split('\n').filter(line => line.trim()).length} active</span>
                </div>
                {mergedPreview.split('\n').map((line, index) => {
                    if (!line.trim()) return null;
                    const safeExcluded = Array.isArray(excludedSystemPatterns) ? excludedSystemPatterns : [];
                    const isSystem = systemIgnorePatterns.includes(line) && !safeExcluded.includes(line);
                    // Check against CURRENT edited patterns for the active tab
                    const isGlobalUser = activeTab === 'global' && currentGlobalPatterns.split('\n').includes(line);
                    const isLocalUser = activeTab === 'local' && currentLocalPatterns.split('\n').includes(line);

                    let badgeText = 'Unknown';
                    let badgeClass = ''; // No default class
                    if (isSystem) {
                        badgeText = 'System';
                        badgeClass = styles.previewSystem;
                    } else if (isGlobalUser || (activeTab === 'local' && globalPatternsState?.patterns?.split('\n').includes(line))) { // Also check prop state for inactive tab preview
                        badgeText = 'Global';
                        badgeClass = styles.previewGlobal;
                    } else if (isLocalUser || (activeTab === 'global' && localPatternsState?.patterns?.split('\n').includes(line))) { // Also check prop state for inactive tab preview
                        badgeText = 'Local';
                         badgeClass = styles.previewLocal;
                    } else if (line.startsWith('#')) {
                         badgeText = 'Comment'; // Indicate comments if needed
                         badgeClass = styles.previewComment; // Add style for comments
                    }

                    return (
                        <div key={index} className={`${styles.previewLine} ${badgeClass}`}>
                            {line}
                             {badgeText !== 'Unknown' && badgeText !== 'Comment' && <span className={styles.previewBadge}> {badgeText} </span>}
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Modal Actions */}
        <div className={styles.modalActions}>
            {activeTab === "global" ? (
                <>
                    <Button variant="primary" onClick={handleSaveGlobalPatterns} disabled={applyingPatterns}> Save Global </Button>
                    {/* Button now triggers confirmation dialog via App prop */}
                    <Button variant="secondary" onClick={() => resetIgnorePatterns(true, '')} disabled={applyingPatterns}> Reset Global </Button>
                </>
            ) : (
                <>
                    <Button variant="primary" onClick={handleSaveLocalPatterns} disabled={!selectedFolder || applyingPatterns}> Save Local </Button>
                    {/* Button now triggers confirmation dialog via App prop */}
                    <Button variant="secondary" onClick={() => resetIgnorePatterns(false, selectedFolder || '')} disabled={!selectedFolder || applyingPatterns}> Reset Local </Button>
                    <Button variant="destructive" onClick={() => clearIgnorePatterns(selectedFolder || '')} disabled={!selectedFolder || applyingPatterns}> Clear Local </Button>
                </>
            )}
            <Button variant="ghost" onClick={handleModalClose} disabled={applyingPatterns}> Cancel </Button>
        </div>
      </div>
    </div>
  );
};

export default IgnorePatternsWithErrorBoundary;