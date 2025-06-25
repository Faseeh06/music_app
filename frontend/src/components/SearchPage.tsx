import React, { useState, useEffect, useCallback } from 'react';
import { Search, Play, Pause, Clock, Music, Headphones, Heart, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useMusicPlayer } from '../contexts/PlayerContext';
import { useSidebar } from '../contexts/SidebarContext';

interface YoutubeApiItem {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  duration?: string;
  views?: string;
}

interface Track {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  duration: string;
  views?: string;
}

// Mock search results - moved outside component to avoid re-creation
const mockResults: Track[] = [
  {
    id: '1',
    title: 'Hotel California - Eagles',
    channelTitle: 'Eagles',
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=300&h=200&fit=crop',
    duration: '6:31',
    views: '2.1M'
  },
  {
    id: '2',
    title: 'Wonderwall - Oasis',
    channelTitle: 'Oasis',
    thumbnail: 'https://images.pexels.com/photos/1763076/pexels-photo-1763076.jpeg?w=300&h=200&fit=crop',
    duration: '4:18',
    views: '1.8M'
  },
  {
    id: '3',
    title: 'Perfect - Ed Sheeran',
    channelTitle: 'Ed Sheeran',
    thumbnail: 'https://images.pexels.com/photos/1763077/pexels-photo-1763077.jpeg?w=300&h=200&fit=crop',
    duration: '4:23',
    views: '3.2M'
  },
  {
    id: '4',
    title: 'Blackbird - The Beatles',
    channelTitle: 'The Beatles',
    thumbnail: 'https://images.pexels.com/photos/1763078/pexels-photo-1763078.jpeg?w=300&h=200&fit=crop',
    duration: '2:18',
    views: '1.5M'
  },
  {
    id: '5',
    title: 'Stairway to Heaven - Led Zeppelin',
    channelTitle: 'Led Zeppelin',
    thumbnail: 'https://images.pexels.com/photos/1763079/pexels-photo-1763079.jpeg?w=300&h=200&fit=crop',
    duration: '8:02',
    views: '4.1M'
  }
];

