import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import SearchBar from './SearchBar';

const MobileSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 w-full px-4 py-2.5 bg-slate-100 
                     text-slate-400 rounded-full text-sm"
        >
          <FiSearch />
          <span>Search bookmarks...</span>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchBar />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileSearch;