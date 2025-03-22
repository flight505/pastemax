import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Example component demonstrating the new UI components in action
 * for selecting files and copying content.
 */
interface FileSelectionControlsProps {
  selectedFiles: string[];
}

const FileSelectionControls: React.FC<FileSelectionControlsProps> = ({
  selectedFiles,
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    const contentToCopy = selectedFiles.join('\n');
    try {
      await navigator.clipboard.writeText(contentToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <div className="flex gap-2">
      <Button
        variant="round"
        onClick={handleCopy}
        startIcon={<Copy size={18} />}
        disabled={selectedFiles.length === 0}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
      
      {/* Implementation of handleSaveFiles */}
    </div>
  );
};

export default FileSelectionControls; 