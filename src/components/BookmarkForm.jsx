import { useState, useEffect } from 'react';
import { FiX, FiLink, FiTag, FiFileText, FiBookmark } from 'react-icons/fi';
import { useBookmarks } from '../context/BookmarkContext';
import { isValidUrl } from '../utils/helpers';

const BookmarkForm = ({ isOpen, onClose, editBookmark = null }) => {
  const { addBookmark, updateBookmark } = useBookmarks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    url: '',
    name: '',
    description: '',
    tags: '',
  });

  // Populate form when editing
  useEffect(() => {
    if (editBookmark) {
      setFormData({
        url: editBookmark.url || '',
        name: editBookmark.name || '',
        description: editBookmark.description || '',
        tags: editBookmark.tags?.join(', ') || '',
      });
    } else {
      resetForm();
    }
  }, [editBookmark, isOpen]);

  const resetForm = () => {
    setFormData({ url: '', name: '', description: '', tags: '' });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const bookmarkData = {
        url: formData.url.trim(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        tags: formData.tags,
      };

      let result;
      if (editBookmark) {
        result = await updateBookmark(editBookmark._id, bookmarkData);
      } else {
        result = await addBookmark(bookmarkData);
      }

      if (result.success) {
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800">
            <FiBookmark className="text-primary-500" />
            {editBookmark ? 'Edit Bookmark' : 'Add New Bookmark'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* URL Field */}
          <div>
            <label htmlFor="url" className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
              <FiLink className="text-slate-400" />
              URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="url"
              name="url"
              className={`input ${errors.url ? 'input-error' : ''}`}
              placeholder="https://example.com"
              value={formData.url}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.url && <p className="mt-1 text-sm text-red-500">{errors.url}</p>}
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
              <FiBookmark className="text-slate-400" />
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`input ${errors.name ? 'input-error' : ''}`}
              placeholder="My Awesome Website"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
              <FiFileText className="text-slate-400" />
              Description <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className={`input resize-none ${errors.description ? 'input-error' : ''}`}
              placeholder="Brief description of this bookmark..."
              value={formData.description}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            <p className="mt-1 text-xs text-slate-400">{formData.description.length}/500 characters</p>
          </div>

          {/* Tags Field */}
          <div>
            <label htmlFor="tags" className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
              <FiTag className="text-slate-400" />
              Tags <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="input"
              placeholder="react, javascript, tutorial"
              value={formData.tags}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-slate-400">Separate tags with commas</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-sm" />
                  {editBookmark ? 'Updating...' : 'Adding...'}
                </>
              ) : editBookmark ? (
                'Update Bookmark'
              ) : (
                'Add Bookmark'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookmarkForm;