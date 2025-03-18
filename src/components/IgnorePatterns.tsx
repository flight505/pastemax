import React, { useState, useEffect } from "react";
import { X, RefreshCw, Info } from "lucide-react";
import "../styles/IgnorePatterns.css";

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
  systemPatterns?: string[];
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
}: IgnorePatternsProps): JSX.Element | null => {
  const [patterns, setPatterns] = useState(existingPatterns);
  const [activeGlobal, setActiveGlobal] = useState(isGlobal);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSystemPatterns, setShowSystemPatterns] = useState(false);

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
          {activeGlobal 
            ? "Global patterns apply to all folders and can be overridden by local patterns." 
            : "Local patterns apply only to this folder and override global patterns."}
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
        
        <div className="path-display">
          {!activeGlobal ? `${currentFolder}/.repo_ignore` : "Global defaults"}
        </div>
        
        <div className="patterns-section">
          <div className="patterns-section-header">
            <h3>User-Editable Patterns</h3>
          </div>
          
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
        </div>
        
        <div className="system-patterns-section">
          <button 
            className="system-patterns-toggle"
            onClick={() => setShowSystemPatterns(!showSystemPatterns)}
          >
            {showSystemPatterns ? "Hide System Patterns" : "Show System Patterns"} 
            ({systemPatterns.length})
          </button>
          
          {showSystemPatterns && (
            <div className="system-patterns-list">
              <div className="system-patterns-header">
                <h4>System Patterns (Always Applied, Not Editable)</h4>
                <p>These patterns exclude binary and media files automatically.</p>
              </div>
              
              <div className="system-patterns-content">
                {systemPatterns.map((pattern, index) => (
                  <div key={index} className="system-pattern-item">
                    {pattern}
                  </div>
                ))}
              </div>
            </div>
          )}
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