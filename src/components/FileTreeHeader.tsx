import React from "react";
import { Folder, ArrowUpDown, Filter, X, RefreshCw } from "lucide-react";
import { SortOrder } from "../types/FileTypes";
import { Button } from "./ui";
import { Dropdown } from "./ui/Dropdown";
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

const sortOptions = [
  { value: "name-asc", label: "Name (⬆ A-Z)" },
  { value: "name-desc", label: "Name (⬇ Z-A)" },
  { value: "ext-asc", label: "Extension (⬆ A-Z)" },
  { value: "ext-desc", label: "Extension (⬇ Z-A)" },
  { value: "date-newest", label: "Date (⬇ Newest)" },
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
            trigger={
              <Button 
                variant="icon"
                size="sm"
                iconOnly
                startIcon={<ArrowUpDown size={16} />}
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