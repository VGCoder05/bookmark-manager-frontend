import { Link } from 'react-router-dom';
import { FiBookmark, FiPlus, FiMenu, FiX } from 'react-icons/fi';
import SearchBar from './SearchBar';

const Navbar = ({ onAddClick, onMenuClick, isSidebarOpen }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-800 font-bold text-xl hover:text-primary-600 transition-colors"
          >
            <FiBookmark className="text-primary-500 text-2xl" />
            <span className="hidden sm:inline">BookmarkHub</span>
          </Link>
        </div>

        {/* Center section - Search (hidden on mobile) */}
        <div className="hidden md:block flex-1 max-w-xl mx-8">
          <SearchBar />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <button onClick={onAddClick} className="btn btn-primary">
            <FiPlus size={20} />
            <span className="hidden sm:inline">Add Bookmark</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;