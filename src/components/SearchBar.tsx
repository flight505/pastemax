import React from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className={styles.searchContainer}>
      <Search size={14} className={styles.searchIcon} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search files..."
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;