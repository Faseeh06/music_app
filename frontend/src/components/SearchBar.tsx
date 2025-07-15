import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, Filter, Clock, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { addSearchTerm } from '../services/searchService';
import { useRecentSearches } from '../hooks/useRecentSearches';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { recentSearches, loading } = useRecentSearches();
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (searchTerm: string) => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm === '') return;

    // Save search term if user is logged in
    if (currentUser) {
      try {
        await addSearchTerm(currentUser.uid, trimmedTerm);
      } catch (error) {
        console.error('Failed to save search term:', error);
      }
    }

    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(trimmedTerm)}`);
    setShowDropdown(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const handleRecentSearchClick = (term: string) => {
    setQuery(term);
    handleSearch(term);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}分前`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}時間前`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}日前`;
    }
  };

  console.log("SearchBar rendered with recent searches:", recentSearches);

  return (
    <div className="w-full max-w-4xl mx-auto px-4" ref={searchBarRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="楽曲、アーティスト、ジャンルを検索..."
          className="w-full h-14 pl-12 pr-24 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent text-lg shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <button
            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Recent Searches Dropdown */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                検索履歴を読み込み中...
              </div>
            ) : recentSearches.length > 0 ? (
              <>
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Clock className="w-4 h-4" />
                    最近の検索
                  </div>
                </div>
                {recentSearches.map((search) => (
                  <div
                    key={search.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer group"
                    onClick={() => handleRecentSearchClick(search.term)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">{search.term}</div>
                        <div className="text-xs text-gray-500">
                          {formatTimeAgo(search.searchedAt)}
                        </div>
                      </div>
                    </div>
                    <button
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implement remove search functionality if needed
                      }}
                    >
                      <X className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                ))}
              </>
            ) : currentUser ? (
              <div className="p-4 text-center text-gray-500">
                検索履歴がありません
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                ログインして検索履歴を保存
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;