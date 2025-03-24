import React, { useState, useEffect, useRef } from 'react';
import { X, RefreshCw, ChevronDown, Trash2 } from "lucide-react";
import { Button } from "./ui";
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
  recentFolders
}) => {
  // State for the active tab
  const [activeTab, setActiveTab] = useState<"global" | "local">("global");
  
  // State for the textarea values
  const [globalPatterns, setGlobalPatterns] = useState<string>(globalIgnorePatterns);
  const [localPatterns, setLocalPatterns] = useState<string>(localIgnorePatterns);
  
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
  
  // Functions to handle saving patterns
  const handleSaveGlobalPatterns = async () => {
    setApplyingPatterns(true);
    await saveIgnorePatterns(globalPatterns, true);
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
            {applyingPatterns && <span className={styles.applying}>(Applying changes...)</span>}
          </h2>
          <Button 
            variant="secondary" 
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
        
        <div className={styles.scopeDescription}>
          {activeTab === "global" 
            ? "Global patterns apply to all folders. One pattern per line. Use * as wildcard." 
            : "Local patterns apply only to the selected folder. One pattern per line. Use * as wildcard."}
        </div>
        
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
        
        <div className={styles.patternsSection}>
          <textarea 
            ref={textareaRef}
            className={styles.patternsInput}
            value={activeTab === "global" ? globalPatterns : localPatterns}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter ignore patterns, one per line..."
            disabled={applyingPatterns || (activeTab === "local" && !selectedFolder)}
          />
          
          {activeTab === "global" && (
            <div className={styles.systemPatterns}>
              <h3>System Patterns (Always Applied)</h3>
              <div className={styles.systemPatternsList}>
                {systemIgnorePatterns.map((pattern, index) => (
                  <div key={index} className={styles.systemPattern}>{pattern}</div>
                ))}
              </div>
            </div>
          )}
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