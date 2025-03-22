import React from "react";
import { FileListProps, FileData } from "../types/FileTypes";
import FileCard from "./FileCard";
import { arePathsEqual } from "../utils/pathUtils";
import styles from "./FileList.module.css";

const FileList = ({
  files,
  selectedFiles,
  toggleFileSelection,
}: FileListProps) => {
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

  return (
    <div className={styles.fileListContainer}>
      {displayableFiles.length > 0 ? (
        <div className={styles.fileList}>
          {displayableFiles.map((file) => (
            <FileCard
              key={file.path}
              file={file}
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
