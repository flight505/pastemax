import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Sidebar from "./components/Sidebar";
import FileList from "./components/FileList";
import UserInstructions from "./components/UserInstructions";
import ControlContainer from "./components/ControlContainer";
import { FileData, FileTreeMode, SortOrder } from "./types/FileTypes";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import { generateAsciiFileTree, normalizePath, arePathsEqual } from "./utils/pathUtils";
import { Github, ArrowUpDown } from "lucide-react";
import styles from "./App.module.css";
import { Dropdown } from "./components/ui";
import { ConfirmationDialog } from "./components/ui/ConfirmationDialog";
import { Button } from "./components/ui/Button";
import { getSortIcon } from "./utils/sortIcons";

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
};

// Default system patterns as fallback if not provided by main process
const DEFAULT_SYSTEM_PATTERNS = [
  // Binary and image files
  "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.ico", 
  "**/*.webp", "**/*.svg", "**/*.pdf", "**/*.zip", "**/*.tar.gz",
  "**/*.tgz", "**/*.rar", "**/*.7z", "**/*.mp4", "**/*.mov",
  "**/*.avi", "**/*.mkv", "**/*.mp3", "**/*.wav", "**/*.flac",
  
  // Database files
  "**/*.sqlite", "**/*.db", "**/*.sql",
  
  // Document files
  "**/*.doc", "**/*.docx", "**/*.xls", "**/*.xlsx", "**/*.ppt", "**/*.pptx",
  
  // Large binary files
  "**/*.iso", "**/*.bin", "**/*.exe", "**/*.dll", "**/*.so", "**/*.dylib",
  
  // Minified files
  "**/*.min.js", "**/*.min.css",
];

interface IgnorePatternsState {
  patterns: string;
  excludedPatterns: string[];
}

