import React from 'react';
import Switch from './Switch';
import CopyButton from './CopyButton';
import { FileTreeMode } from '../types/FileTypes';

interface ControlContainerProps {
  fileTreeMode: FileTreeMode;
  setFileTreeMode: (value: FileTreeMode) => void;
  showUserInstructions: boolean;
  setShowUserInstructions: (value: boolean) => void;
  getSelectedFilesContent: () => string;
  selectedFilesCount: number;
}

const ControlContainer: React.FC<ControlContainerProps> = ({
  fileTreeMode,
  setFileTreeMode,
  showUserInstructions,
  setShowUserInstructions,
  getSelectedFilesContent,
  selectedFilesCount,
}: ControlContainerProps): JSX.Element => {
  return (
    <div className="control-container">
      <div className="control-container-header">Controls</div>
      <div className="control-items">
        <div className="control-item">
          <Switch
            checked={showUserInstructions}
            onChange={() => setShowUserInstructions(!showUserInstructions)}
            label="Show User Instructions"
            id="user-instructions-toggle"
          />
        </div>
        
        <div className="control-item">
          <label className="switch-label" htmlFor="file-tree-mode">File Tree:</label>
          <select
            id="file-tree-mode"
            value={fileTreeMode}
            onChange={(e) => setFileTreeMode(e.target.value as FileTreeMode)}
            className="file-tree-mode-select"
          >
            <option value="none">None</option>
            <option value="selected">Selected Files Only</option>
            <option value="selected-with-roots">Selected Files with Path</option>
            <option value="complete">Complete Tree</option>
          </select>
        </div>
        
        <div className="control-item copy-button-wrapper">
          <CopyButton
            text={getSelectedFilesContent()}
            className="primary full-width"
          >
            <span>
              COPY ALL SELECTED ({selectedFilesCount} files)
            </span>
          </CopyButton>
        </div>
      </div>
    </div>
  );
};

export default ControlContainer; 