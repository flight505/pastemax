import React, { useState } from 'react';
import { FileTreeMode } from '../types';
import { Switch, Button, ButtonGroup } from './ui';
import { Copy, Download, Check } from 'lucide-react';
import styles from './ControlContainer.module.css';

interface ControlContainerProps {
  fileTreeMode: FileTreeMode;
  setFileTreeMode: (value: FileTreeMode) => void;
  showUserInstructions: boolean;
  setShowUserInstructions: (value: boolean) => void;
  getSelectedFilesContent: () => string;
  selectedFilesCount: number;
  fileTreeSortOrder?: "name-asc" | "name-desc" | "ext-asc" | "ext-desc" | "date-newest";
  setFileTreeSortOrder?: (value: "name-asc" | "name-desc" | "ext-asc" | "ext-desc" | "date-newest") => void;
  ignorePatterns?: string;
  setIgnorePatterns?: (patterns: string) => void;
  loadIgnorePatterns?: (folderPath: string, isGlobal?: boolean) => void;
  saveIgnorePatterns?: (patterns: string, isGlobal: boolean, folderPath: string) => void;
  resetIgnorePatterns?: (isGlobal: boolean, folderPath: string) => void;
  reloadFolder?: () => void;
  clearSelection?: () => void;
  removeAllFolders?: () => void;
}

const ControlContainer: React.FC<ControlContainerProps> = ({
  fileTreeMode,
  setFileTreeMode,
  showUserInstructions,
  setShowUserInstructions,
  getSelectedFilesContent,
  selectedFilesCount,
  fileTreeSortOrder,
  setFileTreeSortOrder,
  ignorePatterns,
  setIgnorePatterns,
  loadIgnorePatterns,
  saveIgnorePatterns,
  resetIgnorePatterns,
  reloadFolder,
  clearSelection,
  removeAllFolders,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const content = getSelectedFilesContent();
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const content = getSelectedFilesContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-files.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.controlContainer}>
      <div className={styles.controlContainerHeader}>Controls</div>
      <div className={styles.controlItems}>
        {/* Display Options Group */}
        <div className={styles.controlGroup}>
          <div className={styles.controlGroupTitle}>Display Options</div>
          
          <div className={styles.controlItem}>
            <Switch
              checked={showUserInstructions}
              onChange={() => setShowUserInstructions(!showUserInstructions)}
              label="Show User Instructions"
              id="user-instructions-toggle"
            />
          </div>
          
          <div className={styles.controlItem}>
            <label className={styles.controlSelectLabel} htmlFor="file-tree-mode">File Tree:</label>
            <select
              id="file-tree-mode"
              value={fileTreeMode}
              onChange={(e) => setFileTreeMode(e.target.value as FileTreeMode)}
              className={styles.controlSelect}
            >
              <option value="none">None</option>
              <option value="selected">Selected Files Only</option>
              <option value="selected-with-roots">Selected Files with Path</option>
              <option value="complete">Complete Tree</option>
            </select>
          </div>
        </div>
        
        {/* Output Options Group */}
        <div className={styles.controlGroup}>
          <div className={styles.controlGroupTitle}>Output Options</div>
          
          <div className={styles.controlItem}>
            <ButtonGroup size="sm">
              <Button
                variant="secondary"
                onClick={handleCopy}
                startIcon={copied ? <Check size={16} /> : <Copy size={16} />}
                disabled={selectedFilesCount === 0}
              >
                {copied ? 'Copied!' : `Copy (${selectedFilesCount})`}
              </Button>
              <Button
                variant="secondary"
                onClick={handleDownload}
                startIcon={<Download size={16} />}
                disabled={selectedFilesCount === 0}
              >
                Save
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlContainer; 