import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Mic, 
  X, 
  Clock, 
  Filter, 
  Music, 
  Guitar, 
  Piano, 
  Drum, 
  Violin,
  Sliders,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  Clock as ClockIcon
} from 'lucide-react';
import Layout from './Layout';

interface SearchResult {
  id: string;
  title: string;
  artist: string;
  genre: string;
  instrument: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  thumbnail: string;
  rating: number;
  practiceCount: number;
}

interface SearchHistory {
  id: string;
  term: string;
  timestamp: Date;
}

const recentSearches = [
  { name: 'Solar', type: 'Artist', img: 'https://picsum.photos/200?random=1' },
  { name: 'Moon Byul', type: 'Artist', img: 'https://picsum.photos/200?random=2' },
  { name: 'MAMAMOO', type: 'Artist', img: 'https://picsum.photos/200?random=3' },
  { name: 'TheSafehouseProject', type: 'By Ellie', img: 'https://picsum.photos/200?random=4' },
  { name: '王嘉尔', type: 'Artist', img: 'https://picsum.photos/200?random=5' },
  { name: 'Priscilla Chan', type: 'Artist', img: 'https://picsum.photos/200?random=6' },
];

const topGenres = [
  { name: 'Pop', color: 'bg-brand-brown', img: 'https://picsum.photos/200?random=7' },
  { name: 'K-Pop', color: 'bg-brand-yellow', img: 'https://picsum.photos/200?random=8' },
  { name: 'Dance / Electronic', color: 'bg-brand-dark', img: 'https://picsum.photos/200?random=9' },
  { name: 'Rock', color: 'bg-brand-brown/80', img: 'https://picsum.photos/200?random=10' },
];

const browseAll = [
  { name: 'Podcasts', color: 'bg-brand-brown/80', img: 'https://picsum.photos/200?random=11' },
  { name: 'Made For You', color: 'bg-brand-yellow/80', img: 'https://picsum.photos/200?random=12' },
  { name: 'Charts', color: 'bg-brand-dark/80', img: 'https://picsum.photos/200?random=13' },
  { name: 'New Releases', color: 'bg-brand-brown', img: 'https://picsum.photos/200?random=14' },
  { name: 'Discover', color: 'bg-brand-yellow', img: 'https://picsum.photos/200?random=15' },
  { name: 'Live Events', color: 'bg-brand-dark', img: 'https://picsum.photos/200?random=16' },
  { name: 'At Home', color: 'bg-brand-brown/90', img: 'https://picsum.photos/200?random=17' },
];

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState({
    genre: '',
    instrument: '',
    duration: '',
    difficulty: '',
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Mock data for suggestions
  const popularSearches = [
    'Wonderwall',
    'Hotel California',
    'Stairway to Heaven',
    'Sweet Child O Mine',
    'Blackbird',
  ];

  // Mock data for search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Wonderwall',
      artist: 'Oasis',
      genre: 'Rock',
      instrument: 'Guitar',
      difficulty: 'Intermediate',
      duration: '4:18',
      thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.8,
      practiceCount: 1247
    },
    {
      id: '2',
      title: 'Hotel California',
      artist: 'Eagles',
      genre: 'Rock',
      instrument: 'Guitar',
      difficulty: 'Advanced',
      duration: '6:30',
      thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.9,
      practiceCount: 892
    },
    // Add more mock results as needed
  ];

  // Handle real-time search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        // Filter suggestions based on search query
        const filteredSuggestions = popularSearches.filter(term =>
          term.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filteredSuggestions);

        // Filter results based on search query and filters
        const filteredResults = mockResults.filter(result => {
          const matchesSearch = 
            result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.artist.toLowerCase().includes(searchQuery.toLowerCase());
          
          const matchesFilters = 
            (!filters.genre || result.genre === filters.genre) &&
            (!filters.instrument || result.instrument === filters.instrument) &&
            (!filters.difficulty || result.difficulty === filters.difficulty);

          return matchesSearch && matchesFilters;
        });

        setResults(filteredResults);
      } else {
        setSuggestions([]);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, filters]);

  // Handle voice search
  const startVoiceSearch = () => {
    setIsListening(true);
    // Implement speech recognition here
    // For now, we'll just simulate it
    setTimeout(() => {
      setSearchQuery('Wonderwall');
      setIsListening(false);
    }, 2000);
  };

  // Handle search history
  const addToHistory = (term: string) => {
    const newHistory: SearchHistory = {
      id: Date.now().toString(),
      term,
      timestamp: new Date(),
    };
    setSearchHistory(prev => [newHistory, ...prev].slice(0, 5));
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    addToHistory(term);
    setSuggestions([]);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="flex justify-center pb-8">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown w-6 h-6" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="What do you want to listen to?"
                className="w-full h-14 pl-12 pr-4 bg-white text-brand-dark border border-brand-brown/40 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent text-lg placeholder:text-brand-brown/60 transition-all"
              />
            </div>
          </div>

          {/* Recent Searches */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-brand-dark">Recent searches</h2>
              <button className="text-xs text-brand-brown hover:underline">SEE ALL</button>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {recentSearches.map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center w-24 group">
                  <img src={item.img} alt={item.name} className="w-20 h-20 rounded-full object-cover border-2 border-brand-brown/60" />
                  <button className="absolute top-0 right-0 bg-black bg-opacity-60 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4" />
                  </button>
                  <span className="mt-2 text-sm font-semibold truncate w-full text-center text-brand-brown">{item.name}</span>
                  <span className="text-xs text-gray-400 truncate w-full text-center">{item.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Genres */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-bold mb-4 text-brand-dark">Your top genres</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topGenres.map((genre, idx) => (
                <div key={idx} className={`relative rounded-xl h-32 flex items-end p-4 ${genre.color} cursor-pointer transition-transform hover:scale-105`}>
                  <span className="text-xl font-bold z-10 text-white drop-shadow-lg">{genre.name}</span>
                  <img src={genre.img} alt={genre.name} className="absolute right-2 bottom-2 w-16 h-16 object-cover rounded-md shadow-lg z-0 opacity-80" />
                </div>
              ))}
            </div>
          </div>

          {/* Browse All */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4 text-brand-dark">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {browseAll.map((cat, idx) => (
                <div key={idx} className={`relative rounded-xl h-28 flex items-end p-4 ${cat.color} cursor-pointer transition-transform hover:scale-105`}>
                  <span className="text-base font-bold z-10 text-white drop-shadow-lg">{cat.name}</span>
                  <img src={cat.img} alt={cat.name} className="absolute right-2 bottom-2 w-12 h-12 object-cover rounded-md shadow-lg z-0 opacity-80" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage; 