import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SidebarProps, TreeNode, SortOrder, FileData } from "../types/FileTypes";
import TreeItem from "./TreeItem";
import FileTreeHeader from "./FileTreeHeader";
import IgnorePatterns from "./IgnorePatterns"; // Keep import if modal is triggered here
import { FolderPlus } from "lucide-react";
import { Button } from "./ui";
import SearchBar from "./SearchBar";
import styles from "./Sidebar.module.css";
import { normalizePath } from "../utils/pathUtils"; // Import normalizePath

// Define the structure for pattern state passed from App
interface IgnorePatternsState {
  patterns: string;
  excludedSystemPatterns: string[];
}

// Extend the existing SidebarProps from FileTypes
interface ExtendedSidebarProps extends SidebarProps {
  reloadFolder: () => void;
  clearSelection: () => void; // Used by FileTreeHeader -> Dropdown
  removeAllFolders: () => void; // Used by FileTreeHeader -> Dropdown
  // Ignore pattern related props passed down from App
  loadIgnorePatterns: (folderPath: string, isGlobal?: boolean) => Promise<void>; // Changed return type
  saveIgnorePatterns: (patterns: string, isGlobal: boolean, folderPath?: string) => Promise<void>;
  resetIgnorePatterns: (isGlobal: boolean, folderPath?: string) => Promise<void>; // Changed prop name to match App
  systemIgnorePatterns: string[];
  clearIgnorePatterns: (folderPath: string) => Promise<void>; // Changed prop name to match App
  onClearSelectionClick: () => void; // Keep for dialog trigger
  onRemoveAllFoldersClick: () => void; // Keep for dialog trigger
  onResetPatternsClick: (isGlobal: boolean, folderPath: string) => void; // Prop to trigger dialog in App
  fileTreeSortOrder?: SortOrder;
  onSortOrderChange?: (newSortOrder: SortOrder) => void;
  // New props for controlled IgnorePatterns modal
  globalPatternsState: IgnorePatternsState;
  localPatternsState: IgnorePatternsState;
  onExcludedSystemPatternsChange: (patterns: string[]) => void;
}

// Debounce delay in ms
const DEBOUNCE_DELAY = 250; // Slightly increased debounce

// Use a timeout to prevent infinite tree building loops
const TREE_BUILD_TIMEOUT = 7000; // Increased timeout

