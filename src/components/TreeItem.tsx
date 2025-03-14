import React, {
  useRef,
  useEffect,
} from "react";
import { TreeItemProps, TreeNode } from "../types/FileTypes";
import { ChevronRight, File, Folder } from "lucide-react";
import { arePathsEqual } from "../utils/pathUtils";

const TreeItem = ({
  node,
  selectedFiles,
  toggleFileSelection,
  toggleFolderSelection,
  toggleExpanded,
}: TreeItemProps) => {
  const { id, name, path, type, level, isExpanded, fileData } = node;
  const checkboxRef = useRef<HTMLInputElement>(null);

  const isSelected = type === "file" && selectedFiles.some(selectedPath => 
    arePathsEqual(selectedPath, path)
  );

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

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggleExpanded(id);
  };

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
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

  // Check if file is binary or otherwise unselectable
  const isDisabled = fileData ? fileData.isBinary || fileData.isSkipped : false;

  // Check if the file is excluded by default (but still selectable)
  const isExcludedByDefault = fileData?.excludedByDefault || false;

  return (
    <div
      className={`tree-item ${isSelected ? "selected" : ""} ${
        isExcludedByDefault ? "excluded-by-default" : ""
      }`}
      style={{ marginLeft: `${level * 12}px` }}
      onClick={handleItemClick}
    >
      {type === "directory" && (
        <div
          className={`tree-item-toggle ${isExpanded ? "expanded" : ""}`}
          onClick={handleToggle}
          aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
        >
          <ChevronRight size={14} />
        </div>
      )}

      {type === "file" && <div className="tree-item-indent"></div>}

      <input
        type="checkbox"
        className="tree-item-checkbox"
        checked={type === "file" ? isSelected : isDirectorySelected}
        ref={checkboxRef}
        onChange={handleCheckboxChange}
        disabled={isDisabled}
        onClick={(e) => e.stopPropagation()}
      />

      <div className="tree-item-content">
        <div className="tree-item-icon">
          {type === "directory" ? <Folder size={14} /> : <File size={14} />}
        </div>

        <div className="tree-item-name">{name}</div>

        {fileData && fileData.tokenCount > 0 && (
          <span className="tree-item-tokens">
            (~{fileData.tokenCount.toLocaleString()})
          </span>
        )}

        {isDisabled && fileData && (
          <span className="tree-item-badge">
            {fileData.isBinary ? "Binary" : "Skipped"}
          </span>
        )}

        {!isDisabled && isExcludedByDefault && (
          <span className="tree-item-badge excluded">Excluded</span>
        )}
      </div>
    </div>
  );
};

export default TreeItem;