const App = () => {
  // Load initial state from localStorage if available
  const savedFolder = localStorage.getItem(STORAGE_KEYS.SELECTED_FOLDER);
  const savedFiles = localStorage.getItem(STORAGE_KEYS.SELECTED_FILES);
  const savedSortOrder = localStorage.getItem(STORAGE_KEYS.SORT_ORDER);
  const savedSearchTerm = localStorage.getItem(STORAGE_KEYS.SEARCH_TERM);
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
        
        // Handle array format [key, value][]
        if (Array.isArray(parsedNodes)) {
          parsedNodes.forEach(([key, value]) => {
            if (typeof key === 'string' && typeof value === 'boolean') {
              map.set(key, value);
            }
          });
        }
        // Handle object format {key: value}
        else if (typeof parsedNodes === 'object' && parsedNodes !== null) {
          Object.entries(parsedNodes).forEach(([key, value]) => {
            if (typeof value === 'boolean') {
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

  const [selectedFolder, setSelectedFolder] = useState(
    savedFolder as string | null
  );
  const [allFiles, setAllFiles] = useState([] as FileData[]);
  const [selectedFiles, setSelectedFiles] = useState(
    savedFiles ? JSON.parse(savedFiles) : ([] as string[])
  );
  const [sortOrder, setSortOrder] = useState(savedSortOrder || "tokens-descending");
  const [searchTerm, setSearchTerm] = useState(savedSearchTerm || "");
  const [expandedNodes, setExpandedNodes] = useState<Map<string, boolean>>(initialExpandedNodes);
  const [displayedFiles, setDisplayedFiles] = useState([] as FileData[]);
  const [processingStatus, setProcessingStatus] = useState({
    status: "idle",
    message: "",
  } as {
    status: "idle" | "processing" | "complete" | "error";
    message: string;
  });

  // NEW: State for user instructions
  const [userInstructions, setUserInstructions] = useState("");

  // NEW: State for file tree sorting and ignore patterns
  const [fileTreeSortOrder, setFileTreeSortOrder] = useState("name-ascending" as SortOrder);
  const [ignorePatterns, setIgnorePatterns] = useState("");
  const [globalIgnorePatterns, setGlobalIgnorePatterns] = useState<IgnorePatternsState>({ patterns: '', excludedPatterns: [] });
  const [localIgnorePatterns, setLocalIgnorePatterns] = useState<IgnorePatternsState>({ patterns: '', excludedPatterns: [] });
  const [systemIgnorePatterns, setSystemIgnorePatterns] = useState<string[]>(DEFAULT_SYSTEM_PATTERNS);

  // Check if we're running in Electron or browser environment
  const isElectron = window.electron !== undefined;

  // Load expanded nodes state from localStorage
  useEffect(() => {
    const savedExpandedNodes = localStorage.getItem(
      STORAGE_KEYS.EXPANDED_NODES
    );
    if (savedExpandedNodes) {
      try {
        const parsedNodes = JSON.parse(savedExpandedNodes);
        
        // Check if it's an object that needs to be converted to entries
        if (parsedNodes && typeof parsedNodes === 'object' && !Array.isArray(parsedNodes)) {
          // Convert object to array of entries
          const entries = Object.entries(parsedNodes).map(([key, value]) => [key, Boolean(value)]) as [string, boolean][];
          setExpandedNodes(new Map(entries));
        } else if (Array.isArray(parsedNodes)) {
          // It's already in the format of [key, value] pairs
          const typedEntries = parsedNodes.map(([key, value]) => [key, Boolean(value)]) as [string, boolean][];
          setExpandedNodes(new Map(typedEntries));
        } else {
          // Reset to empty Map if format is not recognized
          setExpandedNodes(new Map());
        }
      } catch (error) {
        console.error("Error parsing saved expanded nodes:", error);
        // Reset to empty Map on error
        setExpandedNodes(new Map());
      }
    }
  }, []);

  // Persist selected folder when it changes
  useEffect(() => {
    if (selectedFolder) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_FOLDER, selectedFolder);
    } else {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_FOLDER);
    }
  }, [selectedFolder]);

  // Persist selected files when they change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SELECTED_FILES,
      JSON.stringify(selectedFiles)
    );
  }, [selectedFiles]);

  // Persist sort order when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SORT_ORDER, sortOrder);
  }, [sortOrder]);

  // Persist search term when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, searchTerm);
  }, [searchTerm]);

  // Load initial data from saved folder
  useEffect(() => {
    if (!isElectron || !selectedFolder) return;

    // Use a flag in sessionStorage to ensure we only load data once per session
    const hasLoadedInitialData = sessionStorage.getItem("hasLoadedInitialData");
    if (hasLoadedInitialData === "true") return;

    console.log("Loading saved folder on startup:", selectedFolder);
    setProcessingStatus({
      status: "processing",
      message: "Loading files from previously selected folder...",
    });
    window.electron.ipcRenderer.send("request-file-list", selectedFolder);

    // Mark that we've loaded the initial data
    sessionStorage.setItem("hasLoadedInitialData", "true");
  }, [isElectron, selectedFolder]);

  // Listen for folder selection from main process
  useEffect(() => {
    if (!isElectron) {
      console.warn("Not running in Electron environment");
      return;
    }

    const handleFolderSelected = (folderPath: string) => {
      // Check if folderPath is valid string
      if (typeof folderPath === "string") {
        console.log("Folder selected:", folderPath);
        setSelectedFolder(folderPath);
        // We'll select all files after they're loaded
        setSelectedFiles([]);
        setProcessingStatus({
          status: "processing",
          message: "Requesting file list...",
        });
        window.electron.ipcRenderer.send("request-file-list", folderPath);
      } else {
        console.error("Invalid folder path received:", folderPath);
        setProcessingStatus({
          status: "error",
          message: "Invalid folder path received",
        });
      }
    };

    const handleFileListData = (files: FileData[]) => {
      console.log("Received file list data:", files.length, "files");
      
      // Check if this is the app directory - special case
      if (files.length === 1 && files[0].isAppDirectory) {
        console.log("Detected app directory selection");
        setAllFiles([]);
        setSelectedFiles([]);
        setDisplayedFiles([]);
        setProcessingStatus({
          status: "error",
          message: "Please select a project directory instead of the PasteMax application directory",
        });
        return;
      }
      
      setAllFiles(files);
      setProcessingStatus({
        status: "complete",
        message: `Loaded ${files.length} files`,
      });

      // Apply filters and sort to the new files
      applyFiltersAndSort(files, sortOrder, searchTerm);

      // Select only files that are not binary, not skipped, and not excluded by default
      const selectablePaths = files
        .filter(
          (file: FileData) =>
            !file.isBinary && !file.isSkipped && !file.excludedByDefault // Respect the excludedByDefault flag
        )
        .map((file: FileData) => file.path);

      setSelectedFiles(selectablePaths);
    };

    const handleProcessingStatus = (status: {
      status: "idle" | "processing" | "complete" | "error";
      message: string;
    }) => {
      console.log("Processing status:", status);
      setProcessingStatus(status);
    };

    window.electron.ipcRenderer.on("folder-selected", handleFolderSelected);
    window.electron.ipcRenderer.on("file-list-data", handleFileListData);
    window.electron.ipcRenderer.on(
      "file-processing-status",
      handleProcessingStatus
    );

    return () => {
      window.electron.ipcRenderer.removeListener(
        "folder-selected",
        handleFolderSelected
      );
      window.electron.ipcRenderer.removeListener(
        "file-list-data",
        handleFileListData
      );
      window.electron.ipcRenderer.removeListener(
        "file-processing-status",
        handleProcessingStatus
      );
    };
  }, [isElectron, sortOrder, searchTerm]);

  // Add ESC key handler for directory loading
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && processingStatus.status === "processing") {
        console.log("ESC pressed - cancelling directory loading");
        window.electron.ipcRenderer.send("cancel-directory-loading");
      }
    };

    // Only add the event listener when processing
    if (processingStatus.status === "processing") {
      window.addEventListener("keydown", handleEscKey);
      return () => window.removeEventListener("keydown", handleEscKey);
    }
  }, [processingStatus.status]);

  const openFolder = () => {
    if (isElectron) {
      console.log("Opening folder dialog");
      setProcessingStatus({ status: "idle", message: "Select a folder..." });
      window.electron.ipcRenderer.send("open-folder");
    } else {
      console.warn("Folder selection not available in browser");
    }
  };

  // Apply filters and sorting to files
  const applyFiltersAndSort = (
    files: FileData[],
    sort: string,
    filter: string
  ) => {
    let filtered = files;

    // Apply filter
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      filtered = files.filter(
        (file) =>
          file.name.toLowerCase().includes(lowerFilter) ||
          file.path.toLowerCase().includes(lowerFilter)
      );
    }

    // Apply sort
    const [sortKey, sortDir] = sort.split("-");
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortKey) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "tokens":
          // Ensure we have valid numbers for comparison
          const aTokens = typeof a.tokenCount === 'number' ? a.tokenCount : 0;
          const bTokens = typeof b.tokenCount === 'number' ? b.tokenCount : 0;
          comparison = aTokens - bTokens;
          break;
        case "date":
          const aDate = a.lastModified || 0;
          const bDate = b.lastModified || 0;
          comparison = aDate - bDate;
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }

      return sortDir === "ascending" ? comparison : -comparison;
    });

    setDisplayedFiles(sorted);
  };

  // Toggle file selection
  const toggleFileSelection = (filePath: string) => {
    // Normalize the incoming file path to handle cross-platform issues
    const normalizedPath = normalizePath(filePath);
    
    setSelectedFiles((prevSelected: string[]) => {
      // Check if the file is already selected
      const isSelected = prevSelected.some((path: string) => arePathsEqual(path, normalizedPath));
      
      if (isSelected) {
        // Remove the file from selected files
        const newSelection = prevSelected.filter((path: string) => !arePathsEqual(path, normalizedPath));
        return newSelection;
      } else {
        // Add the file to selected files
        const newSelection = [...prevSelected, normalizedPath];
        return newSelection;
      }
    });
  };

  // Select all files that are not excluded or binary
  const selectAllFiles = () => {
    const filesToSelect = allFiles
      .filter(file => !file.excluded && !file.isBinary && !file.isSkipped)
      .map(file => file.path);
    
    // Update selected files state
    setSelectedFiles(prevSelected => {
      // Create a Set of currently selected files for faster lookup
      const currentlySelected = new Set(prevSelected);
      
      // Add all files that aren't already selected
      filesToSelect.forEach(path => {
        if (!currentlySelected.has(path)) {
          currentlySelected.add(path);
        }
      });
      
      return Array.from(currentlySelected);
    });
  };

  // Deselect all files
  const deselectAllFiles = () => {
    setSelectedFiles([]);
  };

  // Toggle folder selection with proper handling of nested structures
  const toggleFolderSelection = (folderPath: string, isSelected: boolean) => {
    if (!folderPath) {
      console.warn("toggleFolderSelection called with empty path");
      return;
    }
    
    setSelectedFiles(prev => {
      // Create a Set for better performance
      const newSelection = new Set(prev);
      
      // Find all files under this folder
      const filesInFolder = allFiles.filter(file => {
        const normalizedFilePath = normalizePath(file.path);
        const normalizedFolderPath = normalizePath(folderPath);
        
        return normalizedFilePath.startsWith(normalizedFolderPath) && 
          !file.excluded && 
          !file.isBinary && 
          !file.isSkipped;
      });
      
      // Update selection based on isSelected flag
      filesInFolder.forEach(file => {
        if (isSelected) {
          newSelection.add(file.path);
        } else {
          newSelection.delete(file.path);
        }
      });
      
      return Array.from(newSelection);
    });
  };

  // Update the sort change handler
  const handleSortChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setSortOrder(value);
      applyFiltersAndSort(allFiles, value, searchTerm);
    }
  };

  // Handle search change
  const handleSearchChange = (newSearch: string) => {
    setSearchTerm(newSearch);
    applyFiltersAndSort(allFiles, sortOrder, newSearch);
  };

  // Calculate total tokens from selected files
  const calculateTotalTokens = () => {
    return selectedFiles.reduce((total: number, path: string) => {
      const file = allFiles.find((f: FileData) => f.path === path);
      return total + (file ? file.tokenCount : 0);
    }, 0);
  };

  // Concatenate selected files content for copying,
  // and add user instructions (wrapped in tags) at the bottom if provided.
  const getSelectedFilesContent = () => {
    // Sort selected files according to current sort order
    const [sortKey, sortDir] = sortOrder.split("-");
    const sortedSelected = allFiles
      .filter((file: FileData) => selectedFiles.includes(file.path))
      .sort((a: FileData, b: FileData) => {
        let comparison = 0;

        switch (sortKey) {
          case "name":
            comparison = a.name.localeCompare(b.name);
            break;
          case "tokens":
            // Ensure we have valid numbers for comparison
            const aTokens = typeof a.tokenCount === 'number' ? a.tokenCount : 0;
            const bTokens = typeof b.tokenCount === 'number' ? b.tokenCount : 0;
            comparison = aTokens - bTokens;
            break;
          case "date":
            const aDate = a.lastModified || 0;
            const bDate = b.lastModified || 0;
            comparison = aDate - bDate;
            break;
          default:
            comparison = a.name.localeCompare(b.name);
        }

        return sortDir === "ascending" ? comparison : -comparison;
      });

    if (sortedSelected.length === 0) {
      return "No files selected.";
    }

    let concatenatedString = "";

    // Add ASCII file tree based on the selected mode
    if (fileTreeMode !== "none" && selectedFolder) {
      let filesToInclude = sortedSelected;
      
      // For the 'complete' mode, include all files
      if (fileTreeMode === "complete") {
        filesToInclude = allFiles;
      }
      
      // For all modes, we pass the fileTreeMode parameter to the function
      const asciiTree = generateAsciiFileTree(filesToInclude, selectedFolder, fileTreeMode);
      concatenatedString += `<file_map>\n${selectedFolder}\n${asciiTree}\n</file_map>\n\n`;
    }

    // Improve formatting of file header - add file path and token count
    sortedSelected.forEach((file: FileData) => {
      // Extract relative path from the full path
      let relativePath = "";
      if (selectedFolder && file.path.startsWith(selectedFolder)) {
        relativePath = file.path.substring(selectedFolder.length);
        if (relativePath.startsWith("/") || relativePath.startsWith("\\")) {
          relativePath = relativePath.substring(1);
        }
      } else {
        relativePath = file.path;
      }
      
      // Add formatted file header with token count and path
      concatenatedString += `\n\n// ---- File: ${relativePath} (${file.tokenCount} tokens) ----\n\n`;
      concatenatedString += file.content;
    });

    // Wrap user instructions if any and add to the bottom
    const userInstructionsBlock = userInstructions.trim()
      ? `\n<user_instructions>\n${userInstructions}\n</user_instructions>\n\n`
      : "";
    return concatenatedString + userInstructionsBlock;
  };

  // Sort options for the dropdown
  const sortOptions = [
    { value: "name-ascending", label: "Name (A to Z)" },
    { value: "name-descending", label: "Name (Z to A)" },
    { value: "tokens-ascending", label: "Tokens (Fewest first)" },
    { value: "tokens-descending", label: "Tokens (Most first)" },
    { value: "date-ascending", label: "Date (Oldest first)" },
    { value: "date-descending", label: "Date (Newest first)" }
  ];

  // Handle expand/collapse state changes
  const toggleExpanded = (nodeId: string) => {
    setExpandedNodes((prev: Map<string, boolean>) => {
      const newState = new Map(prev);
      const currentValue = prev.get(nodeId);
      newState.set(nodeId, currentValue === undefined ? true : !currentValue);
      
      // Save to localStorage as an array of entries [key, value]
      try {
        localStorage.setItem(
          STORAGE_KEYS.EXPANDED_NODES,
          JSON.stringify(Array.from(newState.entries()))
        );
      } catch (error) {
        console.error("Error saving expanded nodes:", error);
      }
      
      return newState;
    });
  };

  // Update loadIgnorePatterns to handle excluded patterns
  const loadIgnorePatterns = useCallback(async (folderPath: string, isGlobal: boolean = false) => {
    if (!window.electron) {
      console.log("Not in Electron environment, skipping loadIgnorePatterns");
      return "";
    }
    
    // Prevent duplicate loading of patterns
    if (isGlobal && globalIgnorePatterns.patterns !== "") {
      console.log("Global ignore patterns already loaded, skipping...");
      return globalIgnorePatterns.patterns;
    }
    
    if (!isGlobal && folderPath === selectedFolder && localIgnorePatterns.patterns !== "") {
      console.log("Local ignore patterns already loaded for current folder, skipping...");
      return localIgnorePatterns.patterns;
    }
    
    console.log(`Loading ${isGlobal ? 'global' : 'local'} ignore patterns${!isGlobal ? ` for ${folderPath}` : ''}`);
    
    try {
      const result = await window.electron.ipcRenderer.invoke("load-ignore-patterns", {
        folderPath,
        isGlobal
      });
      
      // Always treat as success since main process now returns safe defaults
      console.log(`Loaded ${isGlobal ? 'global' : 'local'} ignore patterns`);
      
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
        console.warn('Using default system patterns');
        setSystemIgnorePatterns(DEFAULT_SYSTEM_PATTERNS);
      }
      
      // Update pattern state with both patterns and excluded patterns
      if (isGlobal) {
        setGlobalIgnorePatterns({
          patterns: patterns,
          excludedPatterns: result.excludedPatterns || []
        });
      } else if (folderPath === selectedFolder) {
        setLocalIgnorePatterns({
          patterns: patterns,
          excludedPatterns: result.excludedPatterns || []
        });
      }
      
      return patterns;
    } catch (error) {
      console.error(`Error loading ${isGlobal ? 'global' : 'local'} ignore patterns:`, error);
      // Return empty string for local patterns, defaults for global
      const defaultPatterns = isGlobal ? DEFAULT_SYSTEM_PATTERNS : '';
      if (isGlobal) {
        setGlobalIgnorePatterns({
          patterns: defaultPatterns,
          excludedPatterns: []
        });
      } else if (folderPath === selectedFolder) {
        setLocalIgnorePatterns({
          patterns: defaultPatterns,
          excludedPatterns: []
        });
      }
      setSystemIgnorePatterns(DEFAULT_SYSTEM_PATTERNS);
      return defaultPatterns;
    }
  }, [globalIgnorePatterns.patterns, localIgnorePatterns.patterns, selectedFolder]);

  // Setup listener for ignore patterns loaded event
  useEffect(() => {
    if (isElectron) {
      const handleIgnorePatternsLoaded = (patterns: string) => {
        setIgnorePatterns(patterns);
      };
      
      window.electron.ipcRenderer.on("ignore-patterns-loaded", handleIgnorePatternsLoaded);
      
      return () => {
        window.electron.ipcRenderer.removeListener("ignore-patterns-loaded", handleIgnorePatternsLoaded);
      };
    }
  }, [isElectron]);

  // Load global patterns on startup - with improved error handling
  useEffect(() => {
    if (isElectron) {
      // Only load global patterns on startup if we haven't loaded them yet
      if (globalIgnorePatterns.patterns === "") {
        loadIgnorePatterns('', true).catch(error => {
          console.error('Error loading initial global patterns:', error);
          // Set defaults on error
          setGlobalIgnorePatterns({
            patterns: DEFAULT_SYSTEM_PATTERNS.join('\n'),
            excludedPatterns: []
          });
          setSystemIgnorePatterns(DEFAULT_SYSTEM_PATTERNS);
        });
      }
    }
  }, [isElectron, globalIgnorePatterns.patterns, loadIgnorePatterns]);

  // Load local patterns when folder changes - with improved error handling
  useEffect(() => {
    if (isElectron && selectedFolder) {
      loadIgnorePatterns(selectedFolder, false).catch(error => {
        console.error('Error loading local patterns for new folder:', error);
        // Set empty patterns on error for local
        setLocalIgnorePatterns({
          patterns: '',
          excludedPatterns: []
        });
      });
    }
  }, [isElectron, selectedFolder, loadIgnorePatterns]);

  // Update saveIgnorePatterns to handle excluded patterns
  const saveIgnorePatterns = async (patterns: string, isGlobal: boolean, folderPath?: string) => {
    setProcessingStatus({
      status: "processing",
      message: `Saving ${isGlobal ? "global" : "local"} ignore patterns...`,
    });

    try {
      // Update state first to show immediate feedback in UI
      if (isGlobal) {
        setGlobalIgnorePatterns(prev => ({
          ...prev,
          patterns
        }));
      } else if (folderPath) {
        setLocalIgnorePatterns(prev => ({
          ...prev,
          patterns
        }));
      }

      // Use async/await with the new invoke pattern
      const result = await window.electron.ipcRenderer.invoke("save-ignore-patterns", {
        patterns,
        isGlobal,
        folderPath: folderPath || selectedFolder
      });

      if (result.success) {
        console.log(`Successfully saved ${isGlobal ? 'global' : 'local'} ignore patterns`);
        
        setProcessingStatus({
          status: "complete",
          message: `${isGlobal ? "Global" : "Local"} ignore patterns saved successfully.`,
        });
        
        // Only reload if absolutely necessary
        if (!isGlobal && folderPath === selectedFolder) {
          setTimeout(() => {
            reloadFolder();
          }, 300);
        } else if (isGlobal && selectedFolder) {
          setTimeout(() => {
            reloadFolder();
          }, 300);
        }
      } else {
        console.error(`Error saving ${isGlobal ? 'global' : 'local'} ignore patterns:`, result.error);
        
        setProcessingStatus({
          status: "error",
          message: `Error saving ${isGlobal ? "global" : "local"} ignore patterns: ${result.error}`,
        });
      }
    } catch (error) {
      console.error("Error invoking save-ignore-patterns:", error);
      
      setProcessingStatus({
        status: "error",
        message: `Error saving ${isGlobal ? "global" : "local"} ignore patterns: ${String(error)}`,
      });
    }
  };

  // Function to reset ignore patterns to defaults
  const resetIgnorePatterns = async (isGlobal: boolean, folderPath?: string) => {
    setProcessingStatus({
      status: "processing",
      message: `Resetting ${isGlobal ? "global" : "local"} ignore patterns...`,
    });

    try {
      // Update state immediately for UI feedback
      if (isGlobal) {
        setGlobalIgnorePatterns({
          patterns: '',
          excludedPatterns: []
        });
      } else if (folderPath) {
        setLocalIgnorePatterns({
          patterns: '',
          excludedPatterns: []
        });
      }

      // Use async/await with the new invoke pattern
      const result = await window.electron.ipcRenderer.invoke("reset-ignore-patterns", {
        isGlobal,
        folderPath: folderPath || selectedFolder
      });

      if (result.success) {
        console.log(`Successfully reset ${isGlobal ? 'global' : 'local'} ignore patterns`);
        
        // Update the local pattern state if applicable
        if (!isGlobal && folderPath) {
          setLocalIgnorePatterns({
            patterns: '',
            excludedPatterns: []
          });
        } else if (isGlobal) {
          setGlobalIgnorePatterns({
            patterns: '',
            excludedPatterns: []
          });
        }
        
        setProcessingStatus({
          status: "complete",
          message: `${isGlobal ? "Global" : "Local"} ignore patterns have been reset.`,
        });
        
        // Only reload if necessary and with a delay
        if (!isGlobal && folderPath === selectedFolder) {
          setTimeout(() => {
            reloadFolder();
          }, 300);
        } else if (isGlobal && selectedFolder) {
          setTimeout(() => {
            reloadFolder();
          }, 300);
        }
      } else {
        console.error(`Error resetting ${isGlobal ? 'global' : 'local'} ignore patterns:`, result.error);
        
        setProcessingStatus({
          status: "error",
          message: `Error resetting ${isGlobal ? "global" : "local"} ignore patterns: ${result.error}`,
        });
      }
    } catch (error) {
      console.error("Error invoking reset-ignore-patterns:", error);
      
      setProcessingStatus({
        status: "error",
        message: `Error resetting ${isGlobal ? "global" : "local"} ignore patterns: ${String(error)}`,
      });
    }
  };

  // Wrap reloadFolder in useCallback to prevent recreating it on every render
  const reloadFolder = useCallback(() => {
    if (isElectron && selectedFolder) {
      console.log(`Reloading folder: ${selectedFolder}`);
      setProcessingStatus({
        status: "processing",
        message: "Loading files...",
      });
      
      // Clear state
      setAllFiles([]);
      setDisplayedFiles([]);
      
      // Trigger folder loading - use the correct event name
      window.electron.ipcRenderer.send("reload-file-list", selectedFolder);
    }
  }, [isElectron, selectedFolder, setProcessingStatus, setAllFiles, setDisplayedFiles]);

  // Now add the ignore-patterns-saved handler after reloadFolder is defined
  useEffect(() => {
    if (isElectron) {
      const handleIgnorePatternsSaved = (result: { 
        success: boolean, 
        isGlobal?: boolean, 
        folderPath?: string,
        error?: string 
      }) => {
        if (result.success) {
          console.log("Ignore patterns saved successfully");
          
          // Auto-reload when patterns are saved
          if (selectedFolder) {
            // If global patterns were changed, or if local patterns for current folder were changed
            if (result.isGlobal || (!result.isGlobal && result.folderPath === selectedFolder)) {
              console.log("Automatically reloading file list after pattern change");
              reloadFolder();
            }
          }
        } else {
          console.error("Failed to save ignore patterns:", result.error);
        }
      };
      
      // Increase the maximum number of listeners to prevent the warning
      if (window.electron.ipcRenderer.setMaxListeners) {
        window.electron.ipcRenderer.setMaxListeners(20);
      }
      
      window.electron.ipcRenderer.on("ignore-patterns-saved", handleIgnorePatternsSaved);
      
      return () => {
        window.electron.ipcRenderer.removeListener("ignore-patterns-saved", handleIgnorePatternsSaved);
      };
    }
  }, [isElectron, selectedFolder, reloadFolder]);

  // Add dialog states
  const [showClearSelectionDialog, setShowClearSelectionDialog] = useState(false);
  const [showRemoveAllFoldersDialog, setShowRemoveAllFoldersDialog] = useState(false);
  const [showResetPatternsDialog, setShowResetPatternsDialog] = useState(false);
  const [resetPatternsContext, setResetPatternsContext] = useState<{isGlobal: boolean; folderPath: string} | null>(null);

  // Update handlers to show dialogs
  const handleClearSelectionClick = () => {
    setShowClearSelectionDialog(true);
  };

  const clearSelection = () => {
    setSelectedFiles([]);
    setShowClearSelectionDialog(false);
  };

  const handleRemoveAllFoldersClick = () => {
    setShowRemoveAllFoldersDialog(true);
  };

  const removeAllFolders = () => {
    setSelectedFolder(null);
    setAllFiles([]);
    setSelectedFiles([]);
    setDisplayedFiles([]);
    
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.SELECTED_FOLDER);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_FILES);
    localStorage.removeItem(STORAGE_KEYS.EXPANDED_NODES);
    
    // Clear sessionStorage flag to allow loading data next time
    sessionStorage.removeItem("hasLoadedInitialData");
    setShowRemoveAllFoldersDialog(false);
  };

  const handleResetPatternsClick = (isGlobal: boolean, folderPath: string) => {
    setResetPatternsContext({ isGlobal, folderPath });
    setShowResetPatternsDialog(true);
  };

  // Initialize system patterns with defaults on component mount
  useEffect(() => {
    console.log(`App initialized with ${DEFAULT_SYSTEM_PATTERNS.length} default system patterns`);
    console.log('System patterns sample:', DEFAULT_SYSTEM_PATTERNS.slice(0, 5));
  }, []);

  // Clear ignore patterns state when folder changes
  useEffect(() => {
    if (selectedFolder) {
      // Reset local patterns state when folder changes
      setLocalIgnorePatterns({
        patterns: '',
        excludedPatterns: []
      });
      console.log("Folder changed, clearing local patterns state");
    }
  }, [selectedFolder]);

  // Function to clear local ignore patterns for a folder
  const clearLocalIgnorePatterns = async (folderPath: string) => {
    setProcessingStatus({
      status: "processing",
      message: "Clearing local ignore patterns...",
    });

    try {
      // Update state immediately for UI feedback
      setLocalIgnorePatterns({
        patterns: '',
        excludedPatterns: []
      });
      
      const result = await window.electron.ipcRenderer.invoke("clear-local-ignore-patterns", {
        folderPath
      });

      if (result.success) {
        console.log("Successfully cleared local ignore patterns");
        
        setLocalIgnorePatterns({
          patterns: '',
          excludedPatterns: []
        });
        
        setProcessingStatus({
          status: "complete",
          message: "Local ignore patterns cleared successfully.",
        });
        
        // Only reload if the folder being cleared is the current selected folder
        if (folderPath === selectedFolder) {
          setTimeout(() => {
            reloadFolder();
          }, 300);
        }
      } else {
        console.error("Error clearing local ignore patterns:", result.error);
        
        setProcessingStatus({
          status: "error",
          message: `Error clearing local ignore patterns: ${result.error}`,
        });
      }
    } catch (error) {
      console.error("Error invoking clear-local-ignore-patterns:", error);
      
      setProcessingStatus({
        status: "error",
        message: `Error clearing local ignore patterns: ${String(error)}`,
      });
    }
  };

  const truncatePath = (path: string) => {
    const parts = path.split('/');
    if (parts.length <= 3) return path;
    
    // Get the last two meaningful parts
    const lastParts = parts.filter(p => p).slice(-2);
    return `.../${lastParts.join('/')}`;
  };

  return (
    <ThemeProvider>
      <div className={styles.appContainer}>
        <header className={styles.appHeader}>
          <h1>PasteMax</h1>
          <div className={styles.headerActions}>
            <a href="#" className={styles.headerLink}>Guide</a>
            <div className={styles.headerSeparator}></div>
            <ThemeToggle />
            <div className={styles.headerSeparator}></div>
            <a
              href="https://github.com/jsulpis/pastemax"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubButton}
            >
              <Github size={16} />
            </a>
          </div>
        </header>

        {processingStatus.status === "processing" && (
          <div className={styles.processingIndicator}>
            <div className={styles.spinner}></div>
            <span>{processingStatus.message}</span>
          </div>
        )}

        {processingStatus.status === "error" && (
          <div className={styles.errorMessage}>Error: {processingStatus.message}</div>
        )}

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
            ignorePatterns={ignorePatterns}
            setIgnorePatterns={setIgnorePatterns}
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
          />
          
          {selectedFolder ? (
            <div className={styles.contentArea}>
              <div className={styles.contentHeader}>
                <h1 className={styles.contentTitle}>Files</h1>
                <div className={styles.folderPathDisplay}>{truncatePath(selectedFolder)}</div>
                <div className={styles.contentActions}>
                  <Dropdown
                    options={sortOptions}
                    value={sortOrder}
                    onChange={handleSortChange}
                    trigger={
                      <Button
                        variant="secondary"
                        size="sm"
                        startIcon={getSortIcon(sortOrder)}
                      >
                        Sort
                      </Button>
                    }
                    menuClassName={styles.sortDropdownMenu}
                  />
                </div>
                <div className={styles.fileStats}>
                  {selectedFiles.length} files selected ({calculateTotalTokens().toLocaleString()} tokens)
                </div>
              </div>

              <FileList
                files={displayedFiles}
                selectedFiles={selectedFiles}
                toggleFileSelection={toggleFileSelection}
              />

              {showUserInstructions && (
                <div className={styles.userInstructionsContainer}>
                  <UserInstructions
                    instructions={userInstructions}
                    setInstructions={setUserInstructions}
                  />
                </div>
              )}

              <ControlContainer
                fileTreeMode={fileTreeMode}
                setFileTreeMode={setFileTreeMode}
                showUserInstructions={showUserInstructions}
                setShowUserInstructions={setShowUserInstructions}
                getSelectedFilesContent={getSelectedFilesContent}
                selectedFilesCount={selectedFiles.length}
                fileTreeSortOrder={sortOrder === 'name-ascending' ? 'name-asc' : 
                                   sortOrder === 'name-descending' ? 'name-desc' :
                                   sortOrder === 'date-ascending' ? 'date-newest' : undefined}
                setFileTreeSortOrder={(value) => {
                  setSortOrder(value === 'name-asc' ? 'name-ascending' :
                              value === 'name-desc' ? 'name-descending' :
                              value === 'date-newest' ? 'date-ascending' : 'name-ascending');
                }}
                ignorePatterns={ignorePatterns}
                setIgnorePatterns={setIgnorePatterns}
                loadIgnorePatterns={loadIgnorePatterns}
                saveIgnorePatterns={saveIgnorePatterns}
                resetIgnorePatterns={resetIgnorePatterns}
                reloadFolder={reloadFolder}
                clearSelection={clearSelection}
                removeAllFolders={removeAllFolders}
              />
            </div>
          ) : (
            <div className={styles.contentArea}>
              <div className={styles.emptyStateContent}>
                <h2>Welcome to PasteMax</h2>
                <p>Select a folder from the file tree panel to start working with your files.</p>
                <p>PasteMax helps you format your code for AI models by:</p>
                <ul>
                  <li>Selecting specific files</li>
                  <li>Organizing them in a tree structure</li>
                  <li>Adding custom instructions</li>
                  <li>Calculating token counts</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Add confirmation dialogs */}
        <ConfirmationDialog
          isOpen={showClearSelectionDialog}
          onClose={() => setShowClearSelectionDialog(false)}
          onConfirm={clearSelection}
          title="Clear Selection"
          description="Are you sure you want to clear all selected files?"
          confirmLabel="Clear Selection"
          variant="destructive"
        />

        <ConfirmationDialog
          isOpen={showRemoveAllFoldersDialog}
          onClose={() => setShowRemoveAllFoldersDialog(false)}
          onConfirm={removeAllFolders}
          title="Remove All Folders"
          description="Are you sure you want to remove all folders? This will reset the application state."
          confirmLabel="Remove All"
          variant="destructive"
        />

        <ConfirmationDialog
          isOpen={showResetPatternsDialog}
          onClose={() => setShowResetPatternsDialog(false)}
          onConfirm={() => {
            if (resetPatternsContext) {
              resetIgnorePatterns(
                resetPatternsContext.isGlobal,
                resetPatternsContext.folderPath
              );
              setShowResetPatternsDialog(false);
              setResetPatternsContext(null);
            }
          }}
          title={`Reset ${resetPatternsContext?.isGlobal ? 'Global' : 'Local'} Ignore Patterns`}
          description="Are you sure you want to reset the ignore patterns to their default values?"
          confirmLabel="Reset Patterns"
          variant="destructive"
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