const Sidebar: React.FC<ExtendedSidebarProps> = ({
  selectedFolder,
  openFolder,
  allFiles, // Contains only metadata now
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
  clearSelection, // Renamed prop from App
  removeAllFolders, // Renamed prop from App
  loadIgnorePatterns,
  saveIgnorePatterns,
  resetIgnorePatterns, // Prop for triggering App's reset logic (via confirmation)
  systemIgnorePatterns,
  clearIgnorePatterns, // Prop for triggering App's clear logic (via confirmation)
  onClearSelectionClick, // Prop to trigger confirmation dialog in App
  onRemoveAllFoldersClick, // Prop to trigger confirmation dialog in App
  onResetPatternsClick, // Prop to trigger confirmation dialog in App
  fileTreeSortOrder,
  onSortOrderChange,
  // Pass through new props for IgnorePatterns
  globalPatternsState,
  localPatternsState,
  onExcludedSystemPatternsChange,
}) => {
  const [fileTree, setFileTree] = useState<TreeNode[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);

  // State for ignore patterns modal visibility
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);

  const MIN_SIDEBAR_WIDTH = 200;
  const MAX_SIDEBAR_WIDTH = 600; // Increased max width slightly

  // Refs
  const isBuildingTreeRef = useRef(false);
  const buildTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // const lastSelectedFilesRef = useRef<string[]>([]); // Maybe not needed

  // useEffect(() => { lastSelectedFilesRef.current = selectedFiles; }, [selectedFiles]); // Maybe not needed

  // Helper: Flatten tree (Iterative)
  const flattenTree = useCallback((nodes: TreeNode[]): TreeNode[] => {
    const result: TreeNode[] = [];
    const stack: TreeNode[] = [...nodes].reverse(); // Use reverse for depth-first correct order

    while (stack.length > 0) {
        const node = stack.pop(); // Get the last node
        if (!node) continue;

        result.push(node);

        // If expanded and has children, add children to the stack (in reverse order to process them correctly)
        if (node.type === "directory" && node.isExpanded && node.children?.length) {
            // Add children in reverse order so they are popped in the correct order
            for (let i = node.children.length - 1; i >= 0; i--) {
                 stack.push(node.children[i]);
            }
        }
    }
    return result;
  }, []);


  // Helper: Filter tree (no changes needed)
  const filterTree = useCallback((nodes: TreeNode[], term: string): TreeNode[] => {
     if (!term) return nodes;
     const lowerTerm = term.toLowerCase();
     const hasMatch = (node: TreeNode): boolean => {
        if (node.name.toLowerCase().includes(lowerTerm)) return true;
        return node.type === "directory" && !!node.children?.some(hasMatch);
     };
     const filterNode = (node: TreeNode): TreeNode | null => {
        if (!hasMatch(node)) return null;
        if (node.type === "file") return node;
        if (node.type === "directory") {
            const filteredChildren = node.children?.map(filterNode).filter((n): n is TreeNode => n !== null) || [];
             if (node.name.toLowerCase().includes(lowerTerm) || filteredChildren.length > 0) {
                 return { ...node, isExpanded: true, children: filteredChildren };
             }
             return null;
        }
        return null;
     };
     return nodes.map(filterNode).filter((n): n is TreeNode => n !== null);
  }, []);

  const memoizedFilteredTree = useMemo(() => {
    return searchTerm ? filterTree(fileTree, searchTerm) : fileTree;
  }, [fileTree, searchTerm, filterTree]);

  const memoizedFlattenedTree = useMemo(() => {
    return flattenTree(memoizedFilteredTree);
  }, [memoizedFilteredTree, flattenTree]);

  // Resize handlers (no changes needed)
  const handleResizeStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsResizing(true);
  }, []);
  useEffect(() => {
    const handleResize = (e: globalThis.MouseEvent) => {
      if (isResizing) {
        const newWidth = Math.max(MIN_SIDEBAR_WIDTH, Math.min(e.clientX, MAX_SIDEBAR_WIDTH));
        setSidebarWidth(newWidth);
      }
    };
    const handleResizeEnd = () => setIsResizing(false);
    if (isResizing) {
        document.addEventListener("mousemove", handleResize);
        document.addEventListener("mouseup", handleResizeEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [isResizing]); // MAX_SIDEBAR_WIDTH removed as it's constant

  // --- Tree Sorting Logic ---
  const sortFileTreeNodes = useCallback((nodes: TreeNode[]): TreeNode[] => {
    if (!nodes) return [];
    return [...nodes].sort((a, b) => {
      if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
      const order = fileTreeSortOrder || "name-ascending"; // Default sort
      const [key, dir] = order.split('-');
      let comparison = 0;
      // Use optional chaining and default values safely
      const aVal = key === 'tokens' ? (a.fileData?.tokenCount ?? 0) : key === 'date' ? (a.fileData?.lastModified ?? 0) : a.name;
      const bVal = key === 'tokens' ? (b.fileData?.tokenCount ?? 0) : key === 'date' ? (b.fileData?.lastModified ?? 0) : b.name;

      if (typeof aVal === 'string' && typeof bVal === 'string') comparison = aVal.localeCompare(bVal);
      else if (typeof aVal === 'number' && typeof bVal === 'number') comparison = aVal - bVal;

      return dir === 'ascending' ? comparison : -comparison;
    });
  }, [fileTreeSortOrder]);

  const sortNodesRecursively = useCallback((nodes: TreeNode[]): TreeNode[] => {
    if (!nodes) return [];
    const sorted = sortFileTreeNodes(nodes);
    return sorted.map(node =>
      node.type === 'directory' && node.children
        ? { ...node, children: sortNodesRecursively(node.children) }
        : node
    );
  }, [sortFileTreeNodes]);

  // --- Tree Building Logic ---
  const buildFileTree = useCallback((files: FileData[], rootFolder: string): TreeNode[] => {
     if (!files || files.length === 0 || !rootFolder) return [];
     const fileMap: Record<string, any> = {};
     const normalizedRoot = normalizePath(rootFolder); // Normalize root path once

     files.forEach(file => {
        const normalizedPath = normalizePath(file.path);
        // Basic check if the path starts with the root. More robust checks might be needed for edge cases like symlinks outside root.
        if (!normalizedPath.startsWith(normalizedRoot)) {
            // console.warn(`File path ${normalizedPath} does not start with root ${normalizedRoot}, skipping.`);
            return; // Skip files not strictly within the root
        }


        const relativePath = normalizedPath.substring(normalizedRoot.length).replace(/^[/\\]/, '');
        if (!relativePath) return; // Skip root itself if listed

        const parts = relativePath.split(/[/\\]/);
        let currentLevel = fileMap;
        let currentPath = normalizedRoot;

        parts.forEach((part, index) => {
          // Handle cases where part might be empty string if there are multiple slashes
          if (!part) return;

          currentPath += '/' + part;
          const isLastPart = index === parts.length - 1;
          if (!currentLevel[part]) {
            currentLevel[part] = {
              name: part,
              path: currentPath,
              id: currentPath, // Use path as unique ID
              type: isLastPart ? "file" : "directory",
              children: {},
              fileData: isLastPart ? file : undefined, // Assign metadata only to file nodes
            };
          }
           // Ensure directory type if intermediate part already exists as file (edge case)
          if (!isLastPart && currentLevel[part].type === 'file') {
              console.warn(`Path conflict: ${currentPath} exists as both file and directory. Treating as directory.`);
              currentLevel[part].type = 'directory';
              currentLevel[part].fileData = undefined; // Remove file data if it's actually a dir
              if (!currentLevel[part].children) { // Ensure children object exists
                  currentLevel[part].children = {};
              }
          }
          // Ensure we move down the tree correctly, even if fixing type conflict
          currentLevel = currentLevel[part].children;
        });
     });

     const convertToNodes = (obj: Record<string, any>, depth = 0): TreeNode[] => {
        return Object.values(obj).map((item: any): TreeNode => {
          const nodeId = item.id;
          // Check expanded state from the map passed via props
          const isExpanded = expandedNodes.get(nodeId) ?? (depth < 1); // Auto-expand first level
          if (item.type === "directory") {
            return {
              ...item, // Spread existing item properties
              children: convertToNodes(item.children || {}, depth + 1), // Ensure children is an object
              isExpanded: isExpanded,
              depth: depth,
              fileData: undefined, // Explicitly remove fileData for directories
            };
          }
          // For files, fileData is already assigned during map creation
          return { ...item, depth: depth, children: undefined }; // Explicitly remove children for files
        });
     };

     const tree = convertToNodes(fileMap);
     return sortNodesRecursively(tree); // Sort after building

  }, [expandedNodes, sortNodesRecursively]); // Dependencies: expandedNodes, sortNodesRecursively

  // Effect to build tree
  useEffect(() => {
    if (!allFiles || !selectedFolder) {
      setFileTree([]);
      return;
    }
    if (isBuildingTreeRef.current) {
        console.log("Tree build already in progress, skipping new request.");
        return; // Prevent multiple concurrent builds
    }

    isBuildingTreeRef.current = true;
    if (buildTimeoutRef.current) clearTimeout(buildTimeoutRef.current);

    const buildId = Math.random().toString(36).substring(2, 9);
    console.log(`Scheduling tree build ${buildId}...`);

    const buildWork = () => {
        console.log(`Starting tree build ${buildId}...`);
        // Use Promise.resolve().then() to ensure async break and prevent blocking UI
        Promise.resolve().then(() => {
            try {
                // Safety check: limit number of files processed if necessary
                const filesToProcess = allFiles.length > 10000 ? allFiles.slice(0, 10000) : allFiles;
                if (allFiles.length > 10000) {
                    console.warn(`Processing only the first 10,000 files out of ${allFiles.length} due to performance limits.`);
                }
                const newTree = buildFileTree(filesToProcess, selectedFolder);
                setFileTree(newTree);
                console.log(`Tree build ${buildId} completed.`);
            } catch (error) {
                console.error(`Tree build ${buildId} failed:`, error);
                setFileTree([]); // Reset on error
            } finally {
                isBuildingTreeRef.current = false;
                // Clear timeout reference only if it matches the one we set
                if (buildTimeoutRef.current === timeoutId) {
                    buildTimeoutRef.current = null;
                }
            }
        }).catch(error => {
            // Catch errors from the Promise itself (less likely here)
             console.error(`Error in tree build Promise ${buildId}:`, error);
             isBuildingTreeRef.current = false;
             if (buildTimeoutRef.current === timeoutId) {
                buildTimeoutRef.current = null;
             }
        });
    };

     // Set timeout for actual work
    const timeoutId = setTimeout(buildWork, DEBOUNCE_DELAY);
    buildTimeoutRef.current = timeoutId; // Store timeout ID

    return () => {
      console.log(`Cleaning up tree build ${buildId}`);
      clearTimeout(timeoutId);
      // Reset flag only if this cleanup corresponds to the currently running/scheduled build
      if (buildTimeoutRef.current === timeoutId) {
          isBuildingTreeRef.current = false; // Ensure flag is reset if component unmounts or effect re-runs
          buildTimeoutRef.current = null;
      }
    };
  }, [allFiles, selectedFolder, buildFileTree]); // Rebuild when files or folder change

  // --- Ignore Patterns Modal ---
  const handleOpenIgnorePatterns = useCallback(() => {
    setIgnoreModalOpen(true);
  }, []);


  // Get available folders (memoized)
  const getAvailableFolders = useMemo(() => {
    const folders = new Set<string>();
    const rootPath = selectedFolder ? normalizePath(selectedFolder) : null;
    if (!rootPath) return [];

    // Use a map for potentially faster lookups if allFiles is huge
    const filePaths = allFiles.map(f => normalizePath(f.path));

    filePaths.forEach(normPath => {
        // Ensure path comparison is robust
        if (normPath.startsWith(rootPath + '/') || normPath === rootPath) {
            const parts = normPath.substring(rootPath.length).split('/').filter(p => p);
            let currentSubPath = rootPath;
            // Iterate up to the parent directory of the file
            for (let i = 0; i < parts.length - 1; i++) {
                currentSubPath += '/' + parts[i];
                folders.add(currentSubPath);
            }
        }
    });
     // Add the root folder itself
    folders.add(rootPath);
    return Array.from(folders).sort(); // Sort for consistent display
  }, [allFiles, selectedFolder]);

  // Count excluded files (memoized)
  const countExcludedFiles = useMemo(() => {
    // Check the 'excluded' flag set by the main process based on combined patterns
    return allFiles.filter(file => file.excluded === true).length;
  }, [allFiles]);

  // Handle sort change - Call prop passed from App
  const handleSortChange = useCallback((newSortOrder: SortOrder) => {
    if (onSortOrderChange) {
      onSortOrderChange(newSortOrder);
    }
  }, [onSortOrderChange]);

  return (
    <div className={styles.sidebar} style={{ width: `${sidebarWidth}px` }}>
      <FileTreeHeader
        onOpenFolder={openFolder}
        onSortChange={handleSortChange}
        onClearSelection={onClearSelectionClick} // Use prop for dialog trigger
        onRemoveAllFolders={onRemoveAllFoldersClick} // Use prop for dialog trigger
        onReloadFileTree={reloadFolder}
        onOpenIgnorePatterns={handleOpenIgnorePatterns} // Opens the modal
        excludedFilesCount={countExcludedFiles}
        currentSortOrder={fileTreeSortOrder}
      />

      {selectedFolder ? (
        <>
          <div className={styles.sidebarSearch}>
            <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
          </div>
          <div className={styles.sidebarActions}>
            <Button variant="secondary" size="sm" onClick={selectAllFiles}> Select All </Button>
            <Button variant="secondary" size="sm" onClick={deselectAllFiles}> Deselect All </Button>
          </div>
          <div className={styles.fileTree}>
            {isBuildingTreeRef.current ? (
               <div className={styles.treeLoading}><div className={styles.spinner}></div>Building tree...</div>
            ) : memoizedFlattenedTree.length > 0 ? (
              memoizedFlattenedTree.map((node) => (
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
              <div className={styles.treeEmpty}>
                {searchTerm ? "No files match search." : "No files found or folder is empty."}
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

      <div className={styles.sidebarResizeHandle} onMouseDown={handleResizeStart} title="Resize sidebar" />

      {/* Ignore Patterns Modal - Renders based on ignoreModalOpen state */}
      {ignoreModalOpen && (
        <IgnorePatterns
          isOpen={ignoreModalOpen}
          onClose={() => setIgnoreModalOpen(false)}
          // Pass full state objects from App
          globalPatternsState={globalPatternsState}
          localPatternsState={localPatternsState}
          localFolderPath={selectedFolder || ""}
          // Pass callbacks from App
          saveIgnorePatterns={saveIgnorePatterns}
          resetIgnorePatterns={onResetPatternsClick} // Pass the DIALOG TRIGGER prop
          clearIgnorePatterns={clearIgnorePatterns} // Pass clear function trigger
          onExcludedSystemPatternsChange={onExcludedSystemPatternsChange} // Pass handler to update App state
          systemIgnorePatterns={systemIgnorePatterns}
          recentFolders={getAvailableFolders} // Pass memoized folders
          // processingStatus prop can be added if needed from App
        />
      )}
    </div>
  );
};

export default Sidebar;