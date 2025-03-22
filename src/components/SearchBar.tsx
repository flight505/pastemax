import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
}: SearchBarProps) => {
  // Create a custom end icon that clears the search when clicked
  const ClearButton = searchTerm ? (
    <button
      className={styles.clearButton}
      onClick={() => onSearchChange("")}
      aria-label="Clear search"
    >
      <X size={14} />
    </button>
  ) : null;

  return (
    <div className={styles.searchBarWrapper}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        isSearchInput
        startIcon={<Search size={16} />}
        endIcon={ClearButton}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
