import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import bookmarkService from '../services/bookmarkService';
import showToast from '../utils/toast';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  // State
  const [bookmarks, setBookmarks] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  // Fetch all bookmarks based on current filters
  const fetchBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let params = {};
      if (selectedTag) params.tag = selectedTag;
      if (searchQuery) params.search = searchQuery;
      if (showFavorites) params.favorite = 'true';

      const response = await bookmarkService.getAll(params);
      setBookmarks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookmarks');
      showToast.error('Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  }, [selectedTag, searchQuery, showFavorites]);

  // Fetch all unique tags
  const fetchTags = useCallback(async () => {
    try {
      const response = await bookmarkService.getAllTags();
      setTags(response.data);
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchBookmarks();
    fetchTags();
  }, [fetchBookmarks, fetchTags]);

  // Add new bookmark
  const addBookmark = async (bookmarkData) => {
    try {
      const response = await bookmarkService.create(bookmarkData);
      setBookmarks((prev) => [response.data, ...prev]);
      await fetchTags();
      showToast.success('Bookmark added successfully!');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to add bookmark';
      showToast.error(message);
      return { success: false, message };
    }
  };

  // Update existing bookmark
  const updateBookmark = async (id, bookmarkData) => {
    try {
      const response = await bookmarkService.update(id, bookmarkData);
      setBookmarks((prev) =>
        prev.map((bookmark) => (bookmark._id === id ? response.data : bookmark))
      );
      await fetchTags();
      showToast.success('Bookmark updated successfully!');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update bookmark';
      showToast.error(message);
      return { success: false, message };
    }
  };

  // Delete bookmark
  const deleteBookmark = async (id) => {
    try {
      await bookmarkService.delete(id);
      setBookmarks((prev) => prev.filter((bookmark) => bookmark._id !== id));
      await fetchTags();
      showToast.success('Bookmark deleted successfully!');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete bookmark';
      showToast.error(message);
      return { success: false, message };
    }
  };

  // Toggle bookmark favorite status
  const toggleFavorite = async (id) => {
    try {
      const response = await bookmarkService.toggleFavorite(id);
      setBookmarks((prev) =>
        prev.map((bookmark) => (bookmark._id === id ? response.data : bookmark))
      );
      showToast.success(
        response.data.isFavorite ? 'Added to favorites!' : 'Removed from favorites!'
      );
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update favorite';
      showToast.error(message);
      return { success: false, message };
    }
  };

  // Filter by tag
  const filterByTag = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setSearchQuery('');
    setShowFavorites(false);
  };

  // Search bookmarks
  const searchBookmarks = (query) => {
    setSearchQuery(query);
    setSelectedTag(null);
    setShowFavorites(false);
  };

  // Toggle favorites filter
  const toggleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
    setSelectedTag(null);
    setSearchQuery('');
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTag(null);
    setSearchQuery('');
    setShowFavorites(false);
  };

  // Refresh all data
  const refreshData = async () => {
    await Promise.all([fetchBookmarks(), fetchTags()]);
  };

  const value = {
    bookmarks,
    tags,
    loading,
    error,
    selectedTag,
    searchQuery,
    showFavorites,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    toggleFavorite,
    filterByTag,
    searchBookmarks,
    toggleShowFavorites,
    clearFilters,
    refreshData,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export default BookmarkContext;