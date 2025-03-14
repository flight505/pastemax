import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface IgnorePatternsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patterns: string, isGlobal: boolean) => void;
  currentFolder: string;
  existingPatterns: string;
}

const IgnorePatterns = ({
  isOpen,
  onClose,
  onSave,
  currentFolder,
  existingPatterns,
}: IgnorePatternsProps): JSX.Element | null => {
  const [patterns, setPatterns] = useState(existingPatterns);
  const [isGlobal, setIsGlobal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setPatterns(existingPatterns);
    setHasChanges(false);
  }, [existingPatterns, isOpen]);

  useEffect(() => {
    // Handle Escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
        
        <p className="ignore-patterns-description">
          Ignore patterns. Global defaults from your settings are always combined with any .ignore file found in a folder. Local patterns from (.repo_ignore) will override global defaults.
        </p>
        
        <div className="scope-selector">
          <button 
            className={`scope-btn ${!isGlobal ? "active" : ""}`}
            onClick={() => setIsGlobal(false)}
          >
            Local Folder
          </button>
          <button 
            className={`scope-btn ${isGlobal ? "active" : ""}`}
            onClick={() => setIsGlobal(true)}
          >
            Global Defaults
          </button>
        </div>
        
        <p className="scope-description">
          Local scope will create a .repo_ignore file upon save and will be combined with global defaults.
        </p>
        
        <div className="folder-selector">
          <label>Select Folder</label>
          <select>
            <option>{currentFolder}</option>
          </select>
        </div>
        
        <div className="path-display">
          {!isGlobal ? `${currentFolder}/.repo_ignore` : "Global defaults"}
        </div>
        
        <textarea 
          className="patterns-input"
          value={patterns}
          onChange={(e) => {
            setPatterns(e.target.value);
            setHasChanges(true);
          }}
          placeholder="# Add patterns like .gitignore format
node_modules/
*.log
.DS_Store"
        />
        
        {!isGlobal && (
          <div className="highlight-text">
            A new repo_ignore file will be created upon save.
          </div>
        )}
        
        <div className="modal-status">
          {hasChanges && <span className="unsaved">Unsaved</span>}
        </div>
        
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="save-btn"
            onClick={() => {
              onSave(patterns, isGlobal);
              setHasChanges(false);
            }}
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