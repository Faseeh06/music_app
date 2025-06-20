import React, { useState, useRef } from 'react';
import { Settings, LogOut, User, Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  return (
    <header className="w-full bg-transparent py-6 flex items-center justify-between">
      {/* Left: Search Bar */}
      <div className="flex-1 max-w-2xl ml-32">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search songs, playlists, albums, artists, etc..."
            className="w-full h-12 pl-12 pr-4 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>
      {/* Right: Settings & Profile */}
      <div className="flex items-center gap-4 mr-32 relative">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Settings className="w-6 h-6 text-brand-brown" />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setDropdownOpen((v) => !v)}
          >
            <img
              src={currentUser?.photoURL || "https://picsum.photos/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-brand-brown"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fade-in">
              <button
                className="w-full flex items-center gap-2 px-4 py-3 text-brand-dark hover:bg-gray-50 rounded-t-xl"
                onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
              >
                <User className="w-5 h-5" /> Profile
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-gray-50 rounded-b-xl"
                onClick={() => { setDropdownOpen(false); handleLogout(); }}
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          )}
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;