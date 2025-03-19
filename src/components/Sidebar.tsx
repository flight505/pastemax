import React, { useState, useEffect, useRef, useCallback } from "react";
import { SidebarProps, TreeNode, SortOrder } from "../types/FileTypes";
import TreeItem from "./TreeItem";
import FileTreeHeader from "./FileTreeHeader";
import IgnorePatterns from "./IgnorePatterns";
import { FolderPlus } from "lucide-react";
import { Button } from "./ui";
import SearchBar from "./SearchBar";
import styles from "./Sidebar.module.css";

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
  resetIgnorePatterns,
  systemIgnorePatterns,
  clearIgnorePatterns,
}: SidebarProps & {
  reloadFolder: () => void;
  clearSelection: () => void;
  removeAllFolders: () => void;
  ignorePatterns: string;
  setIgnorePatterns: (patterns: string) => void;
  loadIgnorePatterns: (folderPath: string, isGlobal?: boolean) => void;
  saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath: string) => void;
  resetIgnorePatterns: (isGlobal: boolean, folderPath: string) => void;
  systemIgnorePatterns: string[];
  clearIgnorePatterns: (folderPath: string) => void;
}) => {
  const [fileTree, setFileTree] = useState<TreeNode[]>([]);
  const [isTreeBuildingComplete, setIsTreeBuildingComplete] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  
  // State for file tree sorting
  const [fileTreeSortOrder, setFileTreeSortOrder] = useState<SortOrder>("name-asc");
  
  // State for ignore patterns modal
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
  const [ignoreGlobal, setIgnoreGlobal] = useState(false);
  const [globalIgnorePatterns, setGlobalIgnorePatterns] = useState("");
  const [localIgnorePatterns, setLocalIgnorePatterns] = useState("");
  
  // Min and max width constraints
  const MIN_SIDEBAR_WIDTH = 200;
  const MAX_SIDEBAR_WIDTH = 500;

  // All component level refs need to be defined here
  const loadedFoldersRef = useRef<Set<string>>(new Set());
  const lastProcessedFolderRef = useRef<string | null>(null);
  const isBuildingTreeRef = useRef(false);
  const isUpdatingExpandedNodesRef = useRef(false);

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

  // Load ignore patterns when folder changes - with optimization to prevent infinite loops
  useEffect(() => {
    // Skip if no folder is selected
    if (!selectedFolder) return;
    
    // Skip if we already processed this exact folder
    if (lastProcessedFolderRef.current === selectedFolder && 
        loadedFoldersRef.current.has(selectedFolder)) return;
    
    // Set the last processed folder reference
    lastProcessedFolderRef.current = selectedFolder;
    
    // Track that we're processing this folder
    loadedFoldersRef.current.add(selectedFolder);
    
    // Load the patterns
    loadIgnorePatterns(selectedFolder, false);
    
  }, [selectedFolder, loadIgnorePatterns]); // Removed the loading state and its setter

  // Sort file tree nodes - memoized with useCallback to prevent recreation on every render
  const sortFileTreeNodes = useCallback((nodes: TreeNode[]): TreeNode[] => {
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
  }, [fileTreeSortOrder]); // Only depends on the sort order

  // Build file tree structure from flat list of files
  useEffect(() => {
    // Skip if no files or if we already updated the tree for this set of files
    if (allFiles.length === 0) {
      setFileTree([]);
      setIsTreeBuildingComplete(false);
      return;
    }
    
    // Skip if we're already in the process of building
    if (isBuildingTreeRef.current) return;
    
    const buildTree = () => {
      // Mark that we're starting to build
      isBuildingTreeRef.current = true;
      
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

          // Process path parts to create directory structure
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!part) continue; // Skip empty parts
            
            currentPath = currentPath ? `${currentPath}/${part}` : part;
            
            if (i === parts.length - 1) {
              // This is a file
              current[part] = {
                type: "file",
                name: part,
                path: file.path,
                fileData: file,
              };
            } else {
              // This is a directory
              if (!current[part]) {
                current[part] = {
                  type: "directory",
                  name: part,
                  children: {},
                };
              }
              current = current[part].children;
            }
          }
        });

        // Convert the nested object structure to TreeNode array with proper nesting
        const convertToTreeNodes = (
          node: Record<string, any>,
          level = 0,
        ): TreeNode[] => {
          return Object.keys(node).map((key) => {
            const item = node[key];
            const id = `node-${Math.random().toString(36).substring(2, 9)}`;
            
            if (item.type === "directory") {
              return {
                id,
                name: item.name,
                type: "directory",
                path: "", // Add empty string as default path for directory nodes
                children: convertToTreeNodes(item.children, level + 1),
                isExpanded: level < 2 || Boolean(expandedNodes[id]),
                level,
              };
            } else {
              return {
                id,
                name: item.name,
                type: "file",
                path: item.path,
                children: [],
                isExpanded: false,
                fileData: item.fileData,
                level,
              };
            }
          });
        };

        // Convert the fileMap to a TreeNode array
        const tempTree = convertToTreeNodes(fileMap);
        
        // Sort the tree based on current sort order
        const sortedTree = sortFileTreeNodes(tempTree);
        
        // Update the file tree state
        setFileTree(sortedTree);
        setIsTreeBuildingComplete(true);
        
        // Mark that we're done building
        isBuildingTreeRef.current = false;
        
        // Update expanded state if needed
        if (Object.keys(expandedNodes).length > 0 && !isUpdatingExpandedNodesRef.current) {
          updateTreeWithExpandedState();
        }
      } catch (error) {
        console.error("Error building file tree:", error);
        isBuildingTreeRef.current = false;
      }
    };
    
    // Schedule the tree building for the next rendering cycle
    const timeoutId = setTimeout(buildTree, 0);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [allFiles, expandedNodes, selectedFolder, sortFileTreeNodes]);

  // Recursively update the tree to reflect expanded state
  const updateTreeWithExpandedState = useCallback(() => {
    if (isUpdatingExpandedNodesRef.current) return;
    
    isUpdatingExpandedNodesRef.current = true;
    
    const updateNodes = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map(node => {
        const isExpanded = expandedNodes[node.id] !== undefined 
          ? expandedNodes[node.id] 
          : node.isExpanded;
        
        return {
          ...node,
          isExpanded,
          children: node.children ? updateNodes(node.children) : [],
        };
      });
    };
    
    setFileTree(prevTree => updateNodes(prevTree));
    
    isUpdatingExpandedNodesRef.current = false;
  }, [expandedNodes]);

  // Handle opening the ignore patterns modal
  const handleOpenIgnorePatterns = (isGlobal = false) => {
    setIgnoreGlobal(isGlobal);
    
    // Ensure we have patterns loaded
    if (isGlobal) {
      loadPatterns(true);
    } else {
      loadPatterns(false);
    }
    
    setIgnoreModalOpen(true);
  };

  // Load patterns based on global or local scope
  const loadPatterns = async (isGlobal: boolean) => {
    try {
      // Load global patterns if needed
      if (isGlobal) {
        if (!globalIgnorePatterns) {
          // Use an empty user folder since global patterns aren't tied to a specific folder
          await loadIgnorePatterns('', true);
        } else {
          // We already have global patterns loaded, just update the current patterns display
          setIgnorePatterns(globalIgnorePatterns);
        }
      } 
      // Load local patterns if needed
      else if (selectedFolder && !localIgnorePatterns) {
        await loadIgnorePatterns(selectedFolder, false);
      } else if (selectedFolder) {
        // We already have local patterns loaded, just update the current patterns display
        setIgnorePatterns(localIgnorePatterns);
      }
    } catch (err) {
      console.error(`Error loading ${isGlobal ? 'global' : 'local'} patterns:`, err);
    }
  };

  // Handle reset button click in ignore patterns modal
  const handleResetIgnorePatterns = (isGlobal: boolean, folderPath?: string) => {
    // Use the provided folderPath if available, otherwise use selectedFolder
    const targetFolder = folderPath || selectedFolder || '';
    
    // Call the parent's reset function
    resetIgnorePatterns(isGlobal, targetFolder);
    
    // Preview empty patterns in the UI immediately
    const defaultPatterns = ''; // Could be system defaults for global, or empty for local
    
    if (isGlobal) {
      setGlobalIgnorePatterns(defaultPatterns);
      
      // Only update the current view if we're on the global tab
      if (ignoreGlobal) {
        setIgnorePatterns(defaultPatterns);
      }
    } else {
      setLocalIgnorePatterns(defaultPatterns);
      
      // Only update the current view if we're on the local tab
      if (!ignoreGlobal) {
        setIgnorePatterns(defaultPatterns);
      }
    }
  };

  // Handle clear button click in ignore patterns modal
  const handleClearIgnorePatterns = (folderPath?: string) => {
    // Use the provided folderPath if available, otherwise use selectedFolder
    const targetFolder = folderPath || selectedFolder || '';
    
    if (targetFolder) {
      // Call the parent's clear function
      clearIgnorePatterns(targetFolder);
      
      // Preview empty patterns in the UI immediately
      setLocalIgnorePatterns('');
      if (!ignoreGlobal) {
        setIgnorePatterns('');
      }
    }
  };

  // Get a list of available folders for the folder selector
  const getAvailableFolders = () => {
    const folders = new Set<string>();
    
    // Collect all unique folder paths
    allFiles.forEach((file) => {
      if (file.path) {
        // Extract directory without the file name
        const lastSlashIndex = Math.max(
          file.path.lastIndexOf('/'),
          file.path.lastIndexOf('\\')
        );
        
        if (lastSlashIndex > 0) {
          const folder = file.path.substring(0, lastSlashIndex);
          folders.add(folder);
        }
      }
    });
    
    return Array.from(folders);
  };

  // Count files excluded by ignore patterns
  const countExcludedFiles = () => {
    // For simplicity, we just return 0 here until we can compute this properly
    const excludedFilesCount = allFiles.filter(file => file.excluded).length;
    return excludedFilesCount;
  };

  // Flatten the tree for rendering, preserving expanded folders and their children
  const flattenTree = (nodes: TreeNode[]): TreeNode[] => {
    let result: TreeNode[] = [];
    
    for (const node of nodes) {
      result.push(node);
      
      if (node.type === "directory" && node.isExpanded && node.children && node.children.length > 0) {
        result = result.concat(flattenTree(node.children));
      }
    }
    
    return result;
  };

  // Filter the tree based on search term - rename function to avoid linting error
  const filterTree = (nodes: TreeNode[], term: string): TreeNode[] => {
    if (!term) return nodes;
    
    const lowerTerm = term.toLowerCase();
    
    // Keep only the original hasMatchingChild function
    const hasMatchingChild = (node: TreeNode): boolean => {
      if (node.type === "file") {
        return node.name.toLowerCase().includes(lowerTerm);
      }
      
      if (node.type === "directory") {
        const dirMatch = node.name.toLowerCase().includes(lowerTerm);
        const childMatch = node.children && node.children.some(hasMatchingChild);
        
        return dirMatch || Boolean(childMatch);
      }
      
      return false;
    };
    
    const filterWithExpanded = (node: TreeNode): TreeNode | null => {
      if (node.type === "file") {
        return node.name.toLowerCase().includes(lowerTerm) ? node : null;
      }
      
      if (node.type === "directory") {
        // Keep this directory if it matches or has matching children
        const isMatching = hasMatchingChild(node);
        
        if (isMatching) {
          // Filter children, but keep the structure
          const filteredChildren = node.children && node.children
            .map(filterWithExpanded)
            .filter((n): n is TreeNode => n !== null);
          
          // Return a new node with expanded state if it's matching
          return {
            ...node,
            children: filteredChildren || [],
            isExpanded: true, // Always expand matching directories
          };
        }
      }
      
      return null;
    };
    
    return nodes
      .map(filterWithExpanded)
      .filter((n): n is TreeNode => n !== null);
  };

  // Compute filtered and flattened tree for rendering
  const filteredTree = searchTerm ? filterTree(fileTree, searchTerm) : fileTree;
  const flattenedFilteredTree = flattenTree(filteredTree);

  // Add expanded node state to the tree
  useEffect(() => {
    // Skip if no tree or no need to update
    if (fileTree.length === 0 || isUpdatingExpandedNodesRef.current) return;
    
    updateTreeWithExpandedState();
    
  }, [fileTree, updateTreeWithExpandedState]); // Include updateTreeWithExpandedState in dependencies

  return (
    <div className={styles.sidebar} style={{ width: `${sidebarWidth}px` }}>
      <FileTreeHeader 
        onOpenFolder={openFolder}
        onSortChange={setFileTreeSortOrder}
        onClearSelection={clearSelection}
        onRemoveAllFolders={removeAllFolders}
        onReloadFileTree={reloadFolder}
        onOpenIgnorePatterns={() => handleOpenIgnorePatterns(false)}
        excludedFilesCount={countExcludedFiles()}
      />
      
      {selectedFolder ? (
        <>
          <div className={styles.sidebarSearch}>
            <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
          </div>

          <div className={styles.sidebarActions}>
            <Button
              variant="primary"
              onClick={selectAllFiles}
              title="Select all files"
            >
              Select All
            </Button>
            <Button
              variant="secondary"
              onClick={deselectAllFiles}
              title="Deselect all files"
            >
              Deselect All
            </Button>
          </div>

          <div className={styles.fileTree}>
            {isTreeBuildingComplete ? (
              flattenedFilteredTree.length > 0 ? (
                <>
                  {flattenedFilteredTree.map((node) => (
                    <TreeItem
                      key={node.id}
                      node={node}
                      selectedFiles={selectedFiles}
                      toggleFileSelection={toggleFileSelection}
                      toggleFolderSelection={toggleFolderSelection}
                      toggleExpanded={toggleExpanded}
                    />
                  ))}
                </>
              ) : (
                <div className={styles.treeEmpty}>
                  {searchTerm
                    ? "No files match your search."
                    : "No files in this folder."}
                </div>
              )
            ) : (
              <div className={styles.treeLoading}>
                <div className={styles.spinner}></div>
                <p>Loading files...</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.sidebarEmptyState}>
          <FolderPlus size={48} className={styles.sidebarEmptyIcon} />
          <h3>No Folder Selected</h3>
          <p>Click the folder icon above to select a project folder.</p>
        </div>
      )}

      <div
        className={styles.sidebarResizeHandle}
        onMouseDown={handleResizeStart}
        title="Resize sidebar"
      />
      
      <IgnorePatterns 
        isOpen={ignoreModalOpen}
        onClose={() => setIgnoreModalOpen(false)}
        onSave={(patterns, isGlobal, folderPath) => {
          // Update the appropriate state
          if (isGlobal) {
            setGlobalIgnorePatterns(patterns);
          } else {
            // Get the target folder - either the provided one or the currently selected one
            const targetFolder = folderPath || selectedFolder || '';
            
            if (targetFolder) {
              setLocalIgnorePatterns(patterns);
            }
          }
          
          // Call the saveIgnorePatterns which will save to disk
          // Use the provided folderPath if available, otherwise use selectedFolder
          saveIgnorePatterns(patterns, isGlobal, folderPath || selectedFolder || '');
          
          // Close the modal
          setIgnoreModalOpen(false);
          
          // If patterns are for the current folder, reload the folder
          if (!isGlobal && (folderPath === selectedFolder || !folderPath)) {
            reloadFolder();
          }
        }}
        onReset={handleResetIgnorePatterns}
        onClear={handleClearIgnorePatterns}
        currentFolder={selectedFolder || ""}
        existingPatterns={ignorePatterns}
        isGlobal={ignoreGlobal}
        globalPatterns={globalIgnorePatterns}
        localPatterns={localIgnorePatterns}
        systemPatterns={systemIgnorePatterns}
        availableFolders={getAvailableFolders()}
        onTabChange={(isGlobal) => {
          setIgnoreGlobal(isGlobal);
          // Load the appropriate patterns if needed
          if (isGlobal) {
            setIgnorePatterns(globalIgnorePatterns);
          } else {
            setIgnorePatterns(localIgnorePatterns);
          }
        }}
      />
    </div>
  );
};

export default Sidebar;
