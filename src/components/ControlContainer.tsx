import React from 'react';
import { FileTreeMode, SortOrder } from '../types/FileTypes';
import { Switch, CopyButton } from './ui';
import styles from './ControlContainer.module.css';

interface ControlContainerProps {
  fileTreeMode: FileTreeMode;
  setFileTreeMode: (value: FileTreeMode) => void;
  showUserInstructions: boolean;
  setShowUserInstructions: (value: boolean) => void;
  getSelectedFilesContent: () => string;
  selectedFilesCount: number;
  fileTreeSortOrder?: SortOrder;
  setFileTreeSortOrder?: (value: SortOrder) => void;
  ignorePatterns?: string;
  setIgnorePatterns?: (value: string) => void;
  loadIgnorePatterns?: (folderPath: string, isGlobal?: boolean) => void;
  saveIgnorePatterns?: (patterns: string, isGlobal: boolean, folderPath: string) => void;
  resetIgnorePatterns?: (isGlobal: boolean, folderPath: string) => void;
  reloadFolder?: () => void;
  clearSelection?: () => void;
  removeAllFolders?: () => void;
}

const ControlContainer = ({
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
}: ControlContainerProps): JSX.Element => {
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
            <div className={styles.copyButtonWrapper}>
              <CopyButton
                text={getSelectedFilesContent()}
                selectedCount={selectedFilesCount}
                onDownload={handleDownload}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlContainer; 