import React, { useState, useRef } from 'react';
import { Settings, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
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
        <input
          type="text"
          placeholder="Search songs, playlists, albums, artists, etc..."
          className="w-full rounded-xl px-6 py-3 bg-white text-brand-dark placeholder:text-brand-brown/60 shadow-md border border-brand-brown/30 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent text-lg font-medium transition-all duration-200"
        />
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
          >            <img
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
              </button>              <button
                className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-gray-50 rounded-b-xl"
                onClick={() => { setDropdownOpen(false); handleLogout(); }}
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar; 