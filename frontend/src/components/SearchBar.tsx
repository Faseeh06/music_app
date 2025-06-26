import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, Filter } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      console.log(`Searching for: ${query}`);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative">
        <input
          type="text"
          placeholder="楽曲、アーティスト、ジャンルを検索..."
          className="w-full h-14 pl-12 pr-24 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent text-lg shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
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
      </div>
    </div>
  );
};

export default SearchBar;