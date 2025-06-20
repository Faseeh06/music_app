import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSearchParams } from 'react-router-dom';
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
  Clock as ClockIcon,
  Play,
  Pause,
  TrendingUp
} from 'lucide-react';
import { useMusicPlayer, Track } from '../contexts/PlayerContext';

const recentSearches = [
  { name: 'Solar', type: 'Artist', img: 'https://picsum.photos/200?random=1' },
  { name: 'Moon Byul', type: 'Artist', img: 'https://picsum.photos/200?random=2' },
  { name: 'MAMAMOO', type: 'Artist', img: 'https://picsum.photos/200?random=3' },
  { name: 'TheSafehouseProject', type: 'By Ellie', img: 'https://picsum.photos/200?random=4' },
  { name: '王嘉尔', type: 'Artist', img: 'https://picsum.photos/200?random=5' },
  { name: 'Priscilla Chan', type: 'Artist', img: 'https://picsum.photos/200?random=6' },
];

const topGenres = [
  { name: 'Pop', color: 'bg-gradient-to-br from-brand-brown to-brand-brown/80', img: 'https://picsum.photos/200?random=7' },
  { name: 'K-Pop', color: 'bg-gradient-to-br from-purple-500 to-purple-600', img: 'https://picsum.photos/200?random=8' },
  { name: 'Dance / Electronic', color: 'bg-gradient-to-br from-blue-500 to-blue-600', img: 'https://picsum.photos/200?random=9' },
  { name: 'Rock', color: 'bg-gradient-to-br from-red-500 to-red-600', img: 'https://picsum.photos/200?random=10' },
];

const browseAll = [
  { name: 'Podcasts', color: 'bg-gradient-to-br from-green-500 to-green-600', img: 'https://picsum.photos/200?random=11' },
  { name: 'Made For You', color: 'bg-gradient-to-br from-yellow-500 to-yellow-600', img: 'https://picsum.photos/200?random=12' },
  { name: 'Charts', color: 'bg-gradient-to-br from-orange-500 to-orange-600', img: 'https://picsum.photos/200?random=13' },
  { name: 'New Releases', color: 'bg-gradient-to-br from-pink-500 to-pink-600', img: 'https://picsum.photos/200?random=14' },
  { name: 'Discover', color: 'bg-gradient-to-br from-indigo-500 to-indigo-600', img: 'https://picsum.photos/200?random=15' },
  { name: 'Live Events', color: 'bg-gradient-to-br from-teal-500 to-teal-600', img: 'https://picsum.photos/200?random=16' },
  { name: 'At Home', color: 'bg-gradient-to-br from-cyan-500 to-cyan-600', img: 'https://picsum.photos/200?random=17' },
];

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { playTrack, currentTrack, isPlaying } = useMusicPlayer();

  // This useEffect replaces the old mock data filtering logic.
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/youtube/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results.');
        }
        const data: Track[] = await response.json();
        setResults(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center pb-8">
            <h1 className="text-3xl font-bold text-white">
              {query ? `Search Results for "${query}"` : 'Discover Music'}
            </h1>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown"></div>
              <p className="text-white ml-4">Searching...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-8">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}
          
          {!loading && !error && results.length > 0 && (
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-brand-brown/20 p-2 rounded-lg">
                  <Music className="w-6 h-6 text-brand-brown" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Search Results</h2>
                  <p className="text-gray-400 text-sm">{results.length} tracks found</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className="group relative cursor-pointer bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:bg-gray-800/50 hover:scale-105 transition-all duration-300"
                  >
                    <div className="relative">
                      <img src={track.thumbnail} alt={track.title} className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
                        <div className="w-12 h-12 bg-brand-brown rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all">
                          {currentTrack?.id === track.id && isPlaying ? (
                            <Pause className="w-6 h-6" />
                          ) : (
                            <Play className="w-6 h-6" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white truncate mb-1" title={track.title}>{track.title}</h3>
                      <p className="text-sm text-gray-400 truncate">{track.channelTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && !error && results.length === 0 && query && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-12 text-center">
              <div className="bg-gray-700/30 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
              <p className="text-gray-400">Try searching with different keywords or check your spelling</p>
            </div>
          )}

          {!query && (
            <div className="space-y-8">
              {/* Recent Searches */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:bg-gray-800/40 transition-all duration-300">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Recent Searches</h2>
                    <p className="text-gray-400 text-sm">Your search history</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {recentSearches.map((search, idx) => (
                    <div key={idx} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer">
                      <img src={search.img} alt={search.name} className="w-full h-20 object-cover rounded-lg mb-3" />
                      <h3 className="font-medium text-white text-sm truncate">{search.name}</h3>
                      <p className="text-xs text-gray-400">{search.type}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Genres */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:bg-gray-800/40 transition-all duration-300">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-brand-brown/20 p-2 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-brand-brown" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Your Top Genres</h2>
                    <p className="text-gray-400 text-sm">Based on your listening history</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {topGenres.map((genre, idx) => (
                    <div key={idx} className={`relative rounded-2xl h-32 flex items-end p-6 ${genre.color} cursor-pointer transition-transform hover:scale-105 shadow-lg`}>
                      <span className="text-xl font-bold z-10 text-white drop-shadow-lg">{genre.name}</span>
                      <img src={genre.img} alt={genre.name} className="absolute right-4 bottom-4 w-16 h-16 object-cover rounded-lg shadow-lg z-0 opacity-80" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Browse All */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:bg-gray-800/40 transition-all duration-300">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Browse All</h2>
                    <p className="text-gray-400 text-sm">Explore different categories</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {browseAll.map((cat, idx) => (
                    <div key={idx} className={`relative rounded-xl h-28 flex items-end p-4 ${cat.color} cursor-pointer transition-transform hover:scale-105 shadow-lg`}>
                      <span className="text-base font-bold z-10 text-white drop-shadow-lg">{cat.name}</span>
                      <img src={cat.img} alt={cat.name} className="absolute right-2 bottom-2 w-12 h-12 object-cover rounded-lg shadow-lg z-0 opacity-80" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;