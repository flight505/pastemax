import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SidebarProps, TreeNode, SortOrder, FileData } from "../types/FileTypes";
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
  loadIgnorePatterns: (folderPath: string, isGlobal?: boolean) => Promise<void>;
  saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath?: string) => Promise<void>;
  resetIgnorePatterns: (isGlobal: boolean, folderPath?: string) => Promise<void>;
  systemIgnorePatterns: string[];
  clearIgnorePatterns: (folderPath: string) => Promise<void>;
  onClearSelectionClick: () => void;
  onRemoveAllFoldersClick: () => void;
  onResetPatternsClick: (isGlobal: boolean, folderPath: string) => void;
  fileTreeSortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  globalPatternsState: IgnorePatternsState;
  localPatternsState: IgnorePatternsState;
  onExcludedSystemPatternsChange: (patterns: string[]) => void;
}

// Define IgnorePatternsState interface
interface IgnorePatternsState {
  patterns: string;
  excludedSystemPatterns: string[];
}

// Debounce delay in ms
const DEBOUNCE_DELAY = 200;

// Use a timeout to prevent infinite tree building loops
const TREE_BUILD_TIMEOUT = 5000;

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
  resetIgnorePatterns,
  systemIgnorePatterns,
  clearIgnorePatterns,
  onClearSelectionClick,
  onRemoveAllFoldersClick,
  onResetPatternsClick,
  fileTreeSortOrder,
  onSortOrderChange,
  globalPatternsState,
  localPatternsState,
  onExcludedSystemPatternsChange,
}) => {
  const [fileTree, setFileTree] = useState<TreeNode[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  
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
  const buildTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSelectedFilesRef = useRef<string[]>([]);

  // Cache the previous selected files to optimize render
  useEffect(() => {
    lastSelectedFilesRef.current = selectedFiles;
  }, [selectedFiles]);

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
  
  // Helper function for file tree - Filter the tree based on search term with performance optimizations
  const filterTree = useCallback((nodes: TreeNode[], term: string): TreeNode[] => {
    if (!term) return nodes;
    
    const lowerTerm = term.toLowerCase();
    
    // Helper function to check if a node or its children match the search term
    const hasMatch = (node: TreeNode): boolean => {
      if (node.name.toLowerCase().includes(lowerTerm)) {
        return true;
      }
      
      if (node.type === "directory" && node.children && node.children.length > 0) {
        return node.children.some(hasMatch);
      }
      
      return false;
    };
    
    const filterNode = (node: TreeNode): TreeNode | null => {
      if (!hasMatch(node)) {
        return null;
      }
      
      if (node.type === "file") {
        return node;
      }
      
      if (node.type === "directory") {
        const filteredChildren = node.children 
          ? node.children
              .map(filterNode)
              .filter((n): n is TreeNode => n !== null)
          : [];
        
        return {
          ...node,
          isExpanded: true, // Always expand matching directories
          children: filteredChildren
        };
      }
      
      return null;
    };
    
    return nodes
      .map(filterNode)
      .filter((n): n is TreeNode => n !== null);
  }, []);
  
  // Use memoization to avoid unnecessary recalculations
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
    
  }, [selectedFolder, loadIgnorePatterns]);

  // Sort file tree nodes - memoized with useCallback to prevent recreation on every render
  const sortFileTreeNodes = useCallback((nodes: TreeNode[]): TreeNode[] => {
    if (!nodes || nodes.length === 0) return [];

    // Create a new array to avoid mutating the input
    return [...nodes].sort((a, b) => {
      // Always sort directories first
      if (a.type === "directory" && b.type === "file") return -1;
      if (a.type === "file" && b.type === "directory") return 1;
      
      // Sort based on selected sort order
      switch (fileTreeSortOrder) {
        case "name-ascending":
          return a.name.localeCompare(b.name);
        case "name-descending":
          return b.name.localeCompare(a.name);
        case "tokens-ascending":
          return (a.fileData?.tokenCount || 0) - (b.fileData?.tokenCount || 0);
        case "tokens-descending":
          return (b.fileData?.tokenCount || 0) - (a.fileData?.tokenCount || 0);
        case "date-ascending":
          return (a.fileData?.lastModified || 0) - (b.fileData?.lastModified || 0);
        case "date-descending":
          return (b.fileData?.lastModified || 0) - (a.fileData?.lastModified || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [fileTreeSortOrder]);

  // Apply sort recursively to the entire tree
  const sortNodesRecursively = useCallback((nodes: TreeNode[]): TreeNode[] => {
    if (!nodes || nodes.length === 0) return [];

    // Sort the current level
    const sortedNodes = sortFileTreeNodes(nodes);
    
    // Recursively sort children
    return sortedNodes.map(node => {
      if (node.type === "directory" && node.children && node.children.length > 0) {
        return {
          ...node,
          children: sortNodesRecursively(node.children)
        };
      }
      return node;
    });
  }, [sortFileTreeNodes]);

  // Build file tree structure from flat list of files - optimized
  const buildFileTree = useCallback(async (files: FileData[], rootFolder: string): Promise<TreeNode[]> => {
    if (!files || files.length === 0) return [];
    
    // Create a stable map of paths to prevent recursion issues
    const pathMap = new Map<string, FileData>();
    files.forEach(file => {
      if (file.path) {
        pathMap.set(file.path, file);
      }
    });
    
    try {
      // Create a map to store the file tree structure
      const fileMap: Record<string, any> = {};
      
      // Process each file
      Array.from(pathMap.entries()).forEach(([path, file]) => {
        let relativePath = path;
        if (relativePath.startsWith(rootFolder)) {
          relativePath = relativePath.substring(rootFolder.length);
          if (relativePath.startsWith('/') || relativePath.startsWith('\\')) {
            relativePath = relativePath.substring(1);
          }
        }
        
        const parts = relativePath.split(/[/\\]/);
        let current = fileMap;
        
        // Build the tree structure
        parts.forEach((part, index) => {
          if (!current[part]) {
            const fullPath = rootFolder + '/' + parts.slice(0, index + 1).join('/');
            const nodeId = `${fullPath}`;
            current[part] = {
              name: part,
              path: fullPath,
              id: nodeId, 
              type: index === parts.length - 1 ? "file" as const : "directory" as const,
              children: {},
              fileData: index === parts.length - 1 ? file : undefined
            };
          }
          current = current[part].children;
        });
      });
      
      // Convert the nested object structure to an array of TreeNodes
      const convertToTreeNodes = (
        obj: Record<string, any>,
        level = 0
      ): TreeNode[] => {
        const nodes = Object.values(obj)
          .filter(item => item !== undefined)
          .map((item: any): TreeNode => {
            const nodeId = item.id;
            const isNodeExpanded = expandedNodes.get(nodeId);
            
            // Auto-expand first level when no explicit expansion state is saved
            const shouldAutoExpand = isNodeExpanded === undefined && level < 1;
            
            if (item.type === "directory") {
              const children = convertToTreeNodes(item.children, level + 1);
              return {
                id: nodeId,
                name: item.name,
                path: item.path,
                type: "directory" as const,
                children: children,
                isExpanded: isNodeExpanded !== undefined ? isNodeExpanded : shouldAutoExpand,
                depth: level,
              };
            }
            
            return {
              id: nodeId,
              name: item.name,
              path: item.path,
              type: "file" as const,
              fileData: item.fileData,
              depth: level,
            };
          });
        
        return nodes;
      };
      
      // Convert with timeout protection
      let result = convertToTreeNodes(fileMap);
      
      // Apply sorting recursively
      result = sortNodesRecursively(result);
      
      return result;
        
    } catch (error) {
      console.error('Error building file tree:', error);
      return [];
    }
  }, [expandedNodes, sortNodesRecursively]);

  // Set up the effect for building the file tree with debouncing and cleanup
  useEffect(() => {
    if (!allFiles || allFiles.length === 0) {
      setFileTree([]);
      isBuildingTreeRef.current = false;
      return;
    }
    
    // Skip if we're already building a tree
    if (isBuildingTreeRef.current) {
      console.log('Tree building in progress, skipping...');
      return;
    }
    
    // Clear any existing timeout
    if (buildTimeoutRef.current) {
      clearTimeout(buildTimeoutRef.current);
      buildTimeoutRef.current = null;
    }
    
    let isCurrentBuild = true;
    const buildId = Math.random().toString(36).substring(2, 9); // Unique ID for logging
    
    const buildTreeWithDebounce = async () => {
      try {
        isBuildingTreeRef.current = true;
        console.log(`Starting tree build ${buildId}...`);
        
        // Safety timeout to prevent tree building from hanging
        const timeoutPromise = new Promise<TreeNode[]>((_, reject) => {
          buildTimeoutRef.current = setTimeout(() => {
            console.warn(`Tree build ${buildId} timed out after ${TREE_BUILD_TIMEOUT}ms`);
            reject(new Error('Tree build timed out'));
          }, TREE_BUILD_TIMEOUT);
        });
        
        // Actual tree building process
        const buildPromise = buildFileTree(allFiles, selectedFolder || "");
        
        // Race between timeout and completion
        const result = await Promise.race([timeoutPromise, buildPromise]);
        
        // Only update if this is still the current build and we have a valid result
        if (isCurrentBuild && result) {
          setFileTree(result);
          console.log(`Tree build ${buildId} completed successfully with ${result.length} root nodes`);
        }
      } catch (error) {
        console.error(`Tree build ${buildId} failed:`, error);
        if (isCurrentBuild) {
          setFileTree([]);
        }
      } finally {
        if (isCurrentBuild) {
          isBuildingTreeRef.current = false;
          if (buildTimeoutRef.current) {
            clearTimeout(buildTimeoutRef.current);
            buildTimeoutRef.current = null;
          }
        }
      }
    };
    
    // Debounce the tree build to avoid unnecessary work during rapid state changes
    const timeoutId = setTimeout(buildTreeWithDebounce, DEBOUNCE_DELAY);
    
    return () => {
      isCurrentBuild = false;
      clearTimeout(timeoutId);
      if (buildTimeoutRef.current) {
        clearTimeout(buildTimeoutRef.current);
        buildTimeoutRef.current = null;
      }
      console.log(`Cleaning up tree build ${buildId}`);
    };
  }, [allFiles, selectedFolder, buildFileTree]);

  // Handle opening the ignore patterns modal
  const handleOpenIgnorePatterns = async (isGlobal = false) => {
    try {
      setIgnoreGlobal(isGlobal);
      setIgnoreModalOpen(true);
      
      // Ensure we have patterns loaded
      if (isGlobal) {
        await loadPatterns(true);
      } else {
        await loadPatterns(false);
      }
    } catch (error) {
      console.error('Error opening ignore patterns modal:', error);
      // Reset modal state on error
      setIgnoreModalOpen(false);
    }
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
    if (!window.electron) return;
    
    // Determine whether to reset global or local patterns based on the active tab
    const isGlobal = ignoreGlobal;
    const folderPath = isGlobal ? undefined : selectedFolder;
    
    if (resetIgnorePatterns) {
      await resetIgnorePatterns(isGlobal, folderPath || '');
    }
    
    // Reload patterns after reset
    await loadPatterns(isGlobal);
  }, [selectedFolder, loadPatterns, ignoreGlobal, resetIgnorePatterns]);

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
    return allFiles.filter(file => file.excluded).length;
  };

  // Handle sort change events
  const handleSortChange = (newSortOrder: SortOrder) => {
    // Pass the sort order change back to the parent component
    if (fileTreeSortOrder !== newSortOrder) {
      // We need to handle this in the App component, not locally
      if (onSortOrderChange) {
        onSortOrderChange(newSortOrder);
      }
    }
  };

  return (
    <div className={styles.sidebar} style={{ width: `${sidebarWidth}px` }}>
      <FileTreeHeader 
        onOpenFolder={openFolder}
        onSortChange={handleSortChange}
        onClearSelection={onClearSelectionClick || clearSelection}
        onRemoveAllFolders={onRemoveAllFoldersClick || removeAllFolders}
        onReloadFileTree={reloadFolder}
        onOpenIgnorePatterns={() => handleOpenIgnorePatterns(false)}
        excludedFilesCount={countExcludedFiles()}
        currentSortOrder={fileTreeSortOrder}
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
            {memoizedFlattenedTree.length > 0 ? (
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
        globalIgnorePatterns={globalIgnorePatterns}
        localIgnorePatterns={localIgnorePatterns}
        localFolderPath={selectedFolder || ""}
        processingStatus={{ status: "idle", message: "" }}
        saveIgnorePatterns={async (patterns, isGlobal, folderPath) => {
          await Promise.resolve(saveIgnorePatterns(patterns, isGlobal, folderPath || ""));
        }}
        resetIgnorePatterns={async (isGlobal, folderPath) => {
          if (resetIgnorePatterns) {
            await Promise.resolve(resetIgnorePatterns(isGlobal, folderPath || ""));
          }
        }}
        clearIgnorePatterns={async (folderPath) => {
          await Promise.resolve(clearIgnorePatterns(folderPath));
        }}
        systemIgnorePatterns={systemIgnorePatterns}
        recentFolders={getAvailableFolders()}
        systemPatternCategories={{
          versionControl: ["**/.git/**", "**/.svn/**", "**/.hg/**"],
          buildFiles: ["**/dist/**", "**/build/**", "**/.output/**"],
          mediaFiles: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"],
          documentation: ["**/*.pdf", "**/*.doc", "**/*.docx"],
          dependencies: ["**/node_modules/**", "**/__pycache__/**", "**/venv/**"]
        }}
      />
    </div>
  );
};

export default Sidebar;