import React, { useState, useEffect, useRef, useCallback } from "react";
import { SidebarProps, TreeNode, SortOrder } from "../types/FileTypes";
import SearchBar from "./SearchBar";
import TreeItem from "./TreeItem";
import FileTreeHeader from "./FileTreeHeader";
import IgnorePatterns from "./IgnorePatterns";
import { FolderPlus } from "lucide-react";

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
  const [isLoadingPatterns, setIsLoadingPatterns] = useState(false);
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
    
    // Set loading state
    setIsLoadingPatterns(true);
    
    // Load the patterns
    loadIgnorePatterns(selectedFolder, false);
    
    // Reset loading state after a delay
    const timer = setTimeout(() => {
      setIsLoadingPatterns(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [selectedFolder, loadIgnorePatterns]); // Deliberately omitting isLoadingPatterns

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
      console.log("Building file tree from", allFiles.length, "files");
      
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

        // Sort the tree roots and update state in a single batch
        const sortedRoots = sortFileTreeNodes(treeRoots);
        
        // Update state only if component is still mounted and data has changed
        setFileTree(sortedRoots);
        setIsTreeBuildingComplete(true);
      } catch (err) {
        console.error("Error building file tree:", err);
        setFileTree([]);
        setIsTreeBuildingComplete(true);
      } finally {
        // Always clean up our building flag
        isBuildingTreeRef.current = false;
      }
    };

    // Use a timeout to not block UI
    const buildTreeTimeoutId = setTimeout(buildTree, 0);
    return () => {
      clearTimeout(buildTreeTimeoutId);
      // Make sure we clean up the flag if component unmounts during build
      isBuildingTreeRef.current = false;
    };
  }, [allFiles, selectedFolder, expandedNodes, fileTreeSortOrder, sortFileTreeNodes]);

  // Memoize the applyExpandedState function to prevent recreating it on every render
  const applyExpandedState = useCallback((nodes: TreeNode[]): TreeNode[] => {
    // Skip if we're already updating expanded nodes to prevent loops
    if (isUpdatingExpandedNodesRef.current) return nodes;
    
    isUpdatingExpandedNodesRef.current = true;
    
    try {
      return nodes.map((node: TreeNode): TreeNode => {
        if (node.type === "directory") {
          const isExpanded =
            expandedNodes[node.id] !== undefined
              ? expandedNodes[node.id]
              : true; // Default to expanded if not in state

          return {
            ...node,
            isExpanded,
            children: node.children
              ? applyExpandedState(node.children)
              : undefined,
          };
        }
        return node;
      });
    } finally {
      isUpdatingExpandedNodesRef.current = false;
    }
  }, [expandedNodes]);

  // Apply expanded state as a separate operation when expandedNodes change
  useEffect(() => {
    if (fileTree.length === 0) return;
    
    // Skip if we're already updating
    if (isUpdatingExpandedNodesRef.current) return;
    
    const updateTreeWithExpandedState = () => {
      isUpdatingExpandedNodesRef.current = true;
      
      try {
        setFileTree((prevTree: TreeNode[]) => applyExpandedState(prevTree));
      } finally {
        isUpdatingExpandedNodesRef.current = false;
      }
    };
    
    // Schedule the update for next tick to avoid blocking UI
    const updateTimeout = setTimeout(updateTreeWithExpandedState, 0);
    
    return () => {
      clearTimeout(updateTimeout);
      isUpdatingExpandedNodesRef.current = false;
    };
  }, [expandedNodes, fileTree.length, applyExpandedState]);

  // Handler for opening ignore patterns modal
  const handleOpenIgnorePatterns = (isGlobal = false) => {
    // Set the global flag first
    setIgnoreGlobal(isGlobal);
    
    // First, open the modal
    setIgnoreModalOpen(true);
    
    // Then check if we need to load patterns
    if (selectedFolder) {
      // Force a reload by clearing tracking flags
      lastProcessedFolderRef.current = null;
      loadedFoldersRef.current.delete(selectedFolder);
      
      // Make sure we're not in a loading state
      if (isLoadingPatterns) {
        // If already loading, just wait for it to complete
        return;
      }
      
      // Set loading state
      setIsLoadingPatterns(true);
      
      // Load patterns based on global flag
      console.log(`Loading ${isGlobal ? 'global' : 'local'} patterns`);
      loadIgnorePatterns(selectedFolder, isGlobal);
      
      // Set the ignorePatterns state based on which one is selected
      if (isGlobal) {
        setIgnorePatterns(globalIgnorePatterns);
      } else {
        setIgnorePatterns(localIgnorePatterns);
      }
      
      // Clear loading state after a delay
      const timer = setTimeout(() => {
        setIsLoadingPatterns(false);
      }, 500);
    }
  };
  
  // Modified to handle folder path in reset and save
  const handleResetIgnorePatterns = (isGlobal: boolean, folderPath?: string) => {
    // Use either the provided folderPath or the selected folder
    const targetFolder = folderPath || selectedFolder || '';
    
    // Call resetIgnorePatterns with isGlobal and folder path
    resetIgnorePatterns(isGlobal, targetFolder);
    
    // Update state based on which patterns were reset
    if (isGlobal) {
      // When resetting global patterns, set global patterns to empty
      // The actual patterns will be loaded with the API call result
      setGlobalIgnorePatterns('');
      if (ignoreGlobal) {
        setIgnorePatterns('');
      }
    } else {
      // When resetting local patterns, set local patterns to empty
      // The actual patterns will be loaded with the API call result
      setLocalIgnorePatterns('');
      if (!ignoreGlobal) {
        setIgnorePatterns('');
      }
    }
  };

  // Handler for clearing local patterns
  const handleClearIgnorePatterns = (folderPath?: string) => {
    const targetFolder = folderPath || selectedFolder || '';
    
    // Clear the local patterns through the API
    if (targetFolder) {
      clearIgnorePatterns(targetFolder);
      
      // Update local state
      setLocalIgnorePatterns('');
      if (!ignoreGlobal) {
        setIgnorePatterns('');
      }
    }
  };

  // Get the list of top-level folders from the file tree for folder selection
  const getAvailableFolders = () => {
    // Extract unique top-level directories from the file tree
    const folders = new Set<string>();
    
    // Handle the case where the current folder is not in the tree
    if (selectedFolder) {
      folders.add(selectedFolder);
    }
    
    // Add folders from the file tree
    if (fileTree && fileTree.length > 0) {
      fileTree.forEach(node => {
        if (node.type === 'directory') {
          folders.add(node.path);
        }
      });
    }
    
    const folderList = Array.from(folders);
    console.log('Available folders for selection:', folderList);
    return folderList;
  };

  // Function to count excluded files
  const countExcludedFiles = () => {
    if (!allFiles || allFiles.length === 0) return 0;
    
    // Count files that are excluded by patterns (excludedByDefault)
    return allFiles.filter(file => file.excludedByDefault).length;
  };

  // Calculate excluded files count
  const excludedFilesCount = countExcludedFiles();

  // Function to flatten tree
  const flattenTree = (nodes: TreeNode[]): TreeNode[] => {
    let flattened: TreeNode[] = [];
    nodes.forEach((node) => {
      flattened.push(node);
      if (node.type === "directory" && node.isExpanded && node.children) {
        flattened = flattened.concat(flattenTree(node.children));
      }
    });
    return flattened;
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

  useEffect(() => {
    if (selectedFolder) {
      // Load local patterns specific to the selected folder
      loadPatterns(false);
    }
  }, [selectedFolder]);

  // Load global patterns only once when component mounts
  useEffect(() => {
    // Load global patterns on component mount
    loadPatterns(true);
    
    // Debug log for system patterns
    console.log(`Sidebar received ${systemIgnorePatterns?.length || 0} system patterns`);
  }, []);

  const loadPatterns = async (isGlobal) => {
    try {
      if (!isGlobal && !selectedFolder) {
        console.log("Cannot load local patterns: No folder selected");
        return;
      }

      console.log(`Loading ${isGlobal ? 'global' : 'local'} patterns...`);
      
      const patterns = await loadIgnorePatterns(selectedFolder || '', isGlobal);
      
      if (patterns) {
        if (isGlobal) {
          setGlobalIgnorePatterns(patterns);
          // Only update ignorePatterns if we're currently viewing global patterns
          if (ignoreGlobal) {
            setIgnorePatterns(patterns);
          }
        } else {
          setLocalIgnorePatterns(patterns);
          // Only update ignorePatterns if we're currently viewing local patterns
          if (!ignoreGlobal) {
            setIgnorePatterns(patterns);
          }
        }
      }
    } catch (error) {
      console.error(`Error loading ${isGlobal ? 'global' : 'local'} ignore patterns:`, error);
    }
  };

  return (
    <div className="sidebar" style={{ width: `${sidebarWidth}px` }}>
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
                  
                  {excludedFilesCount > 0 && (
                    <div className="excluded-files-indicator">
                      {excludedFilesCount} {excludedFilesCount === 1 ? 'file' : 'files'} excluded by patterns
                    </div>
                  )}
                </>
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
        </>
      ) : (
        <div className="sidebar-empty-state">
          <FolderPlus size={48} className="sidebar-empty-icon" />
          <h3>No Folder Selected</h3>
          <p>Click the folder icon above to select a project folder.</p>
        </div>
      )}

      <div
        className="sidebar-resize-handle"
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
