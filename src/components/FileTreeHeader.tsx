import React, { useCallback } from "react"; // Import useCallback
import { Folder, Filter, X, RefreshCw } from "lucide-react"; // Removed unused sort icons
import { SortOrder } from "../types/FileTypes";
import { Button } from "./ui";
import { Dropdown } from "./ui/Dropdown";
import { getSortIcon } from "../utils/sortIcons"; // Keep this utility
import styles from "./FileTreeHeader.module.css";

// Removed unused sortIconMap and iconComponents

interface FileTreeHeaderProps {
  onOpenFolder: () => void;
  onSortChange: (sortOrder: SortOrder) => void;
  onClearSelection: () => void; // Should trigger dialog in App
  onRemoveAllFolders: () => void; // Should trigger dialog in App
  onReloadFileTree: () => void;
  onOpenIgnorePatterns: () => void; // Simplified: always opens modal
  excludedFilesCount?: number;
  currentSortOrder?: SortOrder;
}

// Keep sortOptions definition
const sortOptions = [
  { value: "name-ascending", label: "Name (A to Z)" },
  { value: "name-descending", label: "Name (Z to A)" },
  { value: "tokens-ascending", label: "Tokens (Asc)" }, // Updated labels for brevity if desired
  { value: "tokens-descending", label: "Tokens (Desc)" },
  { value: "date-ascending", label: "Date (Oldest)" },
  { value: "date-descending", label: "Date (Newest)" }
];

// Keep clearOptions definition
const clearOptions = [
  { value: "clear", label: "Clear selection" },
  { value: "removeAll", label: "Remove All Folders" },
];

const FileTreeHeader: React.FC<FileTreeHeaderProps> = ({ // Use React.FC for consistency
  onOpenFolder,
  onSortChange,
  onClearSelection,
  onRemoveAllFolders,
  onReloadFileTree,
  onOpenIgnorePatterns,
  excludedFilesCount,
  currentSortOrder,
}) => {

  // Use useCallback for handlers passed to Dropdown
  const handleSortSelect = useCallback((value: string | string[]) => {
    if (typeof value === 'string') {
        onSortChange(value as SortOrder);
    }
  }, [onSortChange]);

  const handleClearSelect = useCallback((value: string | string[]) => {
    if (typeof value === 'string') {
      if (value === 'clear') onClearSelection();
      else if (value === 'removeAll') onRemoveAllFolders();
    }
  }, [onClearSelection, onRemoveAllFolders]);

  return (
    <>
      <div className={styles.fileTreeHeader}>
        <Button variant="icon" size="sm" iconOnly startIcon={<Folder size={16} />} onClick={onOpenFolder} title="Select Folder" className={styles.fileTreeBtn} />
        <div className={styles.dropdownContainer}>
          <Dropdown
            options={sortOptions}
            onChange={handleSortSelect}
            value={currentSortOrder}
            trigger={<Button variant="icon" size="sm" iconOnly startIcon={getSortIcon(currentSortOrder)} title="Sort By" className={styles.fileTreeBtn} />}
            menuClassName={styles.headerDropdownMenu} // Ensure this class exists or remove
          />
        </div>
        <Button variant="icon" size="sm" iconOnly startIcon={<Filter size={16} />} onClick={onOpenIgnorePatterns} title="Ignore Patterns" className={styles.fileTreeBtn} />
        <div className={styles.dropdownContainer}>
          <Dropdown
            options={clearOptions}
            onChange={handleClearSelect}
            trigger={<Button variant="icon" size="sm" iconOnly startIcon={<X size={16} />} title="Clear Actions" className={styles.fileTreeBtn} />}
            menuClassName={styles.headerDropdownMenu} // Ensure this class exists or remove
          />
        </div>
        <Button variant="icon" size="sm" iconOnly startIcon={<RefreshCw size={16} />} onClick={onReloadFileTree} title="Reload" className={styles.fileTreeBtn} />
      </div>

      {excludedFilesCount !== undefined && excludedFilesCount > 0 && (
        <div className={styles.excludedFilesCount}>
          {excludedFilesCount} {excludedFilesCount === 1 ? 'file' : 'files'} excluded
        </div>
      )}
    </>
  );
};

export default FileTreeHeader; // Add default export if not already present