import React, { useState } from 'react';
import { Button } from '../ui';
import { Copy, Download, Check } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    const contentToCopy = getContentToCopy(selectedFiles);
    try {
      await navigator.clipboard.writeText(contentToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleDownload = () => {
    if (handleSaveFiles) {
      handleSaveFiles(selectedFiles);
    }
  };
  
  return (
    <div className="controls-container" style={{ 
      display: 'flex', 
      gap: '12px',
      alignItems: 'center',
      padding: '8px 16px'
    }}>
      <Button
        variant="round"
        onClick={handleCopy}
        startIcon={copied ? <Check size={18} /> : <Copy size={18} />}
        disabled={selectedFiles.length === 0}
        
      >
        {copied ? 'Copied!' : `Copy (${selectedFiles.length})`}
      </Button>
      
      {handleSaveFiles && (
        <Button
          variant="round"
          onClick={handleDownload}
          startIcon={<Download size={18} />}
          disabled={selectedFiles.length === 0}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default FileSelectionControls; 