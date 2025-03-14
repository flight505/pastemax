import React, { useState, useEffect } from "react";
import { SidebarProps, TreeNode, SortOrder } from "../types/FileTypes";
import SearchBar from "./SearchBar";
import TreeItem from "./TreeItem";
import FileTreeHeader from "./FileTreeHeader";
import IgnorePatterns from "./IgnorePatterns";

const Sidebar = ({
  selectedFolder,
  openFolder,
  allFiles,
  selectedFiles,
  toggleFileSelection,
  toggleFolderSelection,
  searchTerm,
  onSearchChange,
  selectAllFiles,
  deselectAllFiles,
  expandedNodes,
  toggleExpanded,
  // New props
  reloadFolder,
  clearSelection,
  removeAllFolders,
  ignorePatterns,
  setIgnorePatterns,
  loadIgnorePatterns,
  saveIgnorePatterns,
}: SidebarProps & {
  reloadFolder: () => void;
  clearSelection: () => void;
  removeAllFolders: () => void;
  ignorePatterns: string;
  setIgnorePatterns: (patterns: string) => void;
  loadIgnorePatterns: (folderPath: string) => void;
  saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath: string) => void;
}) => {
  const [fileTree, setFileTree] = useState<TreeNode[]>([]);
  const [isTreeBuildingComplete, setIsTreeBuildingComplete] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  
  // State for file tree sorting
  const [fileTreeSortOrder, setFileTreeSortOrder] = useState<SortOrder>("name-asc");
  
  // State for ignore patterns modal
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);

  // Min and max width constraints
  const MIN_SIDEBAR_WIDTH = 200;
  const MAX_SIDEBAR_WIDTH = 500;

  // Handle mouse down for resizing
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsResizing(true);
  };

  // Handle resize effect
  useEffect(() => {
    const handleResize = (e: globalThis.MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth >= MIN_SIDEBAR_WIDTH && newWidth <= MAX_SIDEBAR_WIDTH) {
          setSidebarWidth(newWidth);
        }
      }
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleResizeEnd);

    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [isResizing]);

  // Load ignore patterns when folder changes
  useEffect(() => {
    if (selectedFolder) {
      loadIgnorePatterns(selectedFolder);
    }
  }, [selectedFolder, loadIgnorePatterns]);

  // Build file tree structure from flat list of files
  useEffect(() => {
    if (allFiles.length === 0) {
      setFileTree([]);
      setIsTreeBuildingComplete(false);
      return;
    }

    const buildTree = () => {
      console.log("Building file tree from", allFiles.length, "files");
      setIsTreeBuildingComplete(false);

      try {
        // Create a structured representation using nested objects first
        const fileMap: Record<string, any> = {};

        // First pass: create directories and files
        allFiles.forEach((file) => {
          if (!file.path) return;

          const relativePath =
            selectedFolder && file.path.startsWith(selectedFolder)
              ? file.path
                  .substring(selectedFolder.length)
                  .replace(/^\/|^\\/, "")
              : file.path;

          const parts = relativePath.split(/[/\\]/);
          let currentPath = "";
          let current = fileMap;

          // Build the path in the tree
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!part) continue;

            currentPath = currentPath ? `${currentPath}/${part}` : part;
            
            // Use the original file.path for files to avoid path duplication
            const fullPath = i === parts.length - 1 
              ? file.path // For files, use the original path
              : (selectedFolder 
                  ? `${selectedFolder}/${currentPath}` 
                  : currentPath); // For directories

            if (i === parts.length - 1) {
              // This is a file
              current[part] = {
                id: `node-${fullPath}`,
                name: part,
                path: file.path, // Use the original file path
                type: "file",
                level: i,
                fileData: file,
              };
            } else {
              // This is a directory
              if (!current[part]) {
                current[part] = {
                  id: `node-${fullPath}`,
                  name: part,
                  path: fullPath,
                  type: "directory",
                  level: i,
                  children: {},
                };
              }
              current = current[part].children;
            }
          }
        });

        // Convert the nested object structure to the TreeNode array format
        const convertToTreeNodes = (
          node: Record<string, any>,
          level = 0,
        ): TreeNode[] => {
          return Object.keys(node).map((key) => {
            const item = node[key];

            if (item.type === "file") {
              return item as TreeNode;
            } else {
              const children = convertToTreeNodes(item.children, level + 1);
              const isExpanded =
                expandedNodes[item.id] !== undefined
                  ? expandedNodes[item.id]
                  : true; // Default to expanded if not in state

              return {
                ...item,
                children: sortFileTreeNodes(children),
                isExpanded,
              };
            }
          });
        };

        // Convert to proper tree structure
        const treeRoots = convertToTreeNodes(fileMap);

        // Sort the tree roots
        setFileTree(sortFileTreeNodes(treeRoots));
        setIsTreeBuildingComplete(true);
      } catch (err) {
        console.error("Error building file tree:", err);
        setFileTree([]);
        setIsTreeBuildingComplete(true);
      }
    };

    // Use a timeout to not block UI
    const buildTreeTimeoutId = setTimeout(buildTree, 0);
    return () => clearTimeout(buildTreeTimeoutId);
  }, [allFiles, selectedFolder, expandedNodes, fileTreeSortOrder]);

  // Sort file tree nodes based on current sort order
  const sortFileTreeNodes = (nodes: TreeNode[]): TreeNode[] => {
    return [...nodes].sort((a, b) => {
      // Always sort directories first
      if (a.type === "directory" && b.type === "file") return -1;
      if (a.type === "file" && b.type === "directory") return 1;
      
      // Sort based on selected sort order
      switch (fileTreeSortOrder) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "ext-asc": {
          const extA = a.name.includes('.') ? a.name.split('.').pop() || '' : '';
          const extB = b.name.includes('.') ? b.name.split('.').pop() || '' : '';
          return extA.localeCompare(extB) || a.name.localeCompare(b.name);
        }
        case "ext-desc": {
          const extA = a.name.includes('.') ? a.name.split('.').pop() || '' : '';
          const extB = b.name.includes('.') ? b.name.split('.').pop() || '' : '';
          return extB.localeCompare(extA) || a.name.localeCompare(b.name);
        }
        case "date-newest":
          if (a.type === "file" && b.type === "file") {
            const dateA = a.fileData?.lastModified || 0;
            const dateB = b.fileData?.lastModified || 0;
            return dateB - dateA;
          }
          return a.name.localeCompare(b.name);
        default:
          return a.name.localeCompare(b.name);
      }
    });
  };

  // Apply expanded state as a separate operation when expandedNodes change
  useEffect(() => {
    if (fileTree.length === 0) return;

    // Function to apply expanded state to nodes
    const applyExpandedState = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node: TreeNode): TreeNode => {
        if (node.type === "directory") {
          const isExpanded =
            expandedNodes[node.id] !== undefined
              ? expandedNodes[node.id]
              : true; // Default to expanded if not in state

          return {
            ...node,
            isExpanded,
            children: node.children ? applyExpandedState(node.children) : [],
          };
        }
        return node;
      });
    };

    setFileTree((prevTree: TreeNode[]) => applyExpandedState(prevTree));
  }, [expandedNodes]);

  // Handler for opening ignore patterns modal
  const handleOpenIgnorePatterns = () => {
    setIgnoreModalOpen(true);
  };
  
  // Handler for saving ignore patterns
  const handleSaveIgnorePatterns = (patterns: string, isGlobal: boolean) => {
    if (selectedFolder) {
      saveIgnorePatterns(patterns, isGlobal, selectedFolder);
      setIgnorePatterns(patterns);
      setIgnoreModalOpen(false);
    }
  };

  // Flatten the tree for rendering with proper indentation
  const flattenTree = (nodes: TreeNode[]): TreeNode[] => {
    let result: TreeNode[] = [];

    nodes.forEach((node) => {
      // Add the current node
      result.push(node);

      // If it's a directory and it's expanded, add its children
      if (node.type === "directory" && node.isExpanded && node.children) {
        result = [...result, ...flattenTree(node.children)];
      }
    });

    return result;
  };

  // Filter the tree based on search term
  const filterTree = (nodes: TreeNode[], term: string): TreeNode[] => {
    if (!term) return nodes;

    const lowerTerm = term.toLowerCase();

    // Check if a node or any of its children match the search term
    const nodeMatches = (node: TreeNode): boolean => {
      if (node.name.toLowerCase().includes(lowerTerm)) {
        return true;
      }

      if (node.type === "directory" && node.children) {
        return node.children.some((child) => nodeMatches(child));
      }

      return false;
    };

    // Filter the tree nodes
    return nodes
      .filter((node) => nodeMatches(node))
      .map((node) => {
        if (node.type === "directory" && node.children) {
          return {
            ...node,
            children: filterTree(node.children, term),
          };
        }
        return node;
      });
  };

  // Apply the search filter to the tree
  const filteredTree = searchTerm
    ? filterTree(fileTree, searchTerm)
    : fileTree;

  // Flatten for rendering
  const flattenedFilteredTree = flattenTree(filteredTree);

  return (
    <div className="sidebar" style={{ width: `${sidebarWidth}px` }}>
      <FileTreeHeader 
        onOpenFolder={openFolder}
        onSortChange={setFileTreeSortOrder}
        onClearSelection={clearSelection}
        onRemoveAllFolders={removeAllFolders}
        onReloadFileTree={reloadFolder}
        onOpenIgnorePatterns={handleOpenIgnorePatterns}
      />
      
      <div className="sidebar-search">
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>

      <div className="sidebar-actions">
        <button
          className="sidebar-action-btn"
          onClick={selectAllFiles}
          title="Select all files"
        >
          Select All
        </button>
        <button
          className="sidebar-action-btn"
          onClick={deselectAllFiles}
          title="Deselect all files"
        >
          Deselect All
        </button>
      </div>

      <div className="file-tree">
        {isTreeBuildingComplete ? (
          flattenedFilteredTree.length > 0 ? (
            flattenedFilteredTree.map((node) => (
              <TreeItem
                key={node.id}
                node={node}
                selectedFiles={selectedFiles}
                toggleFileSelection={toggleFileSelection}
                toggleFolderSelection={toggleFolderSelection}
                toggleExpanded={toggleExpanded}
              />
            ))
          ) : (
            <div className="tree-empty">
              {searchTerm
                ? "No files match your search."
                : "No files in this folder."}
            </div>
          )
        ) : (
          <div className="tree-loading">
            <div className="spinner"></div>
            <p>Loading files...</p>
          </div>
        )}
      </div>

      <div
        className="sidebar-resize-handle"
        onMouseDown={handleResizeStart}
        title="Resize sidebar"
      />
      
      <IgnorePatterns 
        isOpen={ignoreModalOpen}
        onClose={() => setIgnoreModalOpen(false)}
        onSave={handleSaveIgnorePatterns}
        currentFolder={selectedFolder || ""}
        existingPatterns={ignorePatterns}
      />
    </div>
  );
};

export default Sidebar;
