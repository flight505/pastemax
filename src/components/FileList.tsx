import React, { useState, useEffect } from "react";
import { FileListProps, FileData } from "../types/FileTypes";
import FileCard from "./FileCard";
import { arePathsEqual } from "../utils/pathUtils";
import styles from "./FileList.module.css";

const FileList = ({
  files,
  selectedFiles,
  toggleFileSelection,
}: FileListProps) => {
  const [fileContents, setFileContents] = useState<Record<string, string>>({});

  // Only show files that are in the selectedFiles array and not binary/skipped
  const displayableFiles = files.filter(
    (file: FileData) =>
      selectedFiles.some(selectedPath => arePathsEqual(selectedPath, file.path)) && 
      !file.isBinary && 
      !file.isSkipped,
  );

  // Find the maximum token count for relative scaling
  const maxTokenCount = displayableFiles.length > 0
    ? Math.max(...displayableFiles.map(file => file.tokenCount))
    : 5000; // Default if no files

  // Fetch file contents when needed
  useEffect(() => {
    const fetchContents = async () => {
      const newContents: Record<string, string> = {};
      for (const file of displayableFiles) {
        if (!fileContents[file.path]) {
          try {
            const content = await window.electron.ipcRenderer.invoke("read-file", file.path);
            newContents[file.path] = content;
          } catch (error) {
            console.error(`Error reading file ${file.path}:`, error);
            newContents[file.path] = "Error loading file content";
          }
        }
      }
      if (Object.keys(newContents).length > 0) {
        setFileContents(prev => ({ ...prev, ...newContents }));
      }
    };

    fetchContents();
  }, [displayableFiles, fileContents]);

  return (
    <div className={styles.fileListContainer}>
      {displayableFiles.length > 0 ? (
        <div className={styles.fileList}>
          {displayableFiles.map((file) => (
            <FileCard
              key={file.path}
              file={{
                ...file,
                content: fileContents[file.path] || "Loading..."
              }}
              isSelected={true} // Always true since we're already filtering for selected files
              toggleSelection={toggleFileSelection}
              maxTokenCount={maxTokenCount}
            />
          ))}
        </div>
      ) : (
        <div className={styles.fileListEmpty}>
          No files selected. Select files from the sidebar to see them here.
        </div>
      )}
    </div>
  );
};

export default FileList;
