import React, {
  useRef,
  useEffect,
} from "react";
import { TreeItemProps, TreeNode } from "../types/FileTypes";
import { ChevronRight, File, Folder } from "lucide-react";
import { arePathsEqual } from "../utils/pathUtils";
import styles from "./TreeItem.module.css";

const TreeItem = ({
  node,
  selectedFiles,
  toggleFileSelection,
  toggleFolderSelection,
  toggleExpanded,
}: TreeItemProps) => {
  const { id, name, path, type, depth, isExpanded, fileData } = node;
  const checkboxRef = useRef<HTMLInputElement>(null);

  const isSelected = type === "file" && selectedFiles.some(selectedPath => 
    arePathsEqual(selectedPath, path)
  );

  // Check if file is disabled (excluded by patterns)
  const isDisabled = fileData?.excluded || false;

  // Recursive function to check if all files in a directory are selected
  const areAllFilesInDirectorySelected = (node: TreeNode): boolean => {
    if (node.type === "file") {
      return selectedFiles.some(selectedPath =>
        arePathsEqual(selectedPath, node.path)
      );
    }

    if (
      node.type === "directory" &&
      node.children &&
      node.children.length > 0
    ) {
      return node.children.every(child =>
        areAllFilesInDirectorySelected(child)
      );
    }

    return false;
  };

  // Recursive function to check if any file in a directory is selected
  const isAnyFileInDirectorySelected = (node: TreeNode): boolean => {
    if (node.type === "file") {
      return selectedFiles.some(selectedPath =>
        arePathsEqual(selectedPath, node.path)
      );
    }

    if (
      node.type === "directory" &&
      node.children &&
      node.children.length > 0
    ) {
      return node.children.some(child => isAnyFileInDirectorySelected(child));
    }

    return false;
  };

  // For directories, check if all children are selected
  const isDirectorySelected =
    type === "directory" && node.children && node.children.length > 0
      ? areAllFilesInDirectorySelected(node)
      : false;

  // Check if some but not all files in this directory are selected
  const isDirectoryPartiallySelected =
    type === "directory" && node.children && node.children.length > 0
      ? isAnyFileInDirectorySelected(node) && !isDirectorySelected
      : false;

  // Update the indeterminate state manually whenever it changes
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isDirectoryPartiallySelected;
    }
  }, [isDirectoryPartiallySelected]);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    toggleExpanded(id);
  };

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    if (type === "directory") {
      toggleExpanded(id);
    } else if (type === "file" && !isDisabled) {
      toggleFileSelection(path);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    if (type === "file") {
      toggleFileSelection(path);
    } else if (type === "directory") {
      toggleFolderSelection(path, e.target.checked);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation();
  };

  // Generate indentation for nested levels
  const indentation = [];
  for (let i = 0; i < depth; i++) {
    indentation.push(
      <span key={`indent-${i}`} className={styles.treeItemIndent} />
    );
  }

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
};

export default TreeItem;
