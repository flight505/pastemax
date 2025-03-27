import React, { useState, useEffect, useCallback, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import FileList from "./components/FileList";
import UserInstructions from "./components/UserInstructions";
import ControlContainer from "./components/ControlContainer";
import { FileData, FileTreeMode, SortOrder } from "./types/FileTypes";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import { generateAsciiFileTree, normalizePath, arePathsEqual } from "./utils/pathUtils";
import { Github, Loader2, Check, AlertTriangle } from "lucide-react";
import styles from "./App.module.css";
import { Dropdown } from "./components/ui";
import { ConfirmationDialog } from "./components/ui/ConfirmationDialog";
import { Button } from "./components/ui/Button";
import { getSortIcon } from "./utils/sortIcons";
// Import utilities from patternUtils
import { SYSTEM_PATTERN_CATEGORIES, parseIgnorePatternsContent, IgnorePatternsState } from "./utils/patternUtils";

// Access the electron API from the window object
declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: (channel: string, data?: any) => void;
        on: (channel: string, func: (...args: any[]) => void) => void;
        removeListener: (
          channel: string,
          func: (...args: any[]) => void
        ) => void;
        invoke: (channel: string, data?: any) => Promise<any>;
        setMaxListeners?: (n: number) => void;
      };
    };
  }
}

// Keys for localStorage
const STORAGE_KEYS = {
  SELECTED_FOLDER: "pastemax-selected-folder",
  SELECTED_FILES: "pastemax-selected-files",
  SORT_ORDER: "pastemax-sort-order",
  SEARCH_TERM: "pastemax-search-term",
  EXPANDED_NODES: "pastemax-expanded-nodes",
  GLOBAL_IGNORE_PATTERNS: "pastemax-global-ignore-patterns-v2", // Added version suffix
};

// Default system patterns as fallback if not provided by main process
const DEFAULT_SYSTEM_PATTERNS = [
  // Combine categories into one list for default state
  ...SYSTEM_PATTERN_CATEGORIES.versionControl,
  ...SYSTEM_PATTERN_CATEGORIES.buildOutput,
  ...SYSTEM_PATTERN_CATEGORIES.caches,
  ...SYSTEM_PATTERN_CATEGORIES.logs,
  ...SYSTEM_PATTERN_CATEGORIES.ide,
  ...SYSTEM_PATTERN_CATEGORIES.temp,
  ...SYSTEM_PATTERN_CATEGORIES.os,
  // Other common defaults
  "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.ico",
  "**/*.webp", "**/*.svg", "**/*.pdf", "**/*.zip", "**/*.tar.gz",
  "**/*.tgz", "**/*.rar", "**/*.7z", "**/*.mp4", "**/*.mov",
  "**/*.avi", "**/*.mkv", "**/*.mp3", "**/*.wav", "**/*.flac",
  "**/*.sqlite", "**/*.db", "**/*.sql",
  "**/*.doc", "**/*.docx", "**/*.xls", "**/*.xlsx", "**/*.ppt", "**/*.pptx",
  "**/*.iso", "**/*.bin", "**/*.exe", "**/*.dll", "**/*.so", "**/*.dylib",
  "**/*.min.js", "**/*.min.css",
];

