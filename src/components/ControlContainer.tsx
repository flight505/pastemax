import React from 'react';
import Switch from './Switch';
import CopyButton from './CopyButton';

interface ControlContainerProps {
  includeFileTree: boolean;
  setIncludeFileTree: (value: boolean) => void;
  showUserInstructions: boolean;
  setShowUserInstructions: (value: boolean) => void;
  getSelectedFilesContent: () => string;
  selectedFilesCount: number;
}

const ControlContainer: React.FC<ControlContainerProps> = ({
  includeFileTree,
  setIncludeFileTree,
  showUserInstructions,
  setShowUserInstructions,
  getSelectedFilesContent,
  selectedFilesCount,
}) => {
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
          <Switch
            checked={includeFileTree}
            onChange={() => setIncludeFileTree(!includeFileTree)}
            label="Include File Tree"
            id="include-file-tree-toggle"
          />
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