import React, { useState, useRef, useEffect } from "react";
import { Folder, ArrowUpDown, Filter, X, RefreshCw } from "lucide-react";
import { SortOrder } from "../types/FileTypes";
import { Button } from "./ui";
import styles from "./FileTreeHeader.module.css";

interface FileTreeHeaderProps {
  onOpenFolder: () => void;
  onSortChange: (sortOrder: SortOrder) => void;
  onClearSelection: () => void;
  onRemoveAllFolders: () => void;
  onReloadFileTree: () => void;
  onOpenIgnorePatterns: (isGlobal: boolean) => void;
  excludedFilesCount?: number;
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
  excludedFilesCount,
}: FileTreeHeaderProps): JSX.Element => {
  // Single state to track which dropdown is currently open
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  
  // Refs for click detection
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const clearMenuRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Close sort dropdown if click is outside
      if (
        activeDropdown === 'sort' && 
        sortMenuRef.current && 
        !sortMenuRef.current.contains(event.target as Node)
      ) {
        // Check if the click was on the sort button itself
        const sortButton = document.querySelector(`.${styles.sortButton}`);
        if (!sortButton?.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
      
      // Close clear dropdown if click is outside
      if (
        activeDropdown === 'clear' && 
        clearMenuRef.current && 
        !clearMenuRef.current.contains(event.target as Node)
      ) {
        // Check if the click was on the clear button itself
        const clearButton = document.querySelector(`.${styles.clearButton}`);
        if (!clearButton?.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };
    
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [activeDropdown]);
  
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
    <>
      <div className={styles.fileTreeHeader}>
        <Button 
          variant="secondary"
          size="sm"
          iconOnly
          startIcon={<Folder size={16} />}
          onClick={() => {
            setActiveDropdown(null); // Close any open dropdown
            onOpenFolder();
          }}
          title="Select Folder"
          className={styles.fileTreeBtn}
        />
        
        <div className={styles.dropdownContainer}>
          <Button 
            variant="secondary"
            size="sm"
            iconOnly
            startIcon={<ArrowUpDown size={16} />}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation(); // Prevent immediate closure
              toggleDropdown('sort');
            }}
            title="Sort"
            className={`${styles.fileTreeBtn} ${styles.sortButton} ${activeDropdown === 'sort' ? styles.active : ''}`}
          />
          
          {activeDropdown === 'sort' && (
            <div className={styles.dropdownMenu} ref={sortMenuRef}>
              <div className={styles.dropdownItem} onClick={() => handleSortSelect("name-asc")}>
                Name (A-Z)
              </div>
              <div className={styles.dropdownItem} onClick={() => handleSortSelect("name-desc")}>
                Name (Z-A)
              </div>
              <div className={styles.dropdownItem} onClick={() => handleSortSelect("ext-asc")}>
                Extension (A-Z)
              </div>
              <div className={styles.dropdownItem} onClick={() => handleSortSelect("ext-desc")}>
                Extension (Z-A)
              </div>
              <div className={styles.dropdownItem} onClick={() => handleSortSelect("date-newest")}>
                Date (Newest)
              </div>
            </div>
          )}
        </div>
        
        <Button 
          variant="secondary"
          size="sm"
          iconOnly
          startIcon={<Filter size={16} />}
          onClick={() => {
            setActiveDropdown(null); // Close any open dropdown
            onOpenIgnorePatterns(false); // Open ignore patterns modal with local patterns by default
          }}
          title="Ignore Patterns"
          className={styles.fileTreeBtn}
        />
        
        <div className={styles.dropdownContainer}>
          <Button 
            variant="secondary"
            size="sm"
            iconOnly
            startIcon={<X size={16} />}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation(); // Prevent immediate closure
              toggleDropdown('clear');
            }}
            title="Clear"
            className={`${styles.fileTreeBtn} ${styles.clearButton} ${activeDropdown === 'clear' ? styles.active : ''}`}
          />
          
          {activeDropdown === 'clear' && (
            <div className={styles.dropdownMenu} ref={clearMenuRef}>
              <div className={styles.dropdownItem} onClick={() => handleClearSelect('clear')}>
                Clear selection
              </div>
              <div className={styles.dropdownItem} onClick={() => handleClearSelect('removeAll')}>
                Remove All Folders
              </div>
            </div>
          )}
        </div>
        
        <Button 
          variant="secondary"
          size="sm"
          iconOnly
          startIcon={<RefreshCw size={16} />}
          onClick={() => {
            setActiveDropdown(null); // Close any open dropdown
            onReloadFileTree();
          }}
          title="Reload"
          className={styles.fileTreeBtn}
        />
      </div>
      
      {/* Display excluded files count if provided */}
      {excludedFilesCount !== undefined && excludedFilesCount > 0 && (
        <div className={styles.excludedFilesCount}>
          {excludedFilesCount} {excludedFilesCount === 1 ? 'file' : 'files'} excluded by ignore patterns
        </div>
      )}
    </>
  );
};

export default FileTreeHeader; 