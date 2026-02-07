import { useState, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useBookmarks } from '../context/BookmarkContext';
import { debounce } from '../utils/helpers';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { searchBookmarks, clearFilters } = useBookmarks();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      searchBookmarks(query);
    }, 300),
    [searchBookmarks]
  );

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  // Handle clear
  const handleClear = () => {
    setInputValue('');
    clearFilters();
  };

  return (
    <div className="relative w-full">
      {/* Search icon */}
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />

      {/* Input */}
      <input
        type="text"
        className="w-full pl-11 pr-10 py-2.5 bg-slate-100 border border-transparent rounded-full
                   text-slate-800 placeholder-slate-400 text-sm
                   focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                   transition-all duration-200"
        placeholder="Search bookmarks by name, tag, or description..."
        value={inputValue}
        onChange={handleChange}
      />

      {/* Clear button */}
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 
                     text-slate-400 hover:text-slate-600 hover:bg-slate-200 
                     rounded-full transition-colors"
          aria-label="Clear search"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;