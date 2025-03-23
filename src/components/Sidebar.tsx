import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SidebarProps, TreeNode, SortOrder } from "../types/FileTypes";
import TreeItem from "./TreeItem";
import FileTreeHeader from "./FileTreeHeader";
import IgnorePatterns from "./IgnorePatterns";
import { FolderPlus } from "lucide-react";
import { Button } from "./ui";
import SearchBar from "./SearchBar";
import styles from "./Sidebar.module.css";

// Extend the existing SidebarProps from FileTypes
interface ExtendedSidebarProps extends SidebarProps {
  reloadFolder: () => void;
  clearSelection: () => void;
  removeAllFolders: () => void;
  ignorePatterns: string;
  setIgnorePatterns: (patterns: string) => void;
  loadIgnorePatterns: (folderPath: string, isGlobal?: boolean) => void;
  saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath: string) => void;
  systemIgnorePatterns: string[];
  clearIgnorePatterns: (folderPath: string) => void;
  onClearSelectionClick?: () => void;
  onRemoveAllFoldersClick?: () => void;
}

const Sidebar: React.FC<ExtendedSidebarProps> = ({
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
  reloadFolder,
  clearSelection,
  removeAllFolders,
  ignorePatterns,
  setIgnorePatterns,
  loadIgnorePatterns,
  saveIgnorePatterns,
  systemIgnorePatterns,
  clearIgnorePatterns,
  onClearSelectionClick,
  onRemoveAllFoldersClick,
}: ExtendedSidebarProps) => {
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

  // Define all helper functions first before they're used
  
  // Helper function for file tree - Flatten the tree for rendering
  const flattenTree = useCallback((nodes: TreeNode[]): TreeNode[] => {
    let result: TreeNode[] = [];
    
    for (const node of nodes) {
      result.push(node);
      
      if (node.type === "directory" && node.isExpanded && node.children && node.children.length > 0) {
        result = result.concat(flattenTree(node.children));
      }
    }
    
    return result;
  }, []);
  
  // Helper function for file tree - Filter the tree based on search term
  const filterTree = useCallback((nodes: TreeNode[], term: string): TreeNode[] => {
    if (!term) return nodes;
    
    const lowerTerm = term.toLowerCase();
    
    // Helper function to check if a node matches the search term
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
  }, []);
  
  // Now that we've defined filterTree and flattenTree, we can use them in useMemo
  const memoizedFilteredTree = useMemo(() => {
    return searchTerm ? filterTree(fileTree, searchTerm) : fileTree;
  }, [fileTree, searchTerm, filterTree]);
  
  const memoizedFlattenedTree = useMemo(() => {
    return flattenTree(memoizedFilteredTree);
  }, [memoizedFilteredTree, flattenTree]);

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
    
  }, [selectedFolder, loadIgnorePatterns]); // Added loadIgnorePatterns as dependency

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

  // Update tree with expanded state
  const updateTreeWithExpandedState = useCallback(() => {
    if (fileTree.length === 0 || isUpdatingExpandedNodesRef.current) return;
    
    isUpdatingExpandedNodesRef.current = true;
    
    // Add change detection to prevent unnecessary updates
    let hasChanged = false;
    
    const updateNodes = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map(node => {
        const nodeExpanded = expandedNodes.has(node.id) ? !!expandedNodes.get(node.id) : false;
        const isExpanded = nodeExpanded || node.isExpanded;
        
        // Check if there's a change in expanded state
        if (isExpanded !== node.isExpanded) {
          hasChanged = true;
        }
        
        // Check if directory has children to update
        if (node.type === "directory" && node.children && node.children.length > 0) {
          return {
            ...node,
            isExpanded,
            children: updateNodes(node.children),
          };
        }
        
        return {
          ...node,
          isExpanded,
        };
      });
    };
    
    // Only update if there are actual changes
    if (hasChanged) {
      setFileTree(prevTree => updateNodes([...prevTree]));
    }
    
    isUpdatingExpandedNodesRef.current = false;
  }, [expandedNodes, fileTree]);

  // Build file tree structure from flat list of files
  useEffect(() => {
    // Skip if no files or if we're already building
    if (allFiles.length === 0) {
      setFileTree([]);
      setIsTreeBuildingComplete(false);
      return;
    }
    
    if (isBuildingTreeRef.current) {
      return;
    }
    
    const buildTree = () => {
      try {
        isBuildingTreeRef.current = true;
        
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
                isExpanded: level < 2 || (expandedNodes.has(id) ? !!expandedNodes.get(id) : false),
                depth: level,
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
                depth: level,
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
        if (typeof expandedNodes.size === 'number' && expandedNodes.size > 0 && !isUpdatingExpandedNodesRef.current) {
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
  }, [allFiles, expandedNodes, selectedFolder, sortFileTreeNodes, updateTreeWithExpandedState]);

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
  const loadPatterns = useCallback(async (isGlobal: boolean) => {
    try {
      // Load global patterns if needed
      if (isGlobal) {
        if (!globalIgnorePatterns) {
          await loadIgnorePatterns('', true);
        } else {
          setIgnorePatterns(globalIgnorePatterns);
        }
      } 
      // Load local patterns if needed
      else if (selectedFolder && !localIgnorePatterns) {
        await loadIgnorePatterns(selectedFolder, false);
      } else if (selectedFolder) {
        setIgnorePatterns(localIgnorePatterns);
      }
    } catch (err) {
      console.error(`Error loading ${isGlobal ? 'global' : 'local'} patterns:`, err);
    }
  }, [selectedFolder, loadIgnorePatterns, globalIgnorePatterns, localIgnorePatterns, setIgnorePatterns]);

  // Handle reset button click in ignore patterns modal
  const handleResetIgnorePatterns = useCallback(async () => {
    if (!isElectron) return;
    await window.electron.resetIgnorePatterns(true, selectedFolder);
    await loadPatterns();
  }, [selectedFolder, loadPatterns]);

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

  return (
    <div className={styles.sidebar} style={{ width: `${sidebarWidth}px` }}>
      <FileTreeHeader 
        onOpenFolder={openFolder}
        onSortChange={setFileTreeSortOrder}
        onClearSelection={onClearSelectionClick || clearSelection}
        onRemoveAllFolders={onRemoveAllFoldersClick || removeAllFolders}
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
              size="sm"
              onClick={selectAllFiles}
              title="Select all files"
            >
              Select All
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={deselectAllFiles}
              title="Deselect all files"
            >
              Deselect All
            </Button>
          </div>

          <div className={styles.fileTree}>
            {isTreeBuildingComplete ? (
              memoizedFlattenedTree.length > 0 ? (
                <>
                  {memoizedFlattenedTree.map((node) => (
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
