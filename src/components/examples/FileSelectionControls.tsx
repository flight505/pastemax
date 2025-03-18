import React, { useState } from 'react';
import { Button, CopyButton } from '../ui';

/**
 * Example component demonstrating the new UI components in action
 * for selecting files and copying content.
 */
export interface FileSelectionControlsProps {
  /**
   * Array of file names
   */
  files: string[];
  
  /**
   * Content to be copied based on selected files
   */
  getContentToCopy: (selectedFiles: string[]) => string;
  
  /**
   * Handler for saving selected files
   */
  handleSaveFiles?: (selectedFiles: string[]) => void;
}

export const FileSelectionControls: React.FC<FileSelectionControlsProps> = ({
  files,
  getContentToCopy,
  handleSaveFiles
}) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  
  const handleSelectAll = () => {
    setSelectedFiles([...files]);
  };
  
  const handleDeselectAll = () => {
    setSelectedFiles([]);
  };
  
  const handleDownload = () => {
    if (handleSaveFiles) {
      handleSaveFiles(selectedFiles);
    }
  };
  
  const contentToCopy = getContentToCopy(selectedFiles);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button 
          variant="primary" 
          onClick={handleSelectAll}
          disabled={files.length === 0}
        >
          Select All
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleDeselectAll}
          disabled={selectedFiles.length === 0}
        >
          Deselect All
        </Button>
      </div>
      
      <CopyButton 
        text={contentToCopy} 
        selectedCount={selectedFiles.length}
        onDownload={handleSaveFiles ? handleDownload : undefined}
      />
    </div>
  );
};

export default FileSelectionControls; 