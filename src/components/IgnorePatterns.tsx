import React, { useState, useEffect } from "react";
import { X, RefreshCw, ChevronDown, Trash2 } from "lucide-react";
import { Button } from "./ui";
import styles from "./IgnorePatterns.module.css";

interface IgnorePatternsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patterns: string, isGlobal: boolean, folderPath?: string) => void;
  onReset?: (isGlobal: boolean, folderPath?: string) => void;
  onClear?: (folderPath?: string) => void;
  currentFolder: string;
  existingPatterns: string;
  isGlobal?: boolean;
  globalPatterns: string;
  localPatterns: string;
  onTabChange?: (isGlobal: boolean) => void;
  systemPatterns?: string[]; // Keep prop for compatibility
  availableFolders?: string[]; // List of available folders for selection
}

// Default placeholder pattern shown in the empty textarea
const DEFAULT_PLACEHOLDER = `# Add patterns like .gitignore format
# One pattern per line

# Examples:
node_modules/
*.log
.DS_Store
venv/`;

const IgnorePatterns = ({
  isOpen,
  onClose,
  onSave,
  onReset,
  onClear,
  currentFolder,
  existingPatterns,
  isGlobal = false,
  globalPatterns = "",
  localPatterns = "",
  onTabChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  systemPatterns = [],
  availableFolders = [],
}: IgnorePatternsProps): JSX.Element | null => {
  const [patterns, setPatterns] = useState(existingPatterns);
  const [activeGlobal, setActiveGlobal] = useState(isGlobal);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(currentFolder);
  const [folderSelectOpen, setFolderSelectOpen] = useState(false);

  // Update activeGlobal when isGlobal prop changes
  useEffect(() => {
    setActiveGlobal(isGlobal);
  }, [isGlobal]);

  // Update patterns when activeGlobal, globalPatterns, or localPatterns change
  useEffect(() => {
    const newPatterns = activeGlobal ? globalPatterns : localPatterns;
    setPatterns(newPatterns);
    setHasChanges(false);
  }, [activeGlobal, globalPatterns, localPatterns, isOpen]);

  // Update selected folder when currentFolder changes
  useEffect(() => {
    setSelectedFolder(currentFolder);
  }, [currentFolder]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle tab change with unsaved changes check
  const handleTabChange = (newIsGlobal: boolean) => {
    if (newIsGlobal !== activeGlobal) {
      if (hasChanges) {
        if (window.confirm("You have unsaved changes. Do you want to discard them?")) {
          setActiveGlobal(newIsGlobal);
          if (onTabChange) {
            onTabChange(newIsGlobal);
          }
        }
      } else {
        setActiveGlobal(newIsGlobal);
        if (onTabChange) {
          onTabChange(newIsGlobal);
        }
      }
    }
  };

  // Handle folder change with unsaved changes check
  const handleFolderChange = (folder: string) => {
    if (folder !== selectedFolder) {
      if (hasChanges) {
        if (window.confirm("You have unsaved changes. Do you want to discard them?")) {
          setSelectedFolder(folder);
        }
      } else {
        setSelectedFolder(folder);
      }
    }
    setFolderSelectOpen(false);
  };

  // Handle reset button click - returns to system defaults
  const handleReset = () => {
    if (onReset && window.confirm("Reset to default patterns? This will replace any custom patterns you've created.")) {
      onReset(activeGlobal, !activeGlobal ? selectedFolder : undefined);
      setHasChanges(false);
    }
  };

  // Handle clear button click - removes all patterns
  const handleClear = () => {
    if (onClear && !activeGlobal && window.confirm("Clear all local patterns? This will remove all patterns for this folder.")) {
      onClear(selectedFolder);
      setPatterns("");
      setHasChanges(false);
    }
  };

  // Handle save button click
  const handleSave = () => {
    onSave(patterns, activeGlobal, !activeGlobal ? selectedFolder : undefined);
    setHasChanges(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Ignore Patterns</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            iconOnly
            onClick={onClose}
            startIcon={<X size={16} />}
            title="Close"
          />
        </div>
        
        <div className={styles.description}>
          Edit ignore patterns. Global defaults from your settings are always combined with any .repo_ignore file found in a folder. Local patterns (from .repo_ignore) will override global defaults.
        </div>
        
        <div className={styles.scopeSelector}>
          <button 
            className={`${styles.scopeBtn} ${!activeGlobal ? styles.active : ""}`}
            onClick={() => handleTabChange(false)}
          >
            Local Folder
          </button>
          <button 
            className={`${styles.scopeBtn} ${activeGlobal ? styles.active : ""}`}
            onClick={() => handleTabChange(true)}
          >
            Global Defaults
          </button>
        </div>
        
        <div className={styles.scopeDescription}>
          {activeGlobal 
            ? "Global patterns apply to all folders and can be overridden by local patterns." 
            : "Local scope will create a .repo_ignore file upon save and will be combined with global defaults."}
        </div>
        
        {!activeGlobal && (
          <div className={styles.folderSelector}>
            <label>Select Folder</label>
            <div className={styles.customSelect} onClick={() => setFolderSelectOpen(!folderSelectOpen)}>
              <div className={styles.selectedValue}>
                {selectedFolder || 'Select a folder'}
                <ChevronDown size={16} className={`${styles.chevron} ${folderSelectOpen ? styles.open : ''}`} />
              </div>
              {folderSelectOpen && (
                <div className={styles.optionsContainer}>
                  {availableFolders.length > 0 ? (
                    availableFolders.map((folder, index) => (
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
        
        <div className={styles.patternsSection}>
          <textarea 
            className={styles.patternsInput}
            value={patterns}
            onChange={(e) => {
              setPatterns(e.target.value);
              setHasChanges(true);
            }}
            placeholder={DEFAULT_PLACEHOLDER}
          />
          
          <div className={styles.patternsHelp}>
            <p>Use gitignore-style syntax. Lines starting with # are comments.</p>
            <p>Excluded files are visible in the sidebar with a dimmed appearance.</p>
          </div>
        </div>
        
        <div className={styles.modalStatus}>
          {hasChanges && <span className={styles.unsaved}>Unsaved Changes</span>}
        </div>
        
        <div className={styles.modalActions}>
          <Button 
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          
          {!activeGlobal && onClear && (
            <Button 
              variant="destructive"
              onClick={handleClear}
              title="Clear all patterns for this folder"
              startIcon={<Trash2 size={14} />}
            >
              Clear Patterns
            </Button>
          )}
          
          {onReset && (
            <Button 
              variant="secondary"
              onClick={handleReset}
              title={activeGlobal ? "Reset to default patterns" : "Reset to empty patterns"}
              startIcon={<RefreshCw size={14} />}
            >
              Reset to {activeGlobal ? "Defaults" : "Empty"}
            </Button>
          )}
          
          <Button 
            variant="primary"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IgnorePatterns; 