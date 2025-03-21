import React, { useState, useEffect, useRef, useCallback } from "react";
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

  // Check if we're running in Electron environment - move this to the top
  const isElectron = typeof window !== 'undefined' && 'electron' in window;

  // Memoized function to load patterns - define this first
  const loadPatterns = useCallback(async (folderPath: string, isGlobal: boolean = false) => {
    if (!isElectron) {
      console.log("Not in Electron environment, skipping loadPatterns");
      return "";
    }
    
    // Prevent duplicate loading of patterns
    if (isGlobal && globalIgnorePatterns !== "") {
      console.log("Global ignore patterns already loaded, skipping...");
      return globalIgnorePatterns;
    }
    
    if (!isGlobal && folderPath === selectedFolder && localIgnorePatterns !== "") {
      console.log("Local ignore patterns already loaded for current folder, skipping...");
      return localIgnorePatterns;
    }
    
    console.log(`Loading ${isGlobal ? 'global' : 'local'} ignore patterns${!isGlobal ? ` for ${folderPath}` : ''}`);
    
    try {
      const result = await window.electron.ipcRenderer.invoke("load-ignore-patterns", {
        folderPath,
        isGlobal
      });
      
      if (result.success) {
        console.log(`Successfully loaded ${isGlobal ? 'global' : 'local'} ignore patterns`);
        
        // Debug log the patterns that were loaded
        const patterns = result.patterns || '';
        if (patterns.trim()) {
          console.log(`Loaded user patterns:\n${patterns}`);
        } else {
          console.log(`No ${isGlobal ? 'global' : 'local'} patterns found`);
        }
        
        // Store system patterns if provided
        if (result.systemPatterns && Array.isArray(result.systemPatterns)) {
          console.log(`Received ${result.systemPatterns.length} system patterns from main process`);
          setSystemIgnorePatterns(result.systemPatterns);
        } else {
          console.warn('No system patterns received from main process or not in expected format');
        }
        
        // Update pattern state
        if (isGlobal) {
          setGlobalIgnorePatterns(patterns);
          setIgnorePatterns(patterns);
        } else if (folderPath === selectedFolder) {
          // Only update local patterns if they're for the current folder
          setLocalIgnorePatterns(patterns);
          setIgnorePatterns(patterns);
        }
        
        return patterns;
      } else {
        console.error(`Error loading ${isGlobal ? 'global' : 'local'} ignore patterns:`, result.error);
        return "";
      }
    } catch (error) {
      console.error("Error invoking load-ignore-patterns:", error);
      return "";
    }
  }, [isElectron, globalIgnorePatterns, localIgnorePatterns, selectedFolder, setIgnorePatterns]);

  // Load ignore patterns when folder changes
  useEffect(() => {
    if (!selectedFolder) return;
    
    if (lastProcessedFolderRef.current === selectedFolder && 
        loadedFoldersRef.current.has(selectedFolder)) return;
    
    lastProcessedFolderRef.current = selectedFolder;
    loadedFoldersRef.current.add(selectedFolder);
    loadPatterns(selectedFolder, false);
  }, [selectedFolder, loadPatterns]);

  // Load system ignore patterns on mount
  useEffect(() => {
    if (systemIgnorePatterns?.length === undefined) {
      loadPatterns('', true);
    }
  }, [loadPatterns, systemIgnorePatterns?.length]);

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
  }, [allFiles, expandedNodes, selectedFolder, sortFileTreeNodes]);

  // Update the useEffect hook to include the tree update logic
  useEffect(() => {
    if (!fileTree.length || isUpdatingExpandedNodesRef.current) return;
    
    const updateTreeWithExpandedState = () => {
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
      
      try {
        const updatedTree = updateNodes(fileTree);
        
        // Only update the tree if there were changes
        if (hasChanged) {
          setFileTree(updatedTree);
        }
      } catch (error) {
        console.error("Error updating tree with expanded state:", error);
      } finally {
        isUpdatingExpandedNodesRef.current = false;
      }
    };

    updateTreeWithExpandedState();
    
    return () => {
      isUpdatingExpandedNodesRef.current = false;
    };
  }, [fileTree, expandedNodes, setFileTree]);

  // Handle opening the ignore patterns modal
  const handleOpenIgnorePatterns = (isGlobal = false) => {
    setIgnoreGlobal(isGlobal);
    
    // Ensure we have patterns loaded
    if (isGlobal) {
      loadPatterns('', true);
    } else if (selectedFolder) {
      loadPatterns(selectedFolder, false);
    }
    
    setIgnoreModalOpen(true);
  };

  // Handle reset button click in ignore patterns modal
  const handleResetIgnorePatterns = useCallback(async () => {
    if (!isElectron) return;
    await window.electron.resetIgnorePatterns(true, selectedFolder);
    if (selectedFolder) {
      await loadPatterns(selectedFolder, false);
    }
  }, [selectedFolder, loadPatterns, isElectron]);

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
              fileTree.length > 0 ? (
                <>
                  {fileTree.map((node) => (
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
