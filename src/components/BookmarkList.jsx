import { FiBookmark, FiInbox } from 'react-icons/fi';
import { useBookmarks } from '../context/BookmarkContext';
import BookmarkCard from './BookmarkCard';

const BookmarkList = ({ onEditBookmark }) => {
  const { bookmarks, loading, error, selectedTag, searchQuery, showFavorites } = useBookmarks();

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="spinner" />
        <p className="text-slate-500">Loading bookmarks...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-red-500">❌ {error}</p>
      </div>
    );
  }

  // Empty state
  if (bookmarks.length === 0) {
    let emptyMessage = "You haven't saved any bookmarks yet.";
    let emptySubtext = "Click 'Add Bookmark' to save your first link!";

    if (selectedTag) {
      emptyMessage = `No bookmarks found with tag "${selectedTag}"`;
      emptySubtext = 'Try selecting a different tag';
    } else if (searchQuery) {
      emptyMessage = `No bookmarks found for "${searchQuery}"`;
      emptySubtext = 'Try a different search term';
    } else if (showFavorites) {
      emptyMessage = 'No favorite bookmarks yet';
      emptySubtext = 'Star some bookmarks to see them here';
    }

    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FiInbox className="text-6xl text-slate-300 mb-4" />
        <h3 className="text-xl font-semibold text-slate-700 mb-2">{emptyMessage}</h3>
        <p className="text-slate-500">{emptySubtext}</p>
      </div>
    );
  }

  // Get filter info
  const getFilterInfo = () => {
    if (selectedTag) return `Tag: ${selectedTag}`;
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (showFavorites) return 'Favorites';
    return 'All Bookmarks';
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FiBookmark className="text-xl text-primary-500" />
        <h2 className="text-lg font-semibold text-slate-800">{getFilterInfo()}</h2>
        <span className="text-sm text-slate-400">({bookmarks.length})</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark._id}
            bookmark={bookmark}
            onEdit={onEditBookmark}
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarkList;