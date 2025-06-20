import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useMusicPlayer } from '../contexts/PlayerContext'; // Import the hook
import { 
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Brain,
  Target,
  TrendingUp,
  Music,
  Zap,
  Clock,
  BarChart3,
  Flame,
  Timer
} from 'lucide-react';

interface PracticeSession {
  id: string;
  songTitle: string;
  artist: string;
  duration: number;
  date: string;
  progress: number;
  aiScore: number;
  skillsImproved: string[];
}

interface AIRecommendation {
  id: string;
  type: 'exercise' | 'song' | 'technique';
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: number;
  skillFocus: string;
  aiConfidence: number;
}

const aiRecommendations: AIRecommendation[] = [
  {
    id: 'ai1',
    type: 'exercise',
    title: 'Fingerpicking Patterns',
    description: 'Based on your recent sessions, practice these patterns to improve dexterity',
    difficulty: 'Intermediate',
    estimatedTime: 15,
    skillFocus: 'Technique',
    aiConfidence: 92
  },
  {
    id: 'ai2', 
    type: 'song',
    title: 'Tears in Heaven - Eric Clapton',
    description: 'Perfect for practicing the chord progressions you\'ve been working on',
    difficulty: 'Intermediate',
    estimatedTime: 25,
    skillFocus: 'Chord Transitions',
    aiConfidence: 88
  },
  {
    id: 'ai3',
    type: 'technique',
    title: 'Rhythm Training - 4/4 Time',
    description: 'AI detected timing inconsistencies. This will help your rhythm accuracy',
    difficulty: 'Beginner',
    estimatedTime: 10,
    skillFocus: 'Timing',
    aiConfidence: 95
  },
  {
    id: 'ai4',
    type: 'song',
    title: 'House of the Rising Sun',
    description: 'Great for practicing barre chords with your current skill level',
    difficulty: 'Advanced',
    estimatedTime: 30,
    skillFocus: 'Barre Chords',
    aiConfidence: 85
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { currentTrack, isPlaying, togglePlay, progress, duration, seek, skip } = useMusicPlayer();

  // Mock data with AI-enhanced features
  const stats = {
    totalTime: 127, // hours
    sessionCount: 45,
    weeklyProgress: 85, // percentage
    streak: 12, // days
    level: 8,
    xp: 2450,
    nextLevelXp: 3000,
    aiAccuracyScore: 87, // AI-assessed overall accuracy
    technicalProgress: 74, // AI-assessed technical improvement
    musicTheoryScore: 68 // AI-assessed music theory understanding
  };

  const recentSessions: PracticeSession[] = [
    {
      id: '1',
      songTitle: 'Wonderwall',
      artist: 'Oasis',
      duration: 25,
      date: '2 hours ago',
      progress: 78,
      aiScore: 85,
      skillsImproved: ['Chord Transitions', 'Strumming Patterns']
    },
    {
      id: '2', 
      songTitle: 'Hotel California',
      artist: 'Eagles',
      duration: 35,
      date: '1 day ago',
      progress: 92,
      aiScore: 91,
      skillsImproved: ['Fingerpicking', 'Tempo Control']
    },
    {
      id: '3',
      songTitle: 'Stairway to Heaven',
      artist: 'Led Zeppelin', 
      duration: 42,
      date: '2 days ago',
      progress: 65,
      aiScore: 72,
      skillsImproved: ['Barre Chords', 'Dynamics']
    },
    {
      id: '4',
      songTitle: 'Sweet Child O Mine',
      artist: 'Guns N Roses',
      duration: 28,
      date: '3 days ago', 
      progress: 88,
      aiScore: 89,
      skillsImproved: ['Lead Guitar', 'Timing']
    },
    {
      id: '5',
      songTitle: 'Blackbird',
      artist: 'The Beatles',
      duration: 18,
      date: '4 days ago',
      progress: 95,
      aiScore: 94,
      skillsImproved: ['Fingerpicking', 'Melody']
    }
  ];

  const getAIRecommendationIcon = (type: string) => {
    switch (type) {
      case 'exercise': return <Target className="w-5 h-5" />;
      case 'song': return <Music className="w-5 h-5" />;
      case 'technique': return <Zap className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-brand-brown bg-orange-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(14, 5);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  // Calculate progress for the styled seekbar
  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;
  const trackStyle = {
    background: `linear-gradient(to right, #8B4513 ${progressPercentage}%, #e2e8f0 ${progressPercentage}%)`
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-8">
            {/* AI Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Practice Streak */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="w-8 h-8" />
                  <div>
                    <h3 className="text-2xl font-bold">{stats.streak} Days</h3>
                    <p className="text-orange-100">Practice Streak</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(7)].map((_, i) => (
                    <span key={i} className={`w-3 h-3 rounded-full ${i < stats.streak % 7 ? 'bg-white' : 'bg-white/30'}`}></span>
                  ))}
                </div>
              </div>

              {/* AI Accuracy Score */}
              <div className="bg-gradient-to-br from-brand-brown to-brand-yellow rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8" />
                  <div>
                    <h3 className="text-2xl font-bold">{stats.aiAccuracyScore}%</h3>
                    <p className="text-yellow-100">AI Accuracy Score</p>
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: `${stats.aiAccuracyScore}%` }}></div>
                </div>
              </div>

              {/* Technical Progress */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8" />
                  <div>
                    <h3 className="text-2xl font-bold">{stats.technicalProgress}%</h3>
                    <p className="text-blue-100">Technical Progress</p>
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: `${stats.technicalProgress}%` }}></div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark">AI Recommendations</h3>
                    <p className="text-sm text-gray-600">Personalized practice suggestions based on your performance</p>
                  </div>
                </div>
                <button className="btn-secondary text-brand-brown hover:text-brand-dark font-medium text-sm">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiRecommendations.slice(0, 4).map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-brand-brown group-hover:text-white transition-colors">
                        {getAIRecommendationIcon(rec.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-brand-dark mb-1">{rec.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`px-2 py-1 rounded-full ${getDifficultyColor(rec.difficulty)}`}>
                            {rec.difficulty}
                          </span>
                          <span className="text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {rec.estimatedTime}min
                          </span>
                          <span className="text-brand-brown font-medium">{rec.aiConfidence}% AI match</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Focus: {rec.skillFocus}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Practice Sessions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-brand-dark">Recent Practice Sessions</h3>
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
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{session.duration}min practice</span>
                        <span className="text-xs text-brand-brown font-medium">AI Score: {session.aiScore}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 mb-1">{session.date}</div>
                      <div className="flex flex-wrap gap-1">
                        {session.skillsImproved.map((skill, idx) => (
                          <span key={idx} className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Practice Goal */}
            <div className="bg-gradient-to-br from-brand-brown via-brand-yellow to-yellow-100 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Timer className="w-8 h-8" />
                  <div>
                    <h3 className="text-2xl font-bold">Today's Practice Goal</h3>
                    <p className="text-yellow-100">Stay consistent to improve faster</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">22/30</div>
                  <div className="text-yellow-100 text-sm">minutes</div>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div className="bg-white h-3 rounded-full" style={{ width: '73%' }}></div>
              </div>
              <p className="text-yellow-100 text-sm">8 more minutes to reach your daily goal! 🎯</p>
            </div>
          </div>

          {/* Now Playing Widget - Enhanced and connected to global state */}
          <div className="hidden lg:block w-full max-w-xs sticky top-24 self-start">
            {currentTrack ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={currentTrack.thumbnail}
                    alt={currentTrack.title}
                    className="w-32 h-32 rounded-xl object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-brand-dark truncate w-full text-center">{currentTrack.title}</h4>
                <p className="text-sm text-gray-600 truncate w-full text-center mb-4">{currentTrack.channelTitle}</p>
                
                {/* Interactive Seekbar and Time */}
                <div className="w-full mt-2 mb-4">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-transparent rounded-lg appearance-none cursor-pointer"
                    style={trackStyle}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Player Controls with Skip Icons */}
                <div className="flex items-center gap-4 mt-2">
                  <button onClick={() => skip(-10)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <SkipBack className="w-5 h-5 text-brand-dark" />
                  </button>
                  <button
                    className="p-3 rounded-full bg-brand-brown text-white hover:bg-brand-dark transition-colors"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button onClick={() => skip(10)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <SkipForward className="w-5 h-5 text-brand-dark" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center">
                <h4 className="font-semibold text-brand-dark mb-2">Nothing Playing</h4>
                <p className="text-sm text-gray-500">Search for a song to start listening.</p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h4 className="font-semibold text-brand-dark mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Week Summary
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Practice Time</span>
                  <span className="font-semibold text-brand-dark">12.5 hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Songs Practiced</span>
                  <span className="font-semibold text-brand-dark">18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg AI Score</span>
                  <span className="font-semibold text-brand-brown">{stats.aiAccuracyScore}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Skills Improved</span>
                  <span className="font-semibold text-green-600">7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Now Playing - This will be replaced by the global MusicPlayerBar, but we connect it for now */}
        {currentTrack && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-3 flex items-center gap-3 shadow-lg lg:hidden">
            <img
              src={currentTrack.thumbnail}
              alt={currentTrack.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-brand-dark truncate">{currentTrack.title}</h4>
              <p className="text-xs text-gray-600 truncate">{currentTrack.channelTitle}</p>
              <div className="w-full flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-1 bg-brand-brown rounded-full" style={{ width: duration > 0 ? `${(progress / duration) * 100}%` : '0%' }}></div>
                </div>
                <span className="text-xs text-gray-400">{formatTime(duration)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => skip(-10)} className="p-2 rounded-full hover:bg-gray-100">
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full bg-brand-brown text-white hover:bg-brand-dark transition-colors"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button onClick={() => skip(10)} className="p-2 rounded-full hover:bg-gray-100">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;