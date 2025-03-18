import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { Button } from '../Button';
import styles from './CopyButton.module.css';

export interface CopyButtonProps {
  /**
   * Text to copy to clipboard
   */
  text: string;
  
  /**
   * Number of selected files
   */
  selectedCount?: number;
  
  /**
   * Function to handle file download
   */
  onDownload?: () => void;
  
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Enhanced copy button with download option and selection count
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  selectedCount,
  onDownload,
  className
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={styles.copyDownloadContainer}>
      <Button
        variant="primary"
        size="md"
        onClick={handleCopy}
        startIcon={copied ? <Check size={16} /> : <Copy size={16} />}
        className={className}
      >
        Copy All
      </Button>
      
      {selectedCount !== undefined && (
        <span className={styles.selectedCounter}>
          Selected ({selectedCount} {selectedCount === 1 ? 'file' : 'files'})
        </span>
      )}
      
      {onDownload && (
        <Button
          variant="secondary"
          size="md"
          onClick={onDownload}
          startIcon={<Download size={16} />}
          title="Save selected files"
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default CopyButton; 