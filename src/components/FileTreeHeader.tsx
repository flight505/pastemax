import React, { useState, useEffect, useRef } from "react";
import { Folder, ArrowUpDown, Filter, X, RefreshCw } from "lucide-react";
import { SortOrder } from "../types/FileTypes";

interface FileTreeHeaderProps {
  onOpenFolder: () => void;
  onSortChange: (sortOrder: SortOrder) => void;
  onClearSelection: () => void;
  onRemoveAllFolders: () => void;
  onReloadFileTree: () => void;
  onOpenIgnorePatterns: () => void;
}

// Define types for dropdown menus
type DropdownType = 'sort' | 'clear' | null;

const FileTreeHeader = ({
  onOpenFolder,
  onSortChange,
  onClearSelection,
  onRemoveAllFolders,
  onReloadFileTree,
  onOpenIgnorePatterns,
}: FileTreeHeaderProps): JSX.Element => {
  // Single state to track which dropdown is currently open
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  
  // Refs for click detection
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const clearMenuRef = useRef<HTMLDivElement>(null);
  
  // Toggle dropdown function - behaves like VSCode
  const toggleDropdown = (dropdown: DropdownType) => {
    if (activeDropdown === dropdown) {
      // Close if clicking the same dropdown button
      setActiveDropdown(null);
    } else {
      // Open this dropdown, closing any other that might be open
      setActiveDropdown(dropdown);
    }
  };
  
  // Handle global clicks to implement VSCode-like behavior
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Don't do anything if no dropdown is open
      if (!activeDropdown) return;
      
      const target = event.target as Node;
      
      // Check if click is inside the active dropdown menu
      const isClickInMenu = 
        (activeDropdown === 'sort' && sortMenuRef.current?.contains(target)) ||
        (activeDropdown === 'clear' && clearMenuRef.current?.contains(target));
      
      // If click is not in the active menu, close the dropdown
      if (!isClickInMenu) {
        setActiveDropdown(null);
      }
    };
    
    // Using mousedown instead of click to match most menu behaviors
    document.addEventListener('mousedown', handleGlobalClick);
    
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick);
    };
  }, [activeDropdown]);
  
  // Handle dropdown item selection
  const handleSortSelect = (sortOrder: SortOrder) => {
    onSortChange(sortOrder);
    setActiveDropdown(null);
  };

  const handleClearSelect = (action: 'clear' | 'removeAll') => {
    if (action === 'clear') {
      onClearSelection();
    } else {
      onRemoveAllFolders();
    }
    setActiveDropdown(null);
  };

  return (
    <div className="file-tree-header">
      <button 
        className="file-tree-btn" 
        onClick={() => {
          setActiveDropdown(null); // Close any open dropdown
          onOpenFolder();
        }}
        title="Select Folder"
      >
        <Folder size={16} />
      </button>
      
      <div className="dropdown-container">
        <button 
          className={`file-tree-btn ${activeDropdown === 'sort' ? 'active' : ''}`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation(); // Prevent immediate closure
            toggleDropdown('sort');
          }}
          title="Sort"
        >
          <ArrowUpDown size={16} />
        </button>
        
        {activeDropdown === 'sort' && (
          <div className="dropdown-menu" ref={sortMenuRef}>
            <div className="dropdown-item" onClick={() => handleSortSelect("name-asc")}>
              Name (A-Z)
            </div>
            <div className="dropdown-item" onClick={() => handleSortSelect("name-desc")}>
              Name (Z-A)
            </div>
            <div className="dropdown-item" onClick={() => handleSortSelect("ext-asc")}>
              Extension (A-Z)
            </div>
            <div className="dropdown-item" onClick={() => handleSortSelect("ext-desc")}>
              Extension (Z-A)
            </div>
            <div className="dropdown-item" onClick={() => handleSortSelect("date-newest")}>
              Date (Newest)
            </div>
          </div>
        )}
      </div>
      
      <button 
        className="file-tree-btn" 
        onClick={() => {
          setActiveDropdown(null); // Close any open dropdown
          onOpenIgnorePatterns();
        }}
        title="Ignore Patterns"
      >
        <Filter size={16} />
      </button>
      
      <div className="dropdown-container">
        <button 
          className={`file-tree-btn ${activeDropdown === 'clear' ? 'active' : ''}`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation(); // Prevent immediate closure
            toggleDropdown('clear');
          }}
          title="Clear"
        >
          <X size={16} />
        </button>
        
        {activeDropdown === 'clear' && (
          <div className="dropdown-menu" ref={clearMenuRef}>
            <div className="dropdown-item" onClick={() => handleClearSelect('clear')}>
              Clear selection
            </div>
            <div className="dropdown-item" onClick={() => handleClearSelect('removeAll')}>
              Remove All Folders
            </div>
          </div>
        )}
      </div>
      
      <button 
        className="file-tree-btn" 
        onClick={() => {
          setActiveDropdown(null); // Close any open dropdown
          onReloadFileTree();
        }}
        title="Reload"
      >
        <RefreshCw size={16} />
      </button>
    </div>
  );
};

export default FileTreeHeader; 