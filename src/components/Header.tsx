import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure path is correct

// Standard header layout used for most pages
function StandardHeader({ user, handleLogout }: { user: any; handleLogout: () => void }) {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex-none">
        <Link to={user ? '/homesearch' : '/'} className="text-2xl font-serif font-bold text-gray-900 hover:text-gray-700 transition-colors">
          Papyrus
        </Link>
      </div>
      <nav className="flex items-center gap-4 flex-none">
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Contact
        </a>
        {user ? (
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors text-sm font-medium"
          >
            Logout
          </button>
        ) : (
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm font-medium"
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
}

// Search results header layout with logo on far left and buttons on far right
function SearchResultsHeader({ user, handleLogout }: { user: any; handleLogout: () => void }) {
  return (
    <div className="max-w-8xl mx-auto flex justify-between">
      <div className="flex-none">
        <Link to={user ? '/homesearch' : '/'} className="text-2xl font-serif font-bold text-gray-900 hover:text-gray-700 transition-colors">
          Papyrus
        </Link>
      </div>
      <nav className="flex items-center gap-4 flex-none">
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Contact
        </a>
        {user ? (
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors text-sm font-medium"
          >
            Logout
          </button>
        ) : (
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm font-medium"
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
}

export function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut();
      // Optional: Show a success message
      // Navigate to landing page after logout
      navigate(user ? '/homesearch' : '/'); 
    } catch (error) {
      console.error("Logout failed:", error);
      // Optional: Show an error message to the user
    }
  };

  // Determine if we're on the search results page
  const isSearchResultsPage = location.pathname === '/search';

  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-sm"> {/* Added background and shadow */}
      {isSearchResultsPage ? (
        <SearchResultsHeader user={user} handleLogout={handleLogout} />
      ) : (
        <StandardHeader user={user} handleLogout={handleLogout} />
      )}
    </header>
  );
}