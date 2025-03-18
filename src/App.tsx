import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import FileList from "./components/FileList";
import CopyButton from "./components/CopyButton";
import UserInstructions from "./components/UserInstructions";
import ControlContainer from "./components/ControlContainer";
import { FileData, FileTreeMode, SortOrder } from "./types/FileTypes";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import { generateAsciiFileTree, normalizePath, arePathsEqual } from "./utils/pathUtils";
import { Github } from "lucide-react";

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

const App = () => {
  // Load initial state from localStorage if available
  const savedFolder = localStorage.getItem(STORAGE_KEYS.SELECTED_FOLDER);
  const savedFiles = localStorage.getItem(STORAGE_KEYS.SELECTED_FILES);
  const savedSortOrder = localStorage.getItem(STORAGE_KEYS.SORT_ORDER);
  const savedSearchTerm = localStorage.getItem(STORAGE_KEYS.SEARCH_TERM);

  const [selectedFolder, setSelectedFolder] = useState(
    savedFolder as string | null
  );
  const [allFiles, setAllFiles] = useState([] as FileData[]);
  const [selectedFiles, setSelectedFiles] = useState(
    savedFiles ? JSON.parse(savedFiles) : ([] as string[])
  );
  const [sortOrder, setSortOrder] = useState(savedSortOrder || "tokens-desc");
  const [searchTerm, setSearchTerm] = useState(savedSearchTerm || "");
  const [expandedNodes, setExpandedNodes] = useState(
    {} as Record<string, boolean>
  );
  const [displayedFiles, setDisplayedFiles] = useState([] as FileData[]);
  const [processingStatus, setProcessingStatus] = useState({
    status: "idle",
    message: "",
  } as {
    status: "idle" | "processing" | "complete" | "error";
    message: string;
  });
  const [fileTreeMode, setFileTreeMode] = useState("none" as FileTreeMode);

  // State for sort dropdown
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // NEW: State for user instructions
  const [userInstructions, setUserInstructions] = useState("");

  // Add a new state for showing/hiding user instructions
  const [showUserInstructions, setShowUserInstructions] = useState(true);

  // NEW: State for file tree sorting and ignore patterns
  const [fileTreeSortOrder, setFileTreeSortOrder] = useState("name-asc" as SortOrder);
  const [ignorePatterns, setIgnorePatterns] = useState("");
  const [globalIgnorePatterns, setGlobalIgnorePatterns] = useState("");
  const [localIgnorePatterns, setLocalIgnorePatterns] = useState("");
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
        setExpandedNodes(JSON.parse(savedExpandedNodes));
      } catch (error) {
        console.error("Error parsing saved expanded nodes:", error);
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

      if (sortKey === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortKey === "tokens") {
        comparison = a.tokenCount - b.tokenCount;
      } else if (sortKey === "size") {
        comparison = a.size - b.size;
      }

      return sortDir === "asc" ? comparison : -comparison;
    });

    setDisplayedFiles(sorted);
  };

  // Toggle file selection
  const toggleFileSelection = (filePath: string) => {
    // Normalize the incoming file path to handle cross-platform issues
    const normalizedPath = normalizePath(filePath);
    
    setSelectedFiles((prev: string[]) => {
      // Check if the file is already selected
      const isSelected = prev.some((path: string) => arePathsEqual(path, normalizedPath));
      
      if (isSelected) {
        // Remove the file from selected files
        const newSelection = prev.filter((path: string) => !arePathsEqual(path, normalizedPath));
        return newSelection;
      } else {
        // Add the file to selected files
        const newSelection = [...prev, normalizedPath];
        return newSelection;
      }
    });
  };

  // Handle select all files
  const selectAllFiles = () => {
    const selectablePaths = displayedFiles
      .filter((file: FileData) => !file.isBinary && !file.isSkipped && !file.excludedByDefault)
      .map((file: FileData) => file.path);

    setSelectedFiles((prev: string[]) => {
      const newSelection = [...prev];
      selectablePaths.forEach((path: string) => {
        if (!newSelection.includes(path)) {
          newSelection.push(path);
        }
      });
      return newSelection;
    });
  };

  // Handle deselect all files
  const deselectAllFiles = () => {
    const displayedPaths = displayedFiles.map((file: FileData) => file.path);
    setSelectedFiles((prev: string[]) =>
      prev.filter((path: string) => !displayedPaths.includes(path))
    );
  };

  // Toggle folder selection (select/deselect all files in folder)
  const toggleFolderSelection = (folderPath: string, isSelected: boolean) => {
    // Normalize the folder path
    const normalizedFolderPath = normalizePath(folderPath);
    
    // Get all files that are under this folder path at any depth
    const filesInFolder = allFiles.filter(
      (file: FileData) => {
        const normalizedFilePath = normalizePath(file.path);
        // Check if the file is within this folder (at any depth)
        const isWithinFolder = normalizedFilePath.startsWith(normalizedFolderPath);
        // Only include files that are not binary, not skipped, and not excluded by patterns
        const isSelectable = !file.isBinary && !file.isSkipped && !file.excludedByDefault;
        return isWithinFolder && isSelectable;
      }
    );

    // Get paths of all selectable files in this folder
    const selectableFilePaths = filesInFolder.map((file: FileData) => normalizePath(file.path));
    
    if (isSelected) {
      // Add all files from this folder that aren't already selected
      setSelectedFiles((prev: string[]) => {
        // Start with current selection
        const newSelection = [...prev];
        
        // Add each selectable file path if it's not already selected
        selectableFilePaths.forEach((path: string) => {
          if (!newSelection.some((p: string) => arePathsEqual(p, path))) {
            newSelection.push(path);
          }
        });
        
        return newSelection;
      });
    } else {
      // Remove all files from this folder
      setSelectedFiles((prev: string[]) => {
        // Remove any currently selected files that are within this folder
        return prev.filter((path: string) => 
          !selectableFilePaths.some((folderFilePath: string) => 
            arePathsEqual(folderFilePath, path)
          )
        );
      });
    }
  };

  // Handle sort change
  const handleSortChange = (newSort: string) => {
    setSortOrder(newSort);
    applyFiltersAndSort(allFiles, newSort, searchTerm);
    setSortDropdownOpen(false); // Close dropdown after selection
  };

  // Handle search change
  const handleSearchChange = (newSearch: string) => {
    setSearchTerm(newSearch);
    applyFiltersAndSort(allFiles, sortOrder, newSearch);
  };

  // Toggle sort dropdown
  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
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

        if (sortKey === "name") {
          comparison = a.name.localeCompare(b.name);
        } else if (sortKey === "tokens") {
          comparison = a.tokenCount - b.tokenCount;
        } else if (sortKey === "size") {
          comparison = a.size - b.size;
        }

        return sortDir === "asc" ? comparison : -comparison;
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
    { value: "tokens-desc", label: "Tokens: High to Low" },
    { value: "tokens-asc", label: "Tokens: Low to High" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  // Handle expand/collapse state changes
  const toggleExpanded = (nodeId: string) => {
    setExpandedNodes((prev: Record<string, boolean>) => {
      const newState = {
        ...prev,
        [nodeId]: prev[nodeId] === undefined ? false : !prev[nodeId],
      };

      // Save to localStorage
      localStorage.setItem(
        STORAGE_KEYS.EXPANDED_NODES,
        JSON.stringify(newState)
      );

      return newState;
    });
  };

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

  // Setup listener for ignore patterns saved event
  useEffect(() => {
    if (isElectron) {
      const handleIgnorePatternsSaved = (success: boolean) => {
        if (success) {
          console.log("Ignore patterns saved successfully");
        } else {
          console.error("Failed to save ignore patterns");
        }
      };
      
      window.electron.ipcRenderer.on("ignore-patterns-saved", handleIgnorePatternsSaved);
      
      return () => {
        window.electron.ipcRenderer.removeListener("ignore-patterns-saved", handleIgnorePatternsSaved);
      };
    }
  }, [isElectron]);

  // Load global patterns on startup
  useEffect(() => {
    if (isElectron) {
      // Only load global patterns on startup if we haven't loaded them yet
      if (globalIgnorePatterns === "") {
        loadIgnorePatterns('', true);
      }
    }
  }, [isElectron, globalIgnorePatterns]);

  // Load ignore patterns (both global and local for current folder)
  const loadIgnorePatterns = async (folderPath: string, isGlobal: boolean = false) => {
    if (!window.electron) {
      console.log("Not in Electron environment, skipping loadIgnorePatterns");
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
        } else if (folderPath === selectedFolder) {
          // Only update local patterns if they're for the current folder
          setLocalIgnorePatterns(patterns);
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
  };

  // Function to save ignore patterns
  const saveIgnorePatterns = async (patterns: string, isGlobal: boolean, folderPath: string) => {
    setProcessingStatus({
      status: "processing",
      message: `Saving ${isGlobal ? "global" : "local"} ignore patterns...`,
    });

    try {
      // Use async/await with the new invoke pattern
      const result = await window.electron.ipcRenderer.invoke("save-ignore-patterns", {
        patterns,
        isGlobal,
        folderPath
      });

      if (result.success) {
        console.log(`Successfully saved ${isGlobal ? 'global' : 'local'} ignore patterns`);
        
        setProcessingStatus({
          status: "complete",
          message: `${isGlobal ? "Global" : "Local"} ignore patterns saved successfully.`,
        });
        
        // If the patterns are for the current folder, reload the folder
        if (!isGlobal && folderPath === selectedFolder) {
          reloadFolder();
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

  // Function to reset ignore patterns
  const resetIgnorePatterns = async (isGlobal: boolean, folderPath: string) => {
    setProcessingStatus({
      status: "processing",
      message: `Resetting ${isGlobal ? "global" : "local"} ignore patterns...`,
    });

    try {
      // Use async/await with the new invoke pattern
      const result = await window.electron.ipcRenderer.invoke("reset-ignore-patterns", {
        isGlobal,
        folderPath
      });

      if (result.success) {
        console.log(`Successfully reset ${isGlobal ? 'global' : 'local'} ignore patterns`);
        
        // Update the UI with the reset patterns
        if (isGlobal) {
          setGlobalIgnorePatterns(result.patterns || '');
        } else {
          setLocalIgnorePatterns(result.patterns || '');
        }
        
        // Store system patterns if provided
        if (result.systemPatterns && Array.isArray(result.systemPatterns)) {
          setSystemIgnorePatterns(result.systemPatterns);
        }
        
        setProcessingStatus({
          status: "complete",
          message: `${isGlobal ? "Global" : "Local"} ignore patterns reset to defaults.`,
        });
        
        // If the patterns are for the current folder, reload the folder
        if (!isGlobal && folderPath === selectedFolder) {
          reloadFolder();
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

  // Add handler for folder reload
  const reloadFolder = () => {
    if (isElectron && selectedFolder) {
      setProcessingStatus({
        status: "processing",
        message: "Reloading files...",
      });
      window.electron.ipcRenderer.send("reload-file-list", selectedFolder);
    }
  };

  // Add handlers for clear functionality
  const clearSelection = () => {
    setSelectedFiles([]);
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
      setLocalIgnorePatterns("");
      console.log("Folder changed, clearing local patterns state");
    }
  }, [selectedFolder]);

  // Function to clear ignore patterns (for local patterns only)
  const clearIgnorePatterns = async (folderPath: string) => {
    if (!window.electron) {
      console.log("Not in Electron environment, skipping clearIgnorePatterns");
      return;
    }
    
    setProcessingStatus({
      status: "processing",
      message: "Clearing local ignore patterns...",
    });

    try {
      // Use async/await with the invoke pattern
      const result = await window.electron.ipcRenderer.invoke("clear-ignore-patterns", {
        folderPath
      });

      if (result.success) {
        console.log(`Successfully cleared local ignore patterns for ${folderPath}`);
        
        // Clear the local patterns state
        setLocalIgnorePatterns("");
        setIgnorePatterns("");
        
        setProcessingStatus({
          status: "complete",
          message: "Local ignore patterns cleared successfully.",
        });
        
        // Reload folder to apply changes
        if (folderPath === selectedFolder) {
          reloadFolder();
        }
      } else {
        console.error("Error clearing ignore patterns:", result.error);
        
        setProcessingStatus({
          status: "error",
          message: `Error clearing ignore patterns: ${result.error}`,
        });
      }
    } catch (error) {
      console.error("Error invoking clear-ignore-patterns:", error);
      
      setProcessingStatus({
        status: "error",
        message: `Error clearing ignore patterns: ${String(error)}`,
      });
    }
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        <header className="header">
          <h1>PasteMax</h1>
          <div className="header-actions">
            <a href="#" className="header-link">Guide</a>
            <div className="header-separator"></div>
            <ThemeToggle />
            <div className="header-separator"></div>
            <a href="https://github.com/user/pastemax" className="header-link" target="_blank" rel="noopener noreferrer" title="View on GitHub">
              <Github size={18} />
            </a>
          </div>
        </header>

        {processingStatus.status === "processing" && (
          <div className="processing-indicator">
            <div className="spinner"></div>
            <span>{processingStatus.message}</span>
          </div>
        )}

        {processingStatus.status === "error" && (
          <div className="error-message">Error: {processingStatus.message}</div>
        )}

        <div className="main-content">
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
            // New props
            reloadFolder={reloadFolder}
            clearSelection={clearSelection}
            removeAllFolders={removeAllFolders}
            ignorePatterns={ignorePatterns}
            setIgnorePatterns={setIgnorePatterns}
            loadIgnorePatterns={loadIgnorePatterns}
            saveIgnorePatterns={saveIgnorePatterns}
            resetIgnorePatterns={resetIgnorePatterns}
            systemIgnorePatterns={systemIgnorePatterns}
            clearIgnorePatterns={clearIgnorePatterns}
          />
          
          {selectedFolder ? (
            <div className="content-area">
              <div className="content-header">
                <div className="content-title">Selected Files</div>
                <div className="content-actions">
                  <div className="folder-path-display" title={selectedFolder}>
                    {selectedFolder}
                  </div>
                  <div className="sort-dropdown">
                    <button
                      className="sort-dropdown-button"
                      onClick={toggleSortDropdown}
                    >
                      Sort:{" "}
                      {sortOptions.find((opt) => opt.value === sortOrder)
                        ?.label || sortOrder}
                    </button>
                    {sortDropdownOpen && (
                      <div className="sort-options">
                        {sortOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`sort-option ${
                              sortOrder === option.value ? "active" : ""
                            }`}
                            onClick={() => handleSortChange(option.value)}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="file-stats">
                    {selectedFiles.length} files | ~
                    {calculateTotalTokens().toLocaleString()} tokens
                  </div>
                </div>
              </div>

              <FileList
                files={displayedFiles}
                selectedFiles={selectedFiles}
                toggleFileSelection={toggleFileSelection}
              />

              {showUserInstructions && (
                <div className="user-instructions-container">
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
                fileTreeSortOrder={fileTreeSortOrder}
                setFileTreeSortOrder={setFileTreeSortOrder}
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
            <div className="content-area empty-state">
              <div className="empty-state-content">
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
      </div>
    </ThemeProvider>
  );
};

export default App;
