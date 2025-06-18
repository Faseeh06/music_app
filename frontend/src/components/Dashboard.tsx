import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { 
  Clock, 
  Calendar, 
  TrendingUp, 
  Play, 
  Search, 
  Music, 
  BarChart3, 
  Users, 
  Star,
  RotateCcw,
  Plus,
  Filter,
  ChevronRight,
  Headphones,
  Timer,
  Target,
  Award,
  Flame,
  Pause,
  SkipForward,
  SkipBack,
  Music2
} from 'lucide-react';

interface PracticeSession {
  id: string;
  songTitle: string;
  artist: string;
  duration: number;
  date: string;
  progress: number;
}

interface PopularSong {
  id: string;
  title: string;
  artist: string;
  practiceCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  thumbnail: string;
}

const pickedForYou = [
  {
    id: 'p1',
    title: 'Levitating',
    artist: 'Dua Lipa',
    thumbnail: 'https://picsum.photos/seed/p1/100/100',
  },
  {
    id: 'p2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    thumbnail: 'https://picsum.photos/seed/p2/100/100',
  },
  {
    id: 'p3',
    title: 'Peaches',
    artist: 'Justin Bieber',
    thumbnail: 'https://picsum.photos/seed/p3/100/100',
  },
  {
    id: 'p4',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    thumbnail: 'https://picsum.photos/seed/p4/100/100',
  },
];

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Mock data
  const stats = {
    totalTime: 127, // hours
    sessionCount: 45,
    weeklyProgress: 85, // percentage
    streak: 12, // days
    level: 8,
    xp: 2450,
    nextLevelXp: 3000
  };

  const recentSessions: PracticeSession[] = [
    {
      id: '1',
      songTitle: 'Wonderwall',
      artist: 'Oasis',
      duration: 25,
      date: '2 hours ago',
      progress: 78
    },
    {
      id: '2',
      songTitle: 'Hotel California',
      artist: 'Eagles',
      duration: 35,
      date: '1 day ago',
      progress: 92
    },
    {
      id: '3',
      songTitle: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      duration: 42,
      date: '2 days ago',
      progress: 65
    },
    {
      id: '4',
      songTitle: 'Sweet Child O Mine',
      artist: 'Guns N Roses',
      duration: 28,
      date: '3 days ago',
      progress: 88
    },
    {
      id: '5',
      songTitle: 'Blackbird',
      artist: 'The Beatles',
      duration: 18,
      date: '4 days ago',
      progress: 95
    }
  ];

  const popularSongs: PopularSong[] = [
    {
      id: '1',
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      practiceCount: 1247,
      difficulty: 'Beginner',
      duration: '3:54',
      thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '2',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      practiceCount: 892,
      difficulty: 'Advanced',
      duration: '5:55',
      thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '3',
      title: 'Perfect',
      artist: 'Ed Sheeran',
      practiceCount: 756,
      difficulty: 'Intermediate',
      duration: '4:23',
      thumbnail: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '4',
      title: 'Someone Like You',
      artist: 'Adele',
      practiceCount: 634,
      difficulty: 'Beginner',
      duration: '4:45',
      thumbnail: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const nowPlaying = {
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    duration: '3:54',
    progress: 0.45,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-brand-brown bg-orange-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Streak + Goal Row */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              {/* Streak Widget (70%) */}
              <div className="w-full lg:w-[70%] bg-gradient-accent rounded-2xl p-8 flex flex-col justify-between shadow-lg min-w-[320px] max-w-full">
                <div className="flex items-center gap-6 mb-4">
                  <div className="bg-white rounded-full p-5 shadow flex items-center justify-center">
                    <Flame className="w-12 h-12 text-orange-500" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-extrabold text-brand-dark mb-1">{stats.streak} Day Streak</h2>
                    <p className="text-lg text-white font-semibold">Keep your streak alive! Practice every day.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 mb-2">
                  {[...Array(7)].map((_, i) => (
                    <span key={i} className={`w-5 h-5 rounded-full ${i < stats.streak % 7 ? 'bg-orange-400' : 'bg-white/30'} border border-white`}></span>
                  ))}
                </div>
                <div className="text-white text-sm mt-2">🔥 {stats.streak >= 7 ? 'Amazing! You have a week streak!' : 'You are on fire!'}</div>
              </div>

              {/* Goal Widget (30%) */}
              <div className="w-full lg:w-[30%] bg-gradient-to-br from-brand-brown via-brand-yellow to-yellow-100 rounded-2xl p-8 shadow-lg flex flex-col justify-between mt-6 lg:mt-0 self-end min-w-[260px] max-w-full">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Timer className="w-7 h-7 text-white" /> Today's Goal
                </h3>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-lg font-semibold text-white mb-2">Practice for 30 minutes</p>
                  <div className="w-full bg-white/30 rounded-full h-4 mb-2">
                    <div className="bg-white h-4 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-base text-white font-medium">22 min completed</p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-white/80">Stay focused and hit your goal!</span>
                </div>
              </div>
            </div>

            {/* Picked For You */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-brand-dark">Picked For You</h3>
                <button className="btn-secondary text-brand-brown hover:text-brand-dark font-medium text-sm">See All</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                {pickedForYou.map((song) => (
                  <div key={song.id} className="min-w-[160px] max-w-[160px] flex-shrink-0 flex flex-col items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer shadow">
                    <img src={song.thumbnail} alt={song.title} className="w-20 h-20 rounded-lg object-cover mb-2" />
                    <h4 className="font-semibold text-brand-dark truncate w-full text-center">{song.title}</h4>
                    <p className="text-xs text-gray-600 truncate w-full text-center">{song.artist}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Played List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-brand-dark">Recently Played</h3>
                <button className="btn-secondary text-brand-brown hover:text-brand-dark font-medium text-sm">View All</button>
              </div>
              <div className="divide-y divide-gray-100">
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => navigate(`/practice/${session.id}`)}
                  >
                    <img
                      src={`https://picsum.photos/seed/${session.id}/56/56`}
                      alt={session.songTitle}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-brand-dark truncate">{session.songTitle}</h4>
                      <p className="text-sm text-gray-600 truncate">{session.artist}</p>
                    </div>
                    <div className="text-xs text-gray-400 whitespace-nowrap">{session.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Now Playing Widget */}
          <div className="hidden lg:block w-full max-w-xs sticky top-24 self-start">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col items-center">
              <img
                src={nowPlaying.thumbnail}
                alt={nowPlaying.title}
                className="w-32 h-32 rounded-xl object-cover mb-4"
              />
              <h4 className="text-lg font-bold text-brand-dark truncate w-full text-center">{nowPlaying.title}</h4>
              <p className="text-sm text-gray-600 truncate w-full text-center mb-2">{nowPlaying.artist}</p>
              <div className="w-full flex items-center gap-2 mt-2 mb-4">
                <span className="text-xs text-gray-400">0:00</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-2 bg-brand-brown rounded-full" style={{ width: `${nowPlaying.progress * 100}%` }}></div>
                </div>
                <span className="text-xs text-gray-400">{nowPlaying.duration}</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <SkipBack className="w-5 h-5 text-brand-dark" />
                </button>
                <button
                  className="p-3 rounded-full bg-brand-brown text-white hover:bg-brand-dark transition-colors"
                  onClick={() => setIsPlaying((p) => !p)}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <SkipForward className="w-5 h-5 text-brand-dark" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Now Playing Widget for mobile (bottom) */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-3 flex items-center gap-3 shadow-lg lg:hidden">
          <img
            src={nowPlaying.thumbnail}
            alt={nowPlaying.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-brand-dark truncate">{nowPlaying.title}</h4>
            <p className="text-xs text-gray-600 truncate">{nowPlaying.artist}</p>
            <div className="w-full flex items-center gap-2 mt-1">
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-1 bg-brand-brown rounded-full" style={{ width: `${nowPlaying.progress * 100}%` }}></div>
              </div>
              <span className="text-xs text-gray-400">{nowPlaying.duration}</span>
            </div>
          </div>
          <button
            className="p-2 rounded-full bg-brand-brown text-white hover:bg-brand-dark transition-colors"
            onClick={() => setIsPlaying((p) => !p)}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;