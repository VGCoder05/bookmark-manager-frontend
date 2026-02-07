// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookmarkProvider } from './context/BookmarkContext';
import Home from './pages/Home';

function App() {
  return (
    <BookmarkProvider>
      <Router>
        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastClassName="!rounded-xl !font-sans"
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </BookmarkProvider>
  );
}

export default App;