import api from './api';

/**
 * Bookmark API Service
 * Handles all bookmark-related API calls
 */
const bookmarkService = {
  // Get all bookmarks with optional filters
  getAll: async (params = {}) => {
    const response = await api.get('/bookmarks', { params });
    return response.data;
  },

  // Get single bookmark by ID
  getById: async (id) => {
    const response = await api.get(`/bookmarks/${id}`);
    return response.data;
  },

  // Create new bookmark
  create: async (bookmarkData) => {
    const response = await api.post('/bookmarks', bookmarkData);
    return response.data;
  },

  // Update existing bookmark
  update: async (id, bookmarkData) => {
    const response = await api.put(`/bookmarks/${id}`, bookmarkData);
    return response.data;
  },

  // Delete bookmark
  delete: async (id) => {
    const response = await api.delete(`/bookmarks/${id}`);
    return response.data;
  },

  // Toggle favorite status
  toggleFavorite: async (id) => {
    const response = await api.patch(`/bookmarks/${id}/favorite`);
    return response.data;
  },

  // Get all unique tags
  getAllTags: async () => {
    const response = await api.get('/tags');
    return response.data;
  },
};

export default bookmarkService;