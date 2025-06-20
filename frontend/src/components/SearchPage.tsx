import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
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
  Pause
} from 'lucide-react';
import Layout from './Layout';
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
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    <Layout>
      <div className="min-h-screen bg-gray-50 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center pb-8">
            <h1 className="text-3xl font-bold text-brand-dark">
              {query ? `Results for "${query}"`: ''}
            </h1>
          </div>

          {loading && <p className="text-center text-lg">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          
          {!loading && !error && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {results.map((track) => (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className="group relative cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <img src={track.thumbnail} alt={track.title} className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 bg-brand-brown rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all">
                        {currentTrack?.id === track.id && isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-brand-dark truncate" title={track.title}>{track.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{track.channelTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && results.length === 0 && query && (
            <p className="text-center text-gray-500 mt-8">No results found for "{query}".</p>
          )}

          {!query && (
            <div>
              
              {/* This will show the default content from your original SearchPage */}
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;