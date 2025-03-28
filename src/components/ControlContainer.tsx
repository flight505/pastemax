import React, { useState, useCallback } from 'react'; // Import useCallback
import { FileTreeMode } from '../types/FileTypes';
import { OutputFormatType, OUTPUT_FORMAT_OPTIONS } from '../constants/outputFormats';
import { Switch, Button, ButtonGroup } from './ui';
import { Copy, Download, Check, Loader2, FileText, Code, FileJson } from 'lucide-react'; // Added FileText, Code, FileJson
import styles from './ControlContainer.module.css';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/DropdownMenu';

interface ControlContainerProps {
  fileTreeMode: FileTreeMode;
  setFileTreeMode: (mode: FileTreeMode) => void;
  showUserInstructions: boolean;
  setShowUserInstructions: (show: boolean) => void;
  getSelectedFilesContent: () => Promise<string>; // Make async
  selectedFilesCount: number;
  outputFormat: OutputFormatType;
  setOutputFormat: (format: OutputFormatType) => void;
  // Removed unused props (previously prefixed with _)
}

const ControlContainer: React.FC<ControlContainerProps> = ({
  fileTreeMode,
  setFileTreeMode,
  showUserInstructions,
  setShowUserInstructions,
  getSelectedFilesContent,
  selectedFilesCount,
  outputFormat,
  setOutputFormat,
}) => {
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false); // Add loading state for copy
  const [isDownloading, setIsDownloading] = useState(false); // Add loading state for download

  const handleCopy = useCallback(async () => {
    if (selectedFilesCount === 0 || isCopying) return;
    setIsCopying(true);
    setCopied(false); // Reset copied state
    try {
      const content = await getSelectedFilesContent(); // Await the async function
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // TODO: Show user error feedback
    } finally {
      setIsCopying(false);
    }
  }, [getSelectedFilesContent, selectedFilesCount, isCopying]); // Add dependencies

  const handleDownload = useCallback(async () => {
    if (selectedFilesCount === 0 || isDownloading) return;
    setIsDownloading(true);
    try {
        const content = await getSelectedFilesContent(); // Await the async function
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' }); // Specify charset
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // Generate filename based on current context if possible
        const filename = `pastemax_output_${new Date().toISOString().split('T')[0]}.txt`;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Failed to download:', err);
        // TODO: Show user error feedback
    } finally {
        setIsDownloading(false);
    }
  }, [getSelectedFilesContent, selectedFilesCount, isDownloading]); // Add dependencies

  // Get icon based on format
  const getFormatIcon = (format: OutputFormatType) => {
    switch (format) {
      case 'xml':
        return <FileJson size={16} className="opacity-60" />;
      case 'markdown':
        return <FileText size={16} className="opacity-60" />;
      case 'plain':
        return <Code size={16} className="opacity-60" />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.controlContainer}>
      <div className={styles.controlContainerHeader}>Controls</div>
      <div className={styles.controlItems}>
        {/* Display Options Group */}
        <div className={styles.controlGroup}>
          <div className={styles.controlGroupTitle}>Display Options</div>
          <div className={styles.controlItem}>
            <Switch checked={showUserInstructions} onChange={() => setShowUserInstructions(!showUserInstructions)} label="Show User Instructions" id="user-instructions-toggle" />
          </div>
          <div className={styles.controlItem}>
            <label className={styles.controlSelectLabel} htmlFor="file-tree-mode">File Tree:</label>
            <select id="file-tree-mode" value={fileTreeMode} onChange={(e) => setFileTreeMode(e.target.value as FileTreeMode)} className={styles.controlSelect}>
              <option value="none">None</option>
              <option value="selected">Selected Files Only</option>
              <option value="selected-with-roots">Selected Files with Path</option>
              <option value="complete">Complete Tree (Mark Selected)</option>
            </select>
          </div>
        </div>

        {/* Output Format Group */}
        <div className={styles.controlGroup}>
          <div className={styles.controlGroupTitle}>Output Format</div>
          <div className={styles.controlItem}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" size="sm">
                  {outputFormat.toUpperCase()}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down opacity-60 ml-2"><path d="m6 9 6 6 6-6"></path></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom">
                {OUTPUT_FORMAT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => setOutputFormat(option.value as OutputFormatType)}
                    icon={getFormatIcon(option.value as OutputFormatType)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Output Options Group */}
        <div className={styles.controlGroup}>
          <div className={styles.controlGroupTitle}>Output</div>
          <div className={styles.controlItem}>
            <ButtonGroup size="sm">
              <Button
                variant="secondary"
                onClick={handleCopy}
                startIcon={isCopying ? <Loader2 size={16} className="animate-spin" /> : copied ? <Check size={16} /> : <Copy size={16} />}
                disabled={selectedFilesCount === 0 || isCopying || isDownloading}
                title={isCopying ? "Copying..." : copied ? "Copied!" : `Copy ${selectedFilesCount} selected files to clipboard`}
              >
                {isCopying ? 'Copying...' : copied ? 'Copied!' : `Copy (${selectedFilesCount})`}
              </Button>
              <Button
                variant="secondary"
                onClick={handleDownload}
                startIcon={isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                disabled={selectedFilesCount === 0 || isCopying || isDownloading}
                title={isDownloading ? "Saving..." : "Save selected files content"}
              >
                {isDownloading ? 'Saving...' : 'Save'}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlContainer;