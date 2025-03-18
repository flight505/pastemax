import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input, Button } from '../ui';

/**
 * Example enhanced search bar component using the new UI components
 */
export interface SearchBarProps {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;
  
  /**
   * Handler for search submission
   */
  onSearch: (query: string) => void;
  
  /**
   * Initial search value
   */
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  initialValue = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        isSearchInput
        startIcon={<Search size={16} />}
        style={{ flexGrow: 1 }}
      />
      <Button
        variant="secondary"
        size="md"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar; 