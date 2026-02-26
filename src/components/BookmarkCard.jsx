import { useState } from 'react';
import {
  FiStar,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiCopy,
  FiMoreVertical,
} from 'react-icons/fi';
import { useBookmarks } from '../context/BookmarkContext';
import { formatRelativeTime, getFaviconUrl, truncateText, extractDomain } from '../utils/helpers';
import showToast from '../utils/toast';

const BookmarkCard = ({ bookmark, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { deleteBookmark, toggleFavorite } = useBookmarks();

  const { _id, url, name, description, tags, isFavorite, createdAt, favicon } = bookmark;

  console.log("url : ", url);


  // Handle delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      await deleteBookmark(_id);
    }
    setShowMenu(false);
  };

  // Handle copy URL
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    showToast.success('URL copied to clipboard!');
    setShowMenu(false);
  };

  // Handle favorite toggle
  const handleFavorite = async () => {
    await toggleFavorite(_id);
  };

  // Handle edit
  const handleEdit = () => {
    onEdit(bookmark);
    setShowMenu(false);
  };

  const faviconUrl = favicon || getFaviconUrl(url);

  return (
    <article className="card group group/title cursor-pointer relative flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-start gap-3 mb-3">

        {/* Favicon */}
        <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-slate-100">
          <img
            src={faviconUrl}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${name.charAt(0)}&background=6366f1&color=fff&size=40`;
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* <a
            href={extractDomain(url).href}
            target="_blank"
            rel="noopener noreferrer"
            className='h-[100%] flex flex-col justify-between '
          >
          </a> */}

          <a
            href={extractDomain(url).href}
            target="_blank"
            rel="noopener noreferrer"
            className=" relative w-[100%] inline-flex items-start gap-1.5 font-semibold text-slate-800 
             group-hover:text-primary-600 transition-colors"
          >
            <span className="line-clamp-2 leading-tight break-words" style={{ wordBreak: 'break-word' }}>
              {name}
            </span>
            <FiExternalLink className="shrink-0 text-sm opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Custom Tooltip that shows on hover */}
            <div className="absolute top-full left-0 mb-2 hidden group-hover/title:block w-max max-w-[250px] whitespace-normal bg-slate-800 text-white text-xs font-normal rounded py-1.5 px-2.5 z-50 shadow-xl">
              {name}
              <div className="absolute bottom-full left-4 -mt-px border-4 border-transparent border-b-slate-800"></div>
            </div>

          </a>
          <p className="text-sm text-slate-400 truncate">{extractDomain(url).domain}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 z-10">
          {/* Favorite button */}
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-lg transition-colors ${isFavorite
              ? 'text-amber-500 hover:bg-amber-50'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiStar className={isFavorite ? 'fill-current' : ''} />
          </button>

          {/* More options dropdown */}
          <div className="relative ">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="More options"
            >
              <FiMoreVertical />
            </button>

            {showMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />

                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200 
                                rounded-lg shadow-lg z-20 overflow-hidden animate-fade-in">
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 
                               hover:bg-slate-50 transition-colors text-left"
                  >
                    <FiEdit2 size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleCopyUrl}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 
                               hover:bg-slate-50 transition-colors text-left"
                  >
                    <FiCopy size={16} />
                    <span>Copy URL</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 
                               hover:bg-red-50 transition-colors text-left"
                  >
                    <FiTrash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-slate-500 leading-relaxed mb-3">
          {truncateText(description, 120)}
        </p>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-400">{formatRelativeTime(createdAt)}</span>
      </div>

    </article>
  );
};

export default BookmarkCard;