const App = () => {
  // Load initial state from localStorage if available
  const savedFolder = localStorage.getItem(STORAGE_KEYS.SELECTED_FOLDER);
  const savedFiles = localStorage.getItem(STORAGE_KEYS.SELECTED_FILES);
  const savedExpandedNodes = localStorage.getItem(STORAGE_KEYS.EXPANDED_NODES);
  const savedShowInstructions = localStorage.getItem('pastemax-show-instructions');

  // State for user interface controls
  const [showUserInstructions, setShowUserInstructions] = useState(savedShowInstructions !== 'false');
  const [fileTreeMode, setFileTreeMode] = useState<FileTreeMode>('complete');

  // Initialize expanded nodes from localStorage if available
  const initialExpandedNodes = useMemo(() => {
    const map = new Map<string, boolean>();
    if (savedExpandedNodes) {
      try {
        const parsedNodes = JSON.parse(savedExpandedNodes);
        if (Array.isArray(parsedNodes)) {
          parsedNodes.forEach(([key, value]) => {
            if (typeof key === 'string' && typeof value === 'boolean') {
              map.set(key, value);
            }
          });
        }
      } catch (error) {
        console.error("Error parsing saved expanded nodes:", error);
      }
    }
    return map;
  }, [savedExpandedNodes]);

  const [selectedFolder, setSelectedFolder] = useState<string | null>(savedFolder);
  const [allFiles, setAllFiles] = useState<Omit<FileData, 'content'>[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>(
    savedFiles ? JSON.parse(savedFiles) : []
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>("name-ascending");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Map<string, boolean>>(initialExpandedNodes);
  const [displayedFiles, setDisplayedFiles] = useState<Omit<FileData, 'content'>[]>([]);
  const [processingStatus, setProcessingStatus] = useState({
    status: "idle",
    message: "",
  } as {
    status: "idle" | "processing" | "complete" | "error";
    message: string;
  });

  const [userInstructions, setUserInstructions] = useState("");
  const [fileTreeSortOrder, setFileTreeSortOrder] = useState<SortOrder>("name-ascending");

  // Centralized state for ignore patterns
  const [globalPatternsState, setGlobalPatternsState] = useState<IgnorePatternsState>({
    patterns: '',
    excludedSystemPatterns: []
  });
  const [localIgnorePatterns, setLocalPatterns] = useState<IgnorePatternsState>({ patterns: '', excludedSystemPatterns: [] }); // Local doesn't have excluded system patterns
  const [systemIgnorePatterns, setSystemIgnorePatterns] = useState<string[]>(DEFAULT_SYSTEM_PATTERNS);

  const isElectron = window.electron !== undefined;

  // --- Persist State Effects ---
  useEffect(() => {
    if (selectedFolder) localStorage.setItem(STORAGE_KEYS.SELECTED_FOLDER, selectedFolder);
    else localStorage.removeItem(STORAGE_KEYS.SELECTED_FOLDER);
  }, [selectedFolder]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_FILES, JSON.stringify(selectedFiles));
  }, [selectedFiles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SORT_ORDER, sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXPANDED_NODES, JSON.stringify(Array.from(expandedNodes.entries())));
    } catch (error) {
      console.error("Error saving expanded nodes:", error);
    }
  }, [expandedNodes]);

  useEffect(() => {
    localStorage.setItem('pastemax-show-instructions', String(showUserInstructions));
  }, [showUserInstructions]);

  // Persist global ignore patterns state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GLOBAL_IGNORE_PATTERNS, JSON.stringify(globalPatternsState));
  }, [globalPatternsState]);

  // --- IPC Listeners ---

  // Load initial data from saved folder
  useEffect(() => {
    if (!isElectron || !selectedFolder) return;
    const hasLoadedInitialData = sessionStorage.getItem("hasLoadedInitialData");
    if (hasLoadedInitialData === "true") return;
    console.log("Loading saved folder on startup:", selectedFolder);
    setProcessingStatus({ status: "processing", message: "Loading files..." });
    window.electron.ipcRenderer.send("request-file-list", selectedFolder);
    sessionStorage.setItem("hasLoadedInitialData", "true");
  }, [isElectron, selectedFolder]); // Keep dependency

  // Listen for folder selection and file list data
  useEffect(() => {
    if (!isElectron) return;

    const handleFolderSelected = (folderPath: string) => {
      if (typeof folderPath === "string") {
        console.log("Folder selected:", folderPath);
        setSelectedFolder(folderPath);
        setSelectedFiles([]);
        setAllFiles([]); // Clear previous files immediately
        setDisplayedFiles([]);
        setLocalPatterns({ patterns: '', excludedSystemPatterns: [] }); // Reset local patterns
        setProcessingStatus({ status: "processing", message: "Requesting file list..." });
        window.electron.ipcRenderer.send("request-file-list", folderPath);
      } else {
        console.error("Invalid folder path received:", folderPath);
        setProcessingStatus({ status: "error", message: "Invalid folder path" });
      }
    };

    // Updated to handle metadata only
    const handleFileListData = (filesMetadata: Omit<FileData, 'content'>[]) => {
      console.log("Received file list metadata:", filesMetadata.length, "files");
      if (filesMetadata.length === 1 && filesMetadata[0].isAppDirectory) {
        console.log("Detected app directory selection");
        setAllFiles([]); setSelectedFiles([]); setDisplayedFiles([]);
        setProcessingStatus({ status: "error", message: "Cannot select the application directory" });
        return;
      }

      // Store only metadata, content will be fetched on demand
      setAllFiles(filesMetadata);
      setProcessingStatus({ status: "complete", message: `Loaded ${filesMetadata.length} files` });

      applyFiltersAndSort(filesMetadata, sortOrder, searchTerm); // Apply filters/sort to metadata

      // Auto-select non-binary/non-skipped files
      const selectablePaths = filesMetadata
        .filter(file => !file.isBinary && !file.isSkipped && !file.excluded)
        .map(file => file.path);
      setSelectedFiles(selectablePaths);
    };

    const handleProcessingStatus = (status: { status: "idle" | "processing" | "complete" | "error"; message: string; }) => {
      console.log("Processing status:", status);
      setProcessingStatus(status);
    };

    window.electron.ipcRenderer.on("folder-selected", handleFolderSelected);
    window.electron.ipcRenderer.on("file-list-data", handleFileListData);
    window.electron.ipcRenderer.on("file-processing-status", handleProcessingStatus);

    // Listener for loaded ignore patterns (both global and local)
    const handleIgnorePatternsLoaded = (result: { patterns: string; isGlobal: boolean; systemPatterns?: string[]; folderPath?: string }) => {
        console.log(`IPC: Received ${result.isGlobal ? 'global' : 'local'} patterns loaded event.`);
        const { excludedPatterns, userPatterns } = parseIgnorePatternsContent(result.patterns || '');

        if (result.isGlobal) {
            setGlobalPatternsState({ patterns: userPatterns, excludedSystemPatterns: excludedPatterns });
            if (result.systemPatterns) {
                setSystemIgnorePatterns(result.systemPatterns);
            }
            console.log(`Updated global state: ${userPatterns.split('\n').length} patterns, ${excludedPatterns.length} excluded system.`);
        } else if (result.folderPath === selectedFolder) { // Ensure it's for the current folder
            setLocalPatterns({ patterns: userPatterns, excludedSystemPatterns: [] }); // Local patterns don't manage system excludes
            console.log(`Updated local state for ${result.folderPath}: ${userPatterns.split('\n').length} patterns.`);
        }
    };
    window.electron.ipcRenderer.on("ignore-patterns-loaded", handleIgnorePatternsLoaded);

    return () => {
      window.electron.ipcRenderer.removeListener("folder-selected", handleFolderSelected);
      window.electron.ipcRenderer.removeListener("file-list-data", handleFileListData);
      window.electron.ipcRenderer.removeListener("file-processing-status", handleProcessingStatus);
      window.electron.ipcRenderer.removeListener("ignore-patterns-loaded", handleIgnorePatternsLoaded);
    };
  }, [isElectron, sortOrder, searchTerm, selectedFolder]); // Added selectedFolder dependency for local pattern updates

  // Add ESC key handler
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && processingStatus.status === "processing") {
        console.log("ESC pressed - cancelling directory loading");
        window.electron.ipcRenderer.send("cancel-directory-loading");
      }
    };
    if (processingStatus.status === "processing") {
      window.addEventListener("keydown", handleEscKey);
      return () => window.removeEventListener("keydown", handleEscKey);
    }
  }, [processingStatus.status]);

  // --- Core Functions ---

  const openFolder = () => {
    if (isElectron) {
      console.log("Opening folder dialog");
      setProcessingStatus({ status: "idle", message: "Select a folder..." });
      window.electron.ipcRenderer.send("open-folder");
    } else {
      console.warn("Folder selection not available in browser");
    }
  };

  // Status message renderer
  const renderStatusMessage = () => {
    if (!processingStatus || processingStatus.status === 'idle') {
      return null;
    }

    let statusClass = styles.statusMessage; // Assuming this base class exists
    let statusIcon = null;
    let statusText = '';

    // Define styles for different statuses if they don't exist in CSS modules
    const statusStyles: { [key: string]: React.CSSProperties } = {
        processing: { backgroundColor: 'lightblue', color: 'black', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' },
        complete: { backgroundColor: 'lightgreen', color: 'black', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' },
        error: { backgroundColor: 'lightcoral', color: 'black', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' },
        idle: { display: 'none' }
    };


    switch (processingStatus.status) {
      case 'processing':
        statusClass += ` ${styles.processing}`; // Use CSS module if available
        statusIcon = <Loader2 size={16} className="animate-spin" />;
        statusText = processingStatus.message || 'Processing...';
        break;
      case 'complete':
        statusClass += ` ${styles.complete}`; // Use CSS module if available
        statusIcon = <Check size={16} />;
        statusText = processingStatus.message || 'Complete';
        // Optional: Hide success message after a delay
        setTimeout(() => setProcessingStatus({ status: 'idle', message: '' }), 3000);
        break;
      case 'error':
        statusClass += ` ${styles.error}`; // Use CSS module if available
        statusIcon = <AlertTriangle size={16} />;
        statusText = processingStatus.message || 'Error';
        break;
      default:
        return null; // Don't render for idle
    }

    // Use inline styles as fallback if CSS Modules aren't defined for these
    const currentStyle = statusStyles[processingStatus.status] || {};

    return (
      <div style={currentStyle} className={statusClass}>
        {statusIcon && <span style={{ marginRight: '8px' }}>{statusIcon}</span>}
        {statusText}
      </div>
    );
  };

  // Apply filters and sorting (Lint fixes applied)
  const applyFiltersAndSort = useCallback((files: Omit<FileData, 'content'>[], sort: SortOrder, filter: string) => {
    let filtered = files;
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      filtered = files.filter(file =>
        file.name.toLowerCase().includes(lowerFilter) ||
        file.path.toLowerCase().includes(lowerFilter)
      );
    }

    const [sortKey, sortDir] = sort.split("-");

    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      // Moved declarations outside switch
      const aTokens = typeof a.tokenCount === 'number' ? a.tokenCount : 0;
      const bTokens = typeof b.tokenCount === 'number' ? b.tokenCount : 0;
      const aDate = a.lastModified || 0;
      const bDate = b.lastModified || 0;

      switch (sortKey) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "tokens":
          comparison = aTokens - bTokens;
          break;
        case "date":
          comparison = Number(aDate) - Number(bDate);
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }
      return sortDir === "ascending" ? comparison : -comparison;
    });

    setDisplayedFiles(sorted);
  }, []); // Add empty dependency array as it doesn't depend on component state/props

  // Re-run applyFiltersAndSort when relevant state changes
  useEffect(() => {
    applyFiltersAndSort(allFiles as Omit<FileData, 'content'>[], sortOrder, searchTerm);
  }, [allFiles, sortOrder, searchTerm, applyFiltersAndSort]); // applyFiltersAndSort is stable and doesn't depend on state

  // Toggle file selection
  const toggleFileSelection = useCallback((filePath: string) => {
    const normalizedPath = normalizePath(filePath);
    setSelectedFiles(prevSelected => {
      const isSelected = prevSelected.some(path => arePathsEqual(path, normalizedPath));
      return isSelected
        ? prevSelected.filter(path => !arePathsEqual(path, normalizedPath))
        : [...prevSelected, normalizedPath];
    });
  }, []); // Add empty dependency array

  // Select all non-excluded files
  const selectAllFiles = useCallback(() => {
    const filesToSelect = allFiles
      .filter(file => !file.isBinary && !file.isSkipped && !file.excluded)
      .map(file => file.path);
    setSelectedFiles(filesToSelect); // Directly set, no need to merge if it's 'select all'
  }, [allFiles]);

  // Deselect all files
  const deselectAllFiles = useCallback(() => {
    setSelectedFiles([]);
  }, []);

  // Toggle folder selection
  const toggleFolderSelection = useCallback((folderPath: string, shouldBeSelected: boolean) => {
    if (!folderPath) return;
    const normalizedFolderPath = normalizePath(folderPath);

    setSelectedFiles(prev => {
      const newSelectionSet = new Set(prev);
      allFiles.forEach(file => {
        const normalizedFilePath = normalizePath(file.path);
        // Check if file is within the target folder (or is the folder itself if files represent folders)
        if (normalizedFilePath.startsWith(normalizedFolderPath + '/') || normalizedFilePath === normalizedFolderPath) {
           // Only modify selection for non-binary, non-skipped, non-excluded files
           if (!file.isBinary && !file.isSkipped && !file.excluded) {
                if (shouldBeSelected) {
                    newSelectionSet.add(file.path);
                } else {
                    newSelectionSet.delete(file.path);
                }
           }
        }
      });
      return Array.from(newSelectionSet);
    });
  }, [allFiles]); // Depends on allFiles

  // Handle sort change
  const handleSortChange = useCallback((value: string | string[]) => {
    if (typeof value === 'string') {
      setSortOrder(value as SortOrder);
      // applyFiltersAndSort will be triggered by the useEffect watching sortOrder
    }
  }, []); // Add empty dependency array

  // Handle search change
  const handleSearchChange = useCallback((newSearch: string) => {
    setSearchTerm(newSearch);
     // applyFiltersAndSort will be triggered by the useEffect watching searchTerm
  }, []); // Add empty dependency array

  // Calculate total tokens (Memoized)
  const totalTokens = useMemo(() => { // Renamed to avoid conflict
    const fileMap = new Map(allFiles.map(f => [f.path, f.tokenCount]));
    return selectedFiles.reduce((total, path) => {
      return total + (fileMap.get(path) || 0);
    }, 0);
  }, [selectedFiles, allFiles]);

  // --- Moved reloadFolder definition earlier ---
  const reloadFolder = useCallback(() => {
    if (isElectron && selectedFolder) {
      console.log(`Reloading folder: ${selectedFolder}`);
      setProcessingStatus({ status: "processing", message: "Reloading files..." });
      setAllFiles([]); // Clear current files
      setDisplayedFiles([]);
      // Optionally reset local patterns state if desired on manual reload
      // setLocalPatterns({ patterns: '', excludedSystemPatterns: [] });
      window.electron.ipcRenderer.send("request-file-list", selectedFolder); // Re-request list
    }
  }, [isElectron, selectedFolder]); // Now defined before other callbacks

  // Get selected files content (Lazy loaded version)
  const getSelectedFilesContent = useCallback(async (): Promise<string> => {
    if (selectedFiles.length === 0) return "No files selected.";

    setProcessingStatus({ status: 'processing', message: `Fetching content for ${selectedFiles.length} files...` });

    try {
      // Fetch content for all selected files concurrently
      const contentPromises = selectedFiles.map(async (filePath) => {
        try {
          const result = await window.electron.ipcRenderer.invoke('get-file-content', filePath);
          // Find the metadata for sorting/header info
          const fileMeta = allFiles.find(f => f.path === filePath);
          return {
              path: filePath,
              content: result.content,
              tokenCount: result.tokenCount, // Assuming token count is returned by handler
              name: fileMeta?.name || filePath, // Fallback name
              lastModified: fileMeta?.lastModified || 0, // For sorting
          };
        } catch (fetchError: unknown) {
            const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown error';
            console.error(`Failed to fetch content for ${filePath}:`, fetchError);
            return { path: filePath, content: `// Error loading file: ${errorMessage}`, tokenCount: 0, name: filePath, lastModified: 0 }; // Placeholder on error
        }
      });

      const filesWithContent = await Promise.all(contentPromises);

      // Sort the fetched files based on the current sortOrder
      const [sortKey, sortDir] = sortOrder.split("-");
      const sortedFiles = filesWithContent.sort((a, b) => {
          let comparison = 0;
          const aTokens = a.tokenCount || 0;
          const bTokens = b.tokenCount || 0;
          const aDate = a.lastModified || 0;
          const bDate = b.lastModified || 0;

          switch (sortKey) {
            case "name": comparison = a.name.localeCompare(b.name); break;
            case "tokens": comparison = aTokens - bTokens; break;
            case "date": comparison = Number(aDate) - Number(bDate); break;
            default: comparison = a.name.localeCompare(b.name);
          }
          return sortDir === "ascending" ? comparison : -comparison;
      });

      // --- Concatenate content (similar to previous logic) ---
      let concatenatedString = "";
      if (fileTreeMode !== "none" && selectedFolder) {
          // Generate tree based on *all* files metadata for context if needed by mode
          const filesForTree = fileTreeMode === "complete" ? allFiles : sortedFiles;
          const asciiTree = generateAsciiFileTree(filesForTree, selectedFolder, fileTreeMode);
          concatenatedString += `<file_map>\n${selectedFolder}\n${asciiTree}\n</file_map>\n\n`;
      }

      sortedFiles.forEach(file => {
        let relativePath = file.path;
        if (selectedFolder && file.path.startsWith(selectedFolder)) {
          relativePath = file.path.substring(selectedFolder.length).replace(/^[/\\]/, '');
        }
        concatenatedString += `\n\n// ---- File: ${relativePath} (${file.tokenCount || 'N/A'} tokens) ----\n\n`;
        concatenatedString += file.content;
      });

      const userInstructionsBlock = userInstructions.trim()
        ? `\n<user_instructions>\n${userInstructions}\n</user_instructions>\n\n`
        : "";

      setProcessingStatus({ status: 'complete', message: 'Content prepared.' });
      return concatenatedString + userInstructionsBlock;

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error("Error getting selected files content:", error);
      setProcessingStatus({ status: 'error', message: 'Failed to prepare content.' });
      return `Error preparing content: ${errorMessage}`;
    }
  }, [selectedFiles, allFiles, sortOrder, fileTreeMode, selectedFolder, userInstructions]);

  // Sort options
  const sortOptions = useMemo(() => [
    { value: "name-ascending", label: "Name (A-Z)" },
    { value: "name-descending", label: "Name (Z-A)" },
    { value: "tokens-ascending", label: "Tokens (Asc)" },
    { value: "tokens-descending", label: "Tokens (Desc)" },
    { value: "date-ascending", label: "Date (Oldest)" },
    { value: "date-descending", label: "Date (Newest)" }
  ], []);

  // Handle expand/collapse state changes
  const toggleExpanded = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newState = new Map(prev);
      newState.set(nodeId, !prev.get(nodeId)); // Simplified toggle
      // Persisted via useEffect watching expandedNodes
      return newState;
    });
  }, []); // Add empty dependency array

  // --- Ignore Pattern Functions ---

  // Load patterns (global or local)
  const loadIgnorePatterns = useCallback(async (folderPath: string, isGlobal: boolean = false): Promise<void> => {
    if (!isElectron) return;
    console.log(`Requesting load for ${isGlobal ? 'global' : 'local'} patterns${!isGlobal ? ` for ${folderPath}` : ''}`);
    try {
        // Invoke expects the handler to exist. The result is handled by the 'ignore-patterns-loaded' listener.
        await window.electron.ipcRenderer.invoke("load-ignore-patterns", { folderPath, isGlobal });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error invoking load-ignore-patterns (${isGlobal ? 'global' : 'local'}): ${errorMessage}`);
        // Set default state on error
        if (isGlobal) {
            setGlobalPatternsState({ patterns: '', excludedSystemPatterns: [] });
            setSystemIgnorePatterns(DEFAULT_SYSTEM_PATTERNS);
        } else if (folderPath === selectedFolder) {
            setLocalPatterns({ patterns: '', excludedSystemPatterns: [] });
        }
    }
}, [isElectron, selectedFolder]); // Dependencies: isElectron, selectedFolder

  // Save patterns (global or local) - Now just calls IPC
  const saveIgnorePatterns = useCallback(async (patterns: string, isGlobal: boolean, folderPath?: string): Promise<void> => {
    if (!isElectron) return;
    const targetPath = folderPath || selectedFolder; // Use provided path or current folder for local
    if (!isGlobal && !targetPath) {
      console.error("Cannot save local patterns without a folder path.");
      setProcessingStatus({ status: "error", message: "No folder selected for local patterns." });
      return;
    }

    setProcessingStatus({ status: "processing", message: `Saving ${isGlobal ? "global" : "local"} patterns...` });

    try {
      // The string passed (`patterns`) should already include `# DISABLED:` comments
      // generated by IgnorePatterns.tsx's handleSaveGlobalPatterns
      const result = await window.electron.ipcRenderer.invoke("save-ignore-patterns", {
        patterns,
        isGlobal,
        folderPath: targetPath
      });

      if (result.success) {
        console.log(`IPC: Save ${isGlobal ? 'global' : 'local'} patterns successful.`);
        setProcessingStatus({ status: "complete", message: "Patterns saved." });

        // Reload the folder data to apply new patterns
        // Add a small delay to ensure file system changes are registered
        setTimeout(() => {
            reloadFolder();
        }, 300);

      } else {
        console.error(`IPC: Save ${isGlobal ? 'global' : 'local'} patterns failed:`, result.error);
        setProcessingStatus({ status: "error", message: `Save failed: ${result.error}` });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error("Error invoking save-ignore-patterns:", error);
      setProcessingStatus({ status: "error", message: `Save failed: ${errorMessage}` });
    }
  }, [isElectron, selectedFolder, reloadFolder]); // Dependency: reloadFolder

  // Reset patterns (global or local)
  const resetIgnorePatterns = useCallback(async (isGlobal: boolean, folderPath?: string): Promise<void> => {
    if (!isElectron) return;
    const targetPath = folderPath || selectedFolder;
    if (!isGlobal && !targetPath) {
      console.error("Cannot reset local patterns without a folder path.");
      setProcessingStatus({ status: "error", message: "No folder selected for local reset." });
      return;
    }

    setProcessingStatus({ status: "processing", message: `Resetting ${isGlobal ? "global" : "local"} patterns...` });

    try {
      const result = await window.electron.ipcRenderer.invoke("reset-ignore-patterns", {
        isGlobal,
        folderPath: targetPath
      });

      if (result.success) {
        console.log(`IPC: Reset ${isGlobal ? 'global' : 'local'} patterns successful.`);
        // Update state *after* success
        if (isGlobal) {
          setGlobalPatternsState({ patterns: '', excludedSystemPatterns: [] }); // Reset global state
        } else {
          setLocalPatterns({ patterns: '', excludedSystemPatterns: [] }); // Reset local state
        }
        setProcessingStatus({ status: "complete", message: "Patterns reset to default." });
        // Reload folder data
        setTimeout(() => {
            reloadFolder();
        }, 300);
      } else {
        console.error(`IPC: Reset ${isGlobal ? 'global' : 'local'} patterns failed:`, result.error);
        setProcessingStatus({ status: "error", message: `Reset failed: ${result.error}` });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error("Error invoking reset-ignore-patterns:", error);
      setProcessingStatus({ status: "error", message: `Reset failed: ${errorMessage}` });
    }
  }, [isElectron, selectedFolder, reloadFolder]); // Dependency: reloadFolder

  // Clear local patterns
  const clearLocalIgnorePatterns = useCallback(async (folderPath: string): Promise<void> => {
    if (!isElectron || !folderPath) return;

    setProcessingStatus({ status: "processing", message: "Clearing local patterns..." });

    try {
      const result = await window.electron.ipcRenderer.invoke("clear-local-ignore-patterns", { folderPath });

      if (result.success) {
        console.log(`IPC: Clear local patterns successful for ${folderPath}.`);
        // Update state *after* success
        if (folderPath === selectedFolder) {
          setLocalPatterns({ patterns: '', excludedSystemPatterns: [] });
        }
        setProcessingStatus({ status: "complete", message: "Local patterns cleared." });
        // Reload folder data
        setTimeout(() => {
            reloadFolder();
        }, 300);
      } else {
        console.error(`IPC: Clear local patterns failed for ${folderPath}:`, result.error);
        setProcessingStatus({ status: "error", message: `Clear failed: ${result.error}` });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error("Error invoking clear-local-ignore-patterns:", error);
      setProcessingStatus({ status: "error", message: `Clear failed: ${errorMessage}` });
    }
  }, [isElectron, selectedFolder, reloadFolder]); // Dependency: reloadFolder


  // --- Dialog State & Handlers ---
  const [showClearSelectionDialog, setShowClearSelectionDialog] = useState(false);
  const [showRemoveAllFoldersDialog, setShowRemoveAllFoldersDialog] = useState(false);
  const [showResetPatternsDialog, setShowResetPatternsDialog] = useState(false);
  const [resetPatternsContext, setResetPatternsContext] = useState<{isGlobal: boolean; folderPath: string} | null>(null);

  const handleClearSelectionClick = useCallback(() => setShowClearSelectionDialog(true), []);
  const clearSelection = useCallback(() => { setSelectedFiles([]); setShowClearSelectionDialog(false); }, []);
  const handleRemoveAllFoldersClick = useCallback(() => setShowRemoveAllFoldersDialog(true), []);
  const removeAllFolders = useCallback(() => {
    setSelectedFolder(null); setAllFiles([]); setSelectedFiles([]); setDisplayedFiles([]);
    setLocalPatterns({ patterns: '', excludedSystemPatterns: [] }); // Reset local patterns
    localStorage.removeItem(STORAGE_KEYS.SELECTED_FOLDER);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_FILES);
    localStorage.removeItem(STORAGE_KEYS.EXPANDED_NODES); // Also clear expanded nodes
    setExpandedNodes(new Map()); // Reset map in state
    sessionStorage.removeItem("hasLoadedInitialData");
    setShowRemoveAllFoldersDialog(false);
  }, []);

  const handleResetPatternsClick = useCallback((isGlobal: boolean, folderPath: string) => {
    setResetPatternsContext({ isGlobal, folderPath });
    setShowResetPatternsDialog(true);
  }, []);

  const confirmResetPatterns = useCallback(() => {
    if (resetPatternsContext) {
      resetIgnorePatterns(resetPatternsContext.isGlobal, resetPatternsContext.folderPath);
    }
    setShowResetPatternsDialog(false);
    setResetPatternsContext(null);
  }, [resetPatternsContext, resetIgnorePatterns]);

  // --- Helper Functions ---
  const truncatePath = (path: string | null): string => {
    if (!path) return "No folder selected";
    const parts = path.split(/[/\\]/); // Handle both slash types
    if (parts.length <= 3) return path;
    const lastParts = parts.filter(p => p).slice(-2);
    return `.../${lastParts.join('/')}`;
  };

  // Callback for IgnorePatterns component to update global excluded patterns
  const handleExcludedSystemPatternsChange = useCallback((newExcluded: string[]) => {
    setGlobalPatternsState((prev: IgnorePatternsState) => ({
      ...prev,
      excludedSystemPatterns: newExcluded
    }));
  }, []);

  // --- Render ---
  return (
    <ThemeProvider>
      <div className={styles.appContainer}>
        <header className={styles.appHeader}>
          <h1>PasteMax</h1>
          <div className={styles.headerActions}>
            {/* <a href="#" className={styles.headerLink}>Guide</a>
            <div className={styles.headerSeparator}></div> */}
            <ThemeToggle />
            <div className={styles.headerSeparator}></div>
            <a href="https://github.com/jsulpis/pastemax" target="_blank" rel="noopener noreferrer" className={styles.githubButton}>
              <Github size={16} />
            </a>
          </div>
        </header>

        {renderStatusMessage()}

        <div className={styles.mainContainer}>
          <Sidebar
            selectedFolder={selectedFolder}
            openFolder={openFolder}
            allFiles={allFiles}
            selectedFiles={selectedFiles}
            toggleFileSelection={toggleFileSelection}
            toggleFolderSelection={toggleFolderSelection}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            selectAllFiles={selectAllFiles}
            deselectAllFiles={deselectAllFiles}
            expandedNodes={expandedNodes}
            toggleExpanded={toggleExpanded}
            reloadFolder={reloadFolder}
            clearSelection={clearSelection}
            removeAllFolders={removeAllFolders}
            loadIgnorePatterns={loadIgnorePatterns}
            saveIgnorePatterns={saveIgnorePatterns}
            resetIgnorePatterns={resetIgnorePatterns}
            systemIgnorePatterns={systemIgnorePatterns}
            clearIgnorePatterns={clearLocalIgnorePatterns}
            onClearSelectionClick={handleClearSelectionClick}
            onRemoveAllFoldersClick={handleRemoveAllFoldersClick}
            onResetPatternsClick={handleResetPatternsClick}
            fileTreeSortOrder={fileTreeSortOrder}
            onSortOrderChange={setFileTreeSortOrder}
            globalPatternsState={globalPatternsState}
            localPatternsState={localIgnorePatterns}
            onExcludedSystemPatternsChange={handleExcludedSystemPatternsChange}
            ignorePatterns=""
            setIgnorePatterns={() => {}}
          />

          {selectedFolder ? (
            <div className={styles.contentArea}>
              <div className={styles.contentHeader}>
                <h1 className={styles.contentTitle}>Files</h1>
                <div className={styles.folderPathDisplay} title={selectedFolder}>{truncatePath(selectedFolder)}</div>
                <div className={styles.contentActions}>
                  <Dropdown
                    options={sortOptions}
                    value={sortOrder}
                    onChange={handleSortChange}
                    trigger={
                      <Button variant="secondary" size="sm" startIcon={getSortIcon(sortOrder)}> Sort </Button>
                    }
                    // menuClassName={styles.sortDropdownMenu} // Ensure this CSS class exists or remove
                  />
                </div>
                <div className={styles.fileStats}>
                  {selectedFiles.length} files selected ({totalTokens.toLocaleString()} tokens)
                </div>
              </div>

              <FileList
                files={displayedFiles} // Pass metadata only
                selectedFiles={selectedFiles}
                toggleFileSelection={toggleFileSelection}
              />

              {showUserInstructions && (
                <div className={styles.userInstructionsContainer}>
                  <UserInstructions instructions={userInstructions} setInstructions={setUserInstructions} />
                </div>
              )}

              <ControlContainer
                fileTreeMode={fileTreeMode}
                setFileTreeMode={setFileTreeMode}
                showUserInstructions={showUserInstructions}
                setShowUserInstructions={setShowUserInstructions}
                getSelectedFilesContent={getSelectedFilesContent} // Now async
                selectedFilesCount={selectedFiles.length}
                // Remove unused props passed to ControlContainer
              />
            </div>
          ) : (
            <div className={styles.contentArea}>
              <div className={styles.emptyStateContent}>
                <h2>Welcome to PasteMax</h2>
                <p>Select a folder to get started.</p>
                <Button variant="primary" onClick={openFolder} className="mt-4"> Select Project Folder </Button>
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Dialogs */}
        <ConfirmationDialog isOpen={showClearSelectionDialog} onClose={() => setShowClearSelectionDialog(false)} onConfirm={clearSelection} title="Clear Selection" description="Clear all selected files?" confirmLabel="Clear" variant="destructive" />
        <ConfirmationDialog isOpen={showRemoveAllFoldersDialog} onClose={() => setShowRemoveAllFoldersDialog(false)} onConfirm={removeAllFolders} title="Remove All Folders" description="Remove all folders and reset the application?" confirmLabel="Remove All" variant="destructive" />
        <ConfirmationDialog isOpen={showResetPatternsDialog} onClose={() => setShowResetPatternsDialog(false)} onConfirm={confirmResetPatterns} title={`Reset ${resetPatternsContext?.isGlobal ? 'Global' : 'Local'} Ignore Patterns`} description="Reset patterns to their default values?" confirmLabel="Reset" variant="destructive" />
      </div>
    </ThemeProvider>
  );
};

export default App;