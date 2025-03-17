import React, { useState, useEffect } from "react";
import { X, RefreshCw } from "lucide-react";

interface IgnorePatternsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patterns: string, isGlobal: boolean) => void;
  onReset?: (isGlobal: boolean) => void;
  currentFolder: string;
  existingPatterns: string;
  isGlobal?: boolean;
  globalPatterns: string;
  localPatterns: string;
  onTabChange?: (isGlobal: boolean) => void;
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
}: IgnorePatternsProps): JSX.Element | null => {
  const [patterns, setPatterns] = useState(existingPatterns);
  const [activeGlobal, setActiveGlobal] = useState(isGlobal);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setActiveGlobal(isGlobal);
  }, [isGlobal]);

  useEffect(() => {
    const newPatterns = activeGlobal ? globalPatterns : localPatterns;
    setPatterns(newPatterns);
    setHasChanges(false);
  }, [activeGlobal, globalPatterns, localPatterns, isOpen]);

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

  const handleReset = () => {
    if (onReset) {
      onReset(activeGlobal);
      setHasChanges(false);
    }
  };

  const handleSave = () => {
    onSave(patterns, activeGlobal);
    setHasChanges(false);
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
        
        <p className="ignore-patterns-description">
          Ignore patterns. Global defaults from your settings are always combined with any .ignore file found in a folder. Local patterns from (.repo_ignore) will override global defaults.
          <br /><br />
          <em>Note: Some large binary files (images, archives, etc.) are always excluded by default and cannot be edited here.</em>
        </p>
        
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
        
        <p className="scope-description">
          {activeGlobal 
            ? "Global patterns apply to all folders. They can be overridden by local patterns."
            : "Local scope will create a .repo_ignore file upon save and will be combined with global defaults."}
        </p>
        
        <div className="folder-selector">
          <label>Select Folder</label>
          <select>
            <option>{currentFolder}</option>
          </select>
        </div>
        
        <div className="path-display">
          {!activeGlobal ? `${currentFolder}/.repo_ignore` : "Global defaults"}
        </div>
        
        <textarea 
          className="patterns-input"
          value={patterns}
          onChange={(e) => {
            setPatterns(e.target.value);
            setHasChanges(true);
          }}
          placeholder={`# Add patterns like .gitignore format
# Common patterns to exclude:
node_modules/
.git/
**/*.log
dist/
build/
.DS_Store
*.tmp
.idea/
.vscode/
*.class
__pycache__/
*.pyc
*.pyo
*.md
venv/
.env
`}
        />
        
        {!activeGlobal && (
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
          
          {activeGlobal && onReset && (
            <button 
              className="reset-btn"
              onClick={handleReset}
              title="Reset to default ignore patterns"
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