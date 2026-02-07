import { FiTag, FiStar, FiGrid, FiX } from 'react-icons/fi';
import { useBookmarks } from '../context/BookmarkContext';

const Sidebar = ({ isOpen, onClose }) => {
  const {
    tags,
    selectedTag,
    showFavorites,
    filterByTag,
    toggleShowFavorites,
    clearFilters,
    bookmarks,
  } = useBookmarks();

  const favoritesCount = bookmarks.filter((b) => b.isFavorite).length;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-slate-200
          overflow-y-auto z-40 transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Header (mobile only) */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 lg:hidden">
          <h2 className="font-semibold text-slate-800">Filters</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-4">
          {/* Quick filters */}
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
              Quick Filters
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={clearFilters}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                    ${!selectedTag && !showFavorites
                      ? 'bg-primary-500 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                    }
                  `}
                >
                  <FiGrid className="text-lg" />
                  <span className="flex-1">All Bookmarks</span>
                  <span
                    className={`
                    text-xs font-medium px-2 py-0.5 rounded-full
                    ${!selectedTag && !showFavorites ? 'bg-white/20' : 'bg-slate-100'}
                  `}
                  >
                    {bookmarks.length}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={toggleShowFavorites}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                    ${showFavorites
                      ? 'bg-primary-500 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                    }
                  `}
                >
                  <FiStar className="text-lg" />
                  <span className="flex-1">Favorites</span>
                  <span
                    className={`
                    text-xs font-medium px-2 py-0.5 rounded-full
                    ${showFavorites ? 'bg-white/20' : 'bg-slate-100'}
                  `}
                  >
                    {favoritesCount}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Tags section */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
              <FiTag className="text-sm" />
              Tags
            </h3>

            {tags.length === 0 ? (
              <p className="text-sm text-slate-400 px-2">No tags yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tagItem) => (
                  <button
                    key={tagItem.tag}
                    onClick={() => {
                      filterByTag(tagItem.tag);
                      onClose();
                    }}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                      transition-colors
                      ${selectedTag === tagItem.tag
                        ? 'bg-primary-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-primary-100 hover:text-primary-700'
                      }
                    `}
                  >
                    <span>{tagItem.tag}</span>
                    <span
                      className={`
                      text-xs px-1.5 py-0.5 rounded-full
                      ${selectedTag === tagItem.tag ? 'bg-white/20' : 'bg-slate-200/70'}
                    `}
                    >
                      {tagItem.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;