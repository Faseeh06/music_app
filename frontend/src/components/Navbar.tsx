import React, { useState, useRef, useEffect } from 'react';
import { Settings, LogOut, User, Search, Mic, Filter, X, History, TrendingUp, Bell } from 'lucide-react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { logout, currentUser } = useAuth();

  // Sync search query with URL parameters when on search page
  useEffect(() => {
    if (location.pathname === '/search') {
      const query = searchParams.get('q');
      if (query && query !== searchQuery) {
        setSearchQuery(query);
      }
    }
  }, [location.pathname, searchParams, searchQuery]);

  // Mock recent searches and trending
  const recentSearches = ['Perfect - Ed Sheeran', 'Hotel California', 'Wonderwall'];
  const trendingSearches = ['Billie Eilish', 'Taylor Swift', 'The Beatles'];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setSearchFocused(false);
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice search
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Perfect by Ed Sheeran');
    }, 2000);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    // Delay to allow clicking on suggestions
    setTimeout(() => {
      setSearchFocused(false);
      setShowSuggestions(false);
    }, 200);
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    if (dropdownOpen || showSuggestions) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen, showSuggestions]);

  return (
    <header className="w-full bg-transparent py-6 flex items-center justify-between">
      {/* Left: Enhanced Search Bar */}
      <div className="flex-1 max-w-2xl ml-32" ref={searchRef}>
        <div className="relative">
          {/* Main Search Input */}
          <div className={`relative transition-all duration-300 ease-in-out ${
            searchFocused ? 'transform scale-105 shadow-2xl' : 'shadow-lg'
          }`}>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200">
              <Search className={`w-5 h-5 ${searchFocused ? 'text-brand-brown' : 'text-gray-400'}`} />
            </div>
            
        <input
          type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onKeyDown={handleSearch}
          placeholder="Search songs, playlists, albums, artists, etc..."
              className={`w-full rounded-2xl pl-12 pr-32 py-3 bg-[#101218]/90 backdrop-blur-sm text-white placeholder:text-gray-400 border transition-all duration-300 ease-in-out text-base font-medium ${
                searchFocused 
                  ? 'border-brand-brown bg-[#101218] focus:outline-none' 
                  : 'border-white hover:border-gray-300'
              }`}
            />

            {/* Right side buttons */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="p-2 rounded-full hover:bg-gray-700/50 transition-all duration-200 group"
                >
                  <X className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </button>
              )}
              
              <button
                onClick={handleVoiceSearch}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isListening 
                    ? 'bg-red-600/20 text-red-400 animate-pulse' 
                    : 'hover:bg-gray-700/50 text-gray-400 hover:text-brand-brown'
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
              
              <button className="p-2 rounded-full hover:bg-gray-700/50 transition-all duration-200 text-gray-400 hover:text-brand-brown">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#101218] rounded-2xl shadow-2xl border border-gray-700 z-50 overflow-hidden animate-fade-in">
              <div className="max-h-96 overflow-y-auto">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center gap-2 mb-3">
                      <History className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300">Recent searches</span>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-150 text-white flex items-center gap-3"
                          onClick={() => {
                            setSearchQuery(search);
                            navigate(`/search?q=${encodeURIComponent(search)}`);
                            setShowSuggestions(false);
                          }}
                        >
                          <History className="w-4 h-4 text-gray-400" />
                          <span>{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-brand-brown" />
                    <span className="text-sm font-medium text-gray-300">Trending</span>
                  </div>
                  <div className="space-y-2">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-150 text-white flex items-center gap-3"
                        onClick={() => {
                          setSearchQuery(search);
                          navigate(`/search?q=${encodeURIComponent(search)}`);
                          setShowSuggestions(false);
                        }}
                      >
                        <TrendingUp className="w-4 h-4 text-brand-brown" />
                        <span>{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Enhanced Header Actions */}
      <div className="flex items-center gap-3 mr-32 relative">
        {/* Notifications Button */}
        <div className="relative">
          <button className="p-3 rounded-xl hover:bg-gray-800/30 transition-all duration-200 group">
            <Bell className="w-6 h-6 text-gray-300 group-hover:text-brand-brown transition-colors" />
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#101218]"></div>
          </button>
        </div>
        
        {/* Settings Button */}
        <button className="p-3 rounded-xl hover:bg-gray-800/30 transition-all duration-200 group">
          <Settings className="w-6 h-6 text-gray-300 group-hover:text-brand-brown transition-colors" />
        </button>
        
        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-800/30 transition-all duration-200"
            onClick={() => setDropdownOpen((v) => !v)}
          >
            <img
              src={currentUser?.photoURL || "https://picsum.photos/48"}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-brand-brown shadow-lg"
            />
            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-white">
                {currentUser?.displayName || 'User'}
              </div>
              <div className="text-xs text-gray-400">Premium Member</div>
            </div>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-[#101218] rounded-xl shadow-2xl border border-gray-700 z-50 animate-fade-in">
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <img
                    src={currentUser?.photoURL || "https://picsum.photos/40"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border border-brand-brown"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {currentUser?.displayName || 'User'}
                    </div>
                    <div className="text-xs text-gray-400">{currentUser?.email}</div>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
              <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-800/50 transition-colors"
                onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
              >
                  <User className="w-5 h-5" /> 
                  <span>Profile Settings</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-800/50 transition-colors"
                  onClick={() => { setDropdownOpen(false); navigate('/settings'); }}
                >
                  <Settings className="w-5 h-5" /> 
                  <span>Preferences</span>
                </button>
              </div>
              
              <div className="border-t border-gray-700 py-2">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 transition-colors rounded-b-xl"
                onClick={() => { setDropdownOpen(false); handleLogout(); }}
              >
                  <LogOut className="w-5 h-5" /> 
                  <span>Sign Out</span>
              </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar; 