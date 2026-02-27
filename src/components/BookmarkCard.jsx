import { useState, useEffect, useRef } from 'react';
import {
  FiInfo, FiStar, FiEdit2, FiTrash2, FiExternalLink, FiCopy, FiMoreVertical,
} from 'react-icons/fi';
import { useBookmarks } from '../context/BookmarkContext';
import { formatRelativeTime, getFaviconUrl, truncateText, extractDomain } from '../utils/helpers';
import showToast from '../utils/toast';

const BookmarkCard = ({ bookmark, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const { deleteBookmark, toggleFavorite } = useBookmarks();
  const { _id, url, name, description, tags, isFavorite, createdAt, favicon } = bookmark;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) await deleteBookmark(_id);
    setShowMenu(false);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    showToast.success('URL copied to clipboard!');
    setShowMenu(false);
  };

  const handleFavorite = async () => await toggleFavorite(_id);
  const handleEdit = () => { onEdit(bookmark); setShowMenu(false); };

  const faviconUrl = favicon || getFaviconUrl(url);

  return (
    <article className="group flex flex-col justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-h-[160px]">
      
      {/* 1. Header: Meta Context */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <img
            src={faviconUrl}
            alt=""
            className="w-6 h-6 rounded bg-slate-100 object-cover shrink-0"
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${name.charAt(0)}&background=6366f1&color=fff&size=24`; }}
          />
          <span className="text-xs font-medium text-slate-600 truncate">{extractDomain(url).domain}</span>
          <span className="text-slate-300 text-xs">•</span>
          <span className="text-xs text-slate-400 shrink-0">{formatRelativeTime(createdAt)}</span>
        </div>

        {/* Top Right Action: More Menu */}
        <div className="relative shrink-0">
          <button onClick={() => setShowMenu(!showMenu)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
            <FiMoreVertical size={18} />
          </button>
          
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg z-20 overflow-hidden py-1">
                <button onClick={handleEdit} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <FiEdit2 size={14} /> Edit
                </button>
                <button onClick={handleCopyUrl} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <FiCopy size={14} /> Copy URL
                </button>
                <button onClick={handleDelete} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <FiTrash2 size={14} /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 2. Body: Primary Content */}
      <div className="flex-1 mb-4 relative">
        <a href={extractDomain(url).href} target="_blank" rel="noopener noreferrer" className="inline-block w-full group/link">
          <h3 className="text-base font-semibold text-slate-900 leading-snug line-clamp-2 group-hover/link:text-indigo-600 transition-colors mb-1.5 flex items-start gap-1.5">
            {name}
            <FiExternalLink className="shrink-0 text-sm opacity-0 group-hover/link:opacity-100 transition-opacity mt-0.5" />
          </h3>
        </a>
        {description && (
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* 3. Footer: Tags & Secondary Actions */}
      <div className="flex items-end justify-between gap-3 mt-auto">
        <div className="flex flex-wrap gap-1.5 overflow-hidden h-[24px]">
          {tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] font-medium tracking-wide">
              {tag}
            </span>
          ))}
          {tags?.length > 3 && (
            <span className="px-2.5 py-1 bg-slate-50 text-slate-400 rounded-full text-[11px] font-medium">
              +{tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <div className="relative" ref={tooltipRef}>
            <button 
              onClick={(e) => { e.preventDefault(); setShowTooltip(!showTooltip); }} 
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors md:hidden"
            >
              <FiInfo size={18} />
            </button>
            {showTooltip && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-slate-800 text-white text-xs rounded-lg p-2 z-50 shadow-xl md:hidden">
                {name}
              </div>
            )}
          </div>

          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full transition-all duration-300 ${isFavorite ? 'text-amber-500 bg-amber-50 scale-105' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
          >
            <FiStar size={18} className={isFavorite ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookmarkCard;
