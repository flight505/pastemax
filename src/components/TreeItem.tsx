import React, { useRef, useEffect, useMemo, memo } from "react";
import { TreeItemProps, TreeNode } from "../types/FileTypes";
import { ChevronRight, File, Folder } from "lucide-react";
import { arePathsEqual } from "../utils/pathUtils";
import styles from "./TreeItem.module.css";

/**
 * TreeItem component that renders a file or directory in the file tree.
 * Optimized with memoization to prevent unnecessary re-renders.
 */
const TreeItem = memo(({
  node,
  selectedFiles,
  toggleFileSelection,
  toggleFolderSelection,
  toggleExpanded,
}: TreeItemProps) => {
  const { id, name, path, type, depth, isExpanded, fileData } = node;
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Check if file is selected - optimized with useMemo
  const isSelected = useMemo(() => {
    if (type === "file") {
      return selectedFiles.some(selectedPath => arePathsEqual(selectedPath, path));
    }
    return false;
  }, [type, path, selectedFiles]);

  // Check if file is disabled (excluded by patterns)
  const isDisabled = fileData?.excluded || false;

  // Optimize directory selection calculations
  const { isDirectorySelected, isDirectoryPartiallySelected } = useMemo(() => {
    if (type !== "directory" || !node.children || node.children.length === 0) {
      return { isDirectorySelected: false, isDirectoryPartiallySelected: false };
    }

    // Use a more efficient approach to determine selection state
    const counts = {
      total: 0,
      selected: 0
    };

    // Recursive function to count files
    const countFiles = (node: TreeNode) => {
      if (node.type === "file") {
        if (node.fileData?.excluded) return; // Skip excluded files
        counts.total++;
        if (selectedFiles.some(path => arePathsEqual(path, node.path))) {
          counts.selected++;
        }
      } else if (node.type === "directory" && node.children) {
        node.children.forEach(countFiles);
      }
    };

    // Count all files in this directory
    node.children.forEach(countFiles);

    // Determine selection state
    const isAllSelected = counts.total > 0 && counts.selected === counts.total;
    const isPartiallySelected = counts.selected > 0 && counts.selected < counts.total;

    return {
      isDirectorySelected: isAllSelected,
      isDirectoryPartiallySelected: isPartiallySelected
    };
  }, [node, type, selectedFiles]);

  // Update the indeterminate state of the checkbox
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isDirectoryPartiallySelected;
    }
  }, [isDirectoryPartiallySelected]);

  // Event handlers - using inline functions for better clarity
  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggleExpanded(id);
  };

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (type === "directory") {
      toggleExpanded(id);
    } else if (type === "file" && !isDisabled) {
      toggleFileSelection(path);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (type === "file") {
      toggleFileSelection(path);
    } else if (type === "directory") {
      toggleFolderSelection(path, e.target.checked);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  // Generate indentation for nested levels - memoized
  const indentation = useMemo(() => {
    const result = [];
    for (let i = 0; i < depth; i++) {
      result.push(
        <span key={`indent-${i}`} className={styles.treeItemIndent} />
      );
    }
    return result;
  }, [depth]);

  return (
    <div
      className={`${styles.treeItem} ${
        (isSelected || isDirectorySelected) ? styles.treeItemSelected : ""
      } ${isDisabled ? styles.disabledItem : ""}`}
      onClick={handleItemClick}
      data-testid={`tree-item-${name}`}
    >
      <div className={styles.treeItemContent}>
        {indentation}

        {type === "directory" && (
          <div
            className={`${styles.treeItemExpander} ${
              isExpanded ? styles.treeItemExpanderRotated : ""
            }`}
            onClick={handleToggle}
          >
            <ChevronRight size={14} />
          </div>
        )}

        <input
          type="checkbox"
          checked={isSelected || isDirectorySelected}
          onChange={handleCheckboxChange}
          onClick={handleCheckboxClick}
          ref={type === "directory" ? checkboxRef : null}
          className={styles.treeItemCheckbox}
          disabled={isDisabled}
        />

        <div className={styles.treeItemIcon}>
          {type === "directory" ? (
            <Folder size={16} className={styles.folderIcon} />
          ) : (
            <File size={16} className={styles.fileIcon} />
          )}
        </div>

        <span
          className={styles.treeItemName}
          title={path}
          onClick={(e) => {
            e.stopPropagation();
            if (type === "file" && !isDisabled) {
              toggleFileSelection(path);
            } else if (type === "directory") {
              toggleExpanded(id);
            }
          }}
        >
          {name}
        </span>
        
        {/* Display token count or excluded label */}
        {type === "file" && fileData && (
          <span className={styles.treeItemTokens}>
            {isDisabled ? "Excluded" : fileData.tokenCount > 0 ? `(${fileData.tokenCount.toLocaleString()})` : ""}
          </span>
        )}
      </div>
    </div>
  );
});

TreeItem.displayName = "TreeItem";

export default TreeItem;