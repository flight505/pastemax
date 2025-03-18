import React, { useState, useEffect } from "react";
import { X, RefreshCw, Info, ChevronDown } from "lucide-react";
import "../styles/IgnorePatterns.css";

interface IgnorePatternsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patterns: string, isGlobal: boolean, folderPath?: string) => void;
  onReset?: (isGlobal: boolean, folderPath?: string) => void;
  currentFolder: string;
  existingPatterns: string;
  isGlobal?: boolean;
  globalPatterns: string;
  localPatterns: string;
  onTabChange?: (isGlobal: boolean) => void;
  systemPatterns?: string[]; // Keep prop for compatibility, but we won't display them
  availableFolders?: string[]; // List of available folders for selection
}

const IgnorePatterns = ({
  isOpen,
  onClose,
  onSave,
  onReset,
  currentFolder,
  existingPatterns,
  isGlobal = false,
  globalPatterns = "",
  localPatterns = "",
  onTabChange,
  systemPatterns = [],
  availableFolders = [],
}: IgnorePatternsProps): JSX.Element | null => {
  const [patterns, setPatterns] = useState(existingPatterns);
  const [activeGlobal, setActiveGlobal] = useState(isGlobal);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(currentFolder);
  const [folderSelectOpen, setFolderSelectOpen] = useState(false);

  useEffect(() => {
    setActiveGlobal(isGlobal);
  }, [isGlobal]);

  useEffect(() => {
    const newPatterns = activeGlobal ? globalPatterns : localPatterns;
    setPatterns(newPatterns);
    setHasChanges(false);
  }, [activeGlobal, globalPatterns, localPatterns, isOpen]);

  useEffect(() => {
    setSelectedFolder(currentFolder);
  }, [currentFolder]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleTabChange = (newIsGlobal: boolean) => {
    if (newIsGlobal !== activeGlobal) {
      if (hasChanges) {
        if (window.confirm("You have unsaved changes. Do you want to discard them?")) {
          console.log(`Tab changed from ${activeGlobal ? 'global' : 'local'} to ${newIsGlobal ? 'global' : 'local'}`);
          setActiveGlobal(newIsGlobal);
          if (onTabChange) {
            onTabChange(newIsGlobal);
          }
        }
      } else {
        console.log(`Tab changed from ${activeGlobal ? 'global' : 'local'} to ${newIsGlobal ? 'global' : 'local'}`);
        setActiveGlobal(newIsGlobal);
        if (onTabChange) {
          onTabChange(newIsGlobal);
        }
      }
    }
  };

  const handleFolderChange = (folder: string) => {
    if (folder !== selectedFolder) {
      if (hasChanges) {
        if (window.confirm("You have unsaved changes. Do you want to discard them?")) {
          console.log(`Folder changed from "${selectedFolder}" to "${folder}"`);
          setSelectedFolder(folder);
        }
      } else {
        console.log(`Folder changed from "${selectedFolder}" to "${folder}"`);
        setSelectedFolder(folder);
      }
    }
    setFolderSelectOpen(false);
  };

  const handleReset = () => {
    if (onReset) {
      onReset(activeGlobal, !activeGlobal ? selectedFolder : undefined);
      setHasChanges(false);
    }
  };

  const handleSave = () => {
    onSave(patterns, activeGlobal, !activeGlobal ? selectedFolder : undefined);
    setHasChanges(false);
  };

  const renderHighlightedPatterns = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.trimStart().startsWith('#')) {
        return <div key={i} className="pattern-comment">{line}</div>;
      }
      return <div key={i}>{line}</div>;
    }).join('\n');
  };

  if (!isOpen) return null;

  return (
    <div className="ignore-patterns-modal">
      <div className="ignore-patterns-content">
        <div className="ignore-patterns-header">
          <h2>Ignore Patterns</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        
        <div className="ignore-description">
          Edit ignore patterns. Global defaults from your settings are always combined with any .repo_ignore file found in a folder. Local patterns (from .repo_ignore) will override global defaults.
        </div>
        
        <div className="scope-selector">
          <button 
            className={`scope-btn ${!activeGlobal ? "active" : ""}`}
            onClick={() => handleTabChange(false)}
          >
            Local Folder
          </button>
          <button 
            className={`scope-btn ${activeGlobal ? "active" : ""}`}
            onClick={() => handleTabChange(true)}
          >
            Global Defaults
          </button>
        </div>
        
        <div className="scope-description">
          {activeGlobal 
            ? "Global patterns apply to all folders and can be overridden by local patterns." 
            : "Local scope will create a .repo_ignore file upon save and will be combined with global defaults."}
        </div>
        
        {!activeGlobal && (
          <div className="folder-selector">
            <label>Select Folder</label>
            <div className="custom-select" onClick={() => setFolderSelectOpen(!folderSelectOpen)}>
              <div className="selected-value">
                {selectedFolder || 'Select a folder'}
                <ChevronDown size={16} className={`chevron ${folderSelectOpen ? 'open' : ''}`} />
              </div>
              {folderSelectOpen && (
                <div className="options-container">
                  {availableFolders.length > 0 ? (
                    availableFolders.map((folder, index) => (
                      <div 
                        key={index} 
                        className="option" 
                        onClick={() => handleFolderChange(folder)}
                      >
                        {folder}
                      </div>
                    ))
                  ) : (
                    <div className="option">{selectedFolder || 'No folders available'}</div>
                  )}
                </div>
              )}
            </div>
            <div className="path-display">
              {selectedFolder ? `${selectedFolder}/.repo_ignore` : 'No folder selected'}
            </div>
          </div>
        )}
        
        <div className="patterns-section">
          <textarea 
            className="patterns-input"
            value={patterns}
            onChange={(e) => {
              setPatterns(e.target.value);
              setHasChanges(true);
            }}
            placeholder={`# Add patterns like .gitignore format
# One pattern per line

# Examples:
node_modules/
*.log
.DS_Store
venv/`}
          />
          
          <div className="patterns-help">
            <p>Use gitignore-style syntax. Lines starting with # are comments.</p>
            <p>Excluded files are visible in the sidebar with a dimmed appearance.</p>
          </div>
        </div>
        
        <div className="modal-status">
          {hasChanges && <span className="unsaved">Unsaved Changes</span>}
        </div>
        
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          
          {onReset && (
            <button 
              className="reset-btn"
              onClick={handleReset}
              title="Reset to default patterns"
            >
              <RefreshCw size={14} />
              Reset to Defaults
            </button>
          )}
          
          <button 
            className="save-btn"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default IgnorePatterns; 