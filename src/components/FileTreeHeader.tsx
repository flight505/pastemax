import React, { useState } from "react";
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

const FileTreeHeader = ({
  onOpenFolder,
  onSortChange,
  onClearSelection,
  onRemoveAllFolders,
  onReloadFileTree,
  onOpenIgnorePatterns,
}: FileTreeHeaderProps): JSX.Element => {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [clearDropdownOpen, setClearDropdownOpen] = useState(false);

  return (
    <div className="file-tree-header">
      <button 
        className="file-tree-btn" 
        onClick={onOpenFolder} 
        title="Select Folder"
      >
        <Folder size={16} />
      </button>
      
      <div className="dropdown-container">
        <button 
          className="file-tree-btn"
          onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
          title="Sort"
        >
          <ArrowUpDown size={16} />
        </button>
        
        {sortDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => { onSortChange("name-asc"); setSortDropdownOpen(false); }}>
              Name (A-Z)
            </div>
            <div className="dropdown-item" onClick={() => { onSortChange("name-desc"); setSortDropdownOpen(false); }}>
              Name (Z-A)
            </div>
            <div className="dropdown-item" onClick={() => { onSortChange("ext-asc"); setSortDropdownOpen(false); }}>
              Extension (A-Z)
            </div>
            <div className="dropdown-item" onClick={() => { onSortChange("ext-desc"); setSortDropdownOpen(false); }}>
              Extension (Z-A)
            </div>
            <div className="dropdown-item" onClick={() => { onSortChange("date-newest"); setSortDropdownOpen(false); }}>
              Date (Newest)
            </div>
          </div>
        )}
      </div>
      
      <button 
        className="file-tree-btn" 
        onClick={onOpenIgnorePatterns}
        title="Ignore Patterns"
      >
        <Filter size={16} />
      </button>
      
      <div className="dropdown-container">
        <button 
          className="file-tree-btn"
          onClick={() => setClearDropdownOpen(!clearDropdownOpen)}
          title="Clear"
        >
          <X size={16} />
        </button>
        
        {clearDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => { onClearSelection(); setClearDropdownOpen(false); }}>
              Clear selection
            </div>
            <div className="dropdown-item" onClick={() => { onRemoveAllFolders(); setClearDropdownOpen(false); }}>
              Remove All Folders
            </div>
          </div>
        )}
      </div>
      
      <button 
        className="file-tree-btn" 
        onClick={onReloadFileTree}
        title="Reload"
      >
        <RefreshCw size={16} />
      </button>
    </div>
  );
};

export default FileTreeHeader; 