const SearchPage: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const { currentTrack, isPlaying, playTrack } = useMusicPlayer();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const recentSearches = ['Guitar tabs', 'Ed Sheeran', 'Rock ballads', 'Acoustic covers'];
  
  const topGenres = [
    { name: 'Rock', count: '1.2K songs', image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?w=300&h=200&fit=crop' },
    { name: 'Pop', count: '2.3K songs', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=300&h=200&fit=crop' },
    { name: 'Jazz', count: '800 songs', image: 'https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?w=300&h=200&fit=crop' },
    { name: 'Classical', count: '600 songs', image: 'https://images.pexels.com/photos/1190300/pexels-photo-1190300.jpeg?w=300&h=200&fit=crop' }
  ];

  const browseCategories = [
    { name: 'Popular Today', icon: <Heart className="w-6 h-6" />, color: 'from-red-500 to-pink-500' },
    { name: 'New Releases', icon: <Music className="w-6 h-6" />, color: 'from-blue-500 to-purple-500' },
    { name: 'Acoustic', icon: <Headphones className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { name: 'Rock Classics', icon: <Clock className="w-6 h-6" />, color: 'from-orange-500 to-red-500' }
  ];  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setSearchResults([]); // Clear previous results immediately
    
    try {
      const response = await fetch(`http://localhost:3000/api/youtube/search?query=${encodeURIComponent(query)}&maxResults=20`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
        // Transform YouTube API data to our Track interface
      const transformedResults: Track[] = data.map((item: YoutubeApiItem) => ({
        id: item.id,
        title: item.title,
        channelTitle: item.channelTitle,
        thumbnail: item.thumbnail,
        duration: item.duration || 'N/A',
        views: item.views
      }));
      
      setSearchResults(transformedResults);
      
      // Show success message if this is the first successful API call
      if (transformedResults.length > 0) {
        console.log(`✅ Successfully fetched ${transformedResults.length} results from YouTube API`);
      }
    } catch (error) {
      console.error('Error searching videos:', error);
      
      // Show helpful error message
      if (error instanceof Error && error.message.includes('fetch')) {
        console.warn('⚠️ Backend server not running. Please start the backend server and configure YouTube API key. See backend/YOUTUBE_API_SETUP.md for setup instructions.');
      } else if (error instanceof Error && error.message.includes('YouTube API key is not configured')) {
        console.warn('⚠️ YouTube API key not configured. Please see backend/YOUTUBE_API_SETUP.md for setup instructions.');
      }
      
      // Fallback to filtered mock results
      const filteredMockResults = mockResults.filter(track => 
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.channelTitle.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(filteredMockResults);
      
      if (filteredMockResults.length > 0) {
        console.log(`📝 Using ${filteredMockResults.length} filtered mock results as fallback`);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load search results when query parameter changes
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    } else {
      // Clear results when no query
      setSearchResults([]);
    }
  }, [searchParams, performSearch]);

  const handleTrackPlay = (track: Track) => {
    playTrack(track);
  };

  const isCurrentTrack = (trackId: string) => currentTrack?.id === trackId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Discover Music'}
            </h1>
            {searchQuery && (
              <span className="text-gray-400 text-sm">
                {isLoading ? 'Searching...' : `${searchResults.length} results found`}
              </span>
            )}
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Search Results</h2>
                <span className="text-gray-400 text-sm">{searchResults.length} results found</span>
              </div>
              <div className="space-y-3">
                {searchResults.map((track) => (
                  <div
                    key={track.id}
                    className="group flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/50"
                  >
                    <div className="relative">
                      <img src={track.thumbnail} alt={track.title} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          onClick={() => handleTrackPlay(track)}
                          className="w-8 h-8 bg-brand-brown rounded-full flex items-center justify-center hover:bg-brand-brown/80 transition-colors"
                        >
                          {isCurrentTrack(track.id) && isPlaying ? (
                            <Pause className="w-4 h-4 text-white" />
                          ) : (
                            <Play className="w-4 h-4 text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate group-hover:text-brand-brown transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">{track.channelTitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-sm">{track.duration}</div>
                      {track.views && (
                        <div className="text-gray-500 text-xs">{track.views} views</div>
                      )}
                    </div>
                    <button
                      onClick={() => handleTrackPlay(track)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-gray-600/50"
                    >
                      <ArrowRight className="w-4 h-4 text-brand-brown" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Discovery Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Searches */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-brown" />
                Recent Searches
              </h2>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      window.location.href = `/search?q=${encodeURIComponent(search)}`;
                    }}
                    className="w-full text-left p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300 text-gray-300 hover:text-white border border-gray-600/50"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Genres */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-brand-brown" />
                Top Genres
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {topGenres.map((genre) => (
                  <div
                    key={genre.name}
                    className="relative group cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                  >
                    <img src={genre.image} alt={genre.name} className="w-full h-20 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                      <h3 className="text-white font-medium text-sm">{genre.name}</h3>
                      <p className="text-gray-300 text-xs">{genre.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browse All */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-brand-brown" />
                Browse All
              </h2>
              <div className="space-y-3">
                {browseCategories.map((category) => (
                  <div
                    key={category.name}
                    className={`relative p-4 rounded-lg cursor-pointer group overflow-hidden hover:scale-105 transition-transform duration-300 bg-gradient-to-r ${category.color}`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-white font-medium">{category.name}</span>
                      <div className="text-white/80">
                        {category.icon}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown mx-auto mb-4"></div>
              <p className="text-gray-400">Searching for music...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && searchResults.length === 0 && searchQuery && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 text-center">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
              <p className="text-gray-400">Try adjusting your search terms or browse our recommendations above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;