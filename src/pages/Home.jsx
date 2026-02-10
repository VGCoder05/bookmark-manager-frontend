// frontend/src/pages/Home.jsx

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BookmarkList from '../components/BookmarkList';
import BookmarkForm from '../components/BookmarkForm';
import MobileSearch from '../components/MobileSearch';

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editBookmark, setEditBookmark] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddClick = () => {
    setEditBookmark(null);
    setIsFormOpen(true);
  };

  const handleEditBookmark = (bookmark) => {
    setEditBookmark(bookmark);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditBookmark(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-slate-50">
      {/* Navbar */}
      <Navbar
        onAddClick={handleAddClick}
        onMenuClick={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen transition-all duration-300">
        {/* Mobile Search */}
        <div className="md:hidden p-4 bg-white border-b border-slate-200">
          <MobileSearch />
        </div>

        {/* Bookmark List */}
        <BookmarkList onEditBookmark={handleEditBookmark} />
      </main>

      {/* Bookmark Form Modal */}
      <BookmarkForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        editBookmark={editBookmark}
      />
    </div>
  );
};

export default Home;