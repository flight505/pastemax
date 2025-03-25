import React from "react";
import { 
  Folder, 
  Filter, 
  X, 
  RefreshCw, 
  ArrowUpDown,        // Default icon
  ArrowDownAZ,        // For name-ascending
  ArrowUpZA,          // For name-descending
  ArrowUp01,          // For tokens-ascending
  ArrowDown10,        // For tokens-descending
  ArrowUpNarrowWide,  // For date-ascending
  ArrowDownWideNarrow // For date-descending
} from "lucide-react";
import { SortOrder } from "../types/FileTypes";
import { Button } from "./ui";
import { Dropdown } from "./ui/Dropdown";
import { getSortIcon } from "../utils/sortIcons";
import styles from "./FileTreeHeader.module.css";

// Map sort options to corresponding Lucide icons
const sortIconMap = {
  "name-ascending": "ArrowDownAZ",
  "name-descending": "ArrowUpZA",
  "tokens-ascending": "ArrowUp01",
  "tokens-descending": "ArrowDown10",
  "date-ascending": "ArrowUpNarrowWide",
  "date-descending": "ArrowDownWideNarrow"
};

// Icon component lookup for direct reference
const iconComponents = {
  "ArrowDownAZ": ArrowDownAZ,
  "ArrowUpZA": ArrowUpZA,
  "ArrowUp01": ArrowUp01,
  "ArrowDown10": ArrowDown10,
  "ArrowUpNarrowWide": ArrowUpNarrowWide,
  "ArrowDownWideNarrow": ArrowDownWideNarrow,
  "ArrowUpDown": ArrowUpDown  // Default
};

interface FileTreeHeaderProps {
  onOpenFolder: () => void;
  onSortChange: (sortOrder: SortOrder) => void;
  onClearSelection: () => void;
  onRemoveAllFolders: () => void;
  onReloadFileTree: () => void;
  onOpenIgnorePatterns: (isGlobal: boolean) => void;
  excludedFilesCount?: number;
  currentSortOrder?: SortOrder;
}

const sortOptions = [
  { value: "name-ascending", label: "Name (A to Z)" },
  { value: "name-descending", label: "Name (Z to A)" },
  { value: "tokens-ascending", label: "Tokens (Fewest first)" },
  { value: "tokens-descending", label: "Tokens (Most first)" },
  { value: "date-ascending", label: "Date (Oldest first)" },
  { value: "date-descending", label: "Date (Newest first)" }
];

const clearOptions = [
  { value: "clear", label: "Clear selection" },
  { value: "removeAll", label: "Remove All Folders" },
];

const FileTreeHeader = ({
  onOpenFolder,
  onSortChange,
  onClearSelection,
  onRemoveAllFolders,
  onReloadFileTree,
  onOpenIgnorePatterns,
  excludedFilesCount,
  currentSortOrder,
}: FileTreeHeaderProps): JSX.Element => {
  
  const handleSortSelect = (value: string | string[]) => {
    onSortChange(value as SortOrder);
  };

  const handleClearSelect = (value: string | string[]) => {
    if (typeof value === 'string') {
      if (value === 'clear') {
        onClearSelection();
      } else if (value === 'removeAll') {
        onRemoveAllFolders();
      }
    }
  };

  return (
    <>
      <div className={styles.fileTreeHeader}>
        <Button 
          variant="icon"
          size="sm"
          iconOnly
          startIcon={<Folder size={16} />}
          onClick={onOpenFolder}
          title="Select Folder"
          className={styles.fileTreeBtn}
        />
        
        <div className={styles.dropdownContainer}>
          <Dropdown
            options={sortOptions}
            onChange={handleSortSelect}
            placeholder="Sort by..."
            value={currentSortOrder}
            trigger={
              <Button 
                variant="icon"
                size="sm"
                iconOnly
                startIcon={getSortIcon(currentSortOrder)}
                title="Sort By"
                className={styles.fileTreeBtn}
              />
            }
            menuClassName={styles.headerDropdownMenu}
          />
        </div>
        
        <Button 
          variant="icon"
          size="sm"
          iconOnly
          startIcon={<Filter size={16} />}
          onClick={() => onOpenIgnorePatterns(false)}
          title="Ignore Patterns"
          className={styles.fileTreeBtn}
        />
        
        <div className={styles.dropdownContainer}>
          <Dropdown
            options={clearOptions}
            onChange={handleClearSelect}
            placeholder="Clear options..."
            trigger={
              <Button 
                variant="icon"
                size="sm"
                iconOnly
                startIcon={<X size={16} />}
                title="Clear"
                className={styles.fileTreeBtn}
              />
            }
            menuClassName={styles.headerDropdownMenu}
          />
        </div>
        
        <Button 
          variant="icon"
          size="sm"
          iconOnly
          startIcon={<RefreshCw size={16} />}
          onClick={onReloadFileTree}
          title="Reload"
          className={styles.fileTreeBtn}
        />
      </div>
      
      {excludedFilesCount !== undefined && excludedFilesCount > 0 && (
        <div className={styles.excludedFilesCount}>
          {excludedFilesCount} {excludedFilesCount === 1 ? 'file' : 'files'} excluded by ignore patterns
        </div>
      )}
    </>
  );
};

export default FileTreeHeader; 