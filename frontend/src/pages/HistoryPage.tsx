import React, { useState } from 'react';
import { Calendar, Clock, Play, Star, BarChart3, TrendingUp, Target, Award } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useSidebar } from '../contexts/SidebarContext';

const dummySessions = [
  {
    date: '2024-01-15',
    time: '14:30-15:15',
    duration: '45:00',
    song: 'Wonderwall - Oasis',
    instrument: 'Guitar',
    rating: 5,
    notes: 'Worked on the chorus transition',
    cover: 'https://picsum.photos/60?random=1',
    progress: 85
  },
  {
    date: '2024-01-14',
    time: '19:00-19:25',
    duration: '25:00',
    song: 'Hotel California - Eagles',
    instrument: 'Guitar',
    rating: 4,
    notes: 'Solo section needs more work',
    cover: 'https://picsum.photos/60?random=2',
    progress: 70
  },
  {
    date: '2024-01-13',
    time: '16:15-17:00',
    duration: '45:00',
    song: 'Stairway to Heaven - Led Zeppelin',
    instrument: 'Guitar',
    rating: 5,
    notes: 'Mastered the intro riff',
    cover: 'https://picsum.photos/60?random=3',
    progress: 90
  },
  {
    date: '2024-01-12',
    time: '20:00-20:30',
    duration: '30:00',
    song: 'Bohemian Rhapsody - Queen',
    instrument: 'Piano',
    rating: 3,
    notes: 'Complex chord progressions',
    cover: 'https://picsum.photos/60?random=4',
    progress: 55
  },
];

const insights = [
  'Most active day: Tuesday (avg 2.3 sessions)',
  'Longest streak: 7 days (Jan 10-16)',
  'Most improved song: Stairway to Heaven (+40% accuracy)',
  'Recommendation: Try practicing in shorter, focused chunks',
];

const weeklyStats = [
  { day: 'Mon', minutes: 45, sessions: 2 },
  { day: 'Tue', minutes: 60, sessions: 3 },
  { day: 'Wed', minutes: 30, sessions: 1 },
  { day: 'Thu', minutes: 75, sessions: 3 },
  { day: 'Fri', minutes: 90, sessions: 4 },
  { day: 'Sat', minutes: 45, sessions: 2 },
  { day: 'Sun', minutes: 0, sessions: 0 },
];

const HistoryPage: React.FC = () => {
  const { isCollapsed } = useSidebar();

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
      />
    ));
  };

  const maxMinutes = Math.max(...weeklyStats.map(s => s.minutes));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Practice History</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-gray-400 text-sm">Total Practice</span>
              </div>
              <div className="text-2xl font-bold text-white">142h 30m</div>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-gray-400 text-sm">Sessions</span>
              </div>
              <div className="text-2xl font-bold text-white">89</div>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-gray-400 text-sm">Average Score</span>
              </div>
              <div className="text-2xl font-bold text-white">87%</div>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-gray-400 text-sm">Streak</span>
              </div>
              <div className="text-2xl font-bold text-white">12 days</div>
            </div>
          </div>

          {/* Calendar and Weekly Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Practice Calendar */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-brown" />
                Practice Calendar
              </h2>
              <div className="grid grid-cols-7 gap-2 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="text-gray-400 font-medium py-2">{day}</div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const isPracticeDay = Math.random() > 0.6;
                  const isToday = i === 15;
                  return (
                    <div
                      key={i}
                      className={`h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${
                        isToday
                          ? 'bg-brand-brown text-white ring-2 ring-brand-brown/50'
                          : isPracticeDay
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'text-gray-500 hover:bg-gray-700/50'
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Stats */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand-brown" />
                Weekly Practice
              </h2>
              <div className="space-y-4">
                {[
                  { day: 'Monday', minutes: 45, color: 'from-blue-500 to-blue-600' },
                  { day: 'Tuesday', minutes: 30, color: 'from-green-500 to-green-600' },
                  { day: 'Wednesday', minutes: 60, color: 'from-purple-500 to-purple-600' },
                  { day: 'Thursday', minutes: 25, color: 'from-yellow-500 to-yellow-600' },
                  { day: 'Friday', minutes: 50, color: 'from-red-500 to-red-600' },
                  { day: 'Saturday', minutes: 75, color: 'from-indigo-500 to-indigo-600' },
                  { day: 'Sunday', minutes: 40, color: 'from-pink-500 to-pink-600' }
                ].map((stat) => (
                  <div key={stat.day} className="flex items-center gap-4">
                    <div className="w-16 text-gray-400 text-sm">{stat.day.slice(0, 3)}</div>
                    <div className="flex-1 bg-gray-700/30 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                        style={{ width: `${(stat.minutes / 75) * 100}%` }}
                      />
                    </div>
                    <div className="w-12 text-white text-sm font-medium">{stat.minutes}m</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-brown" />
              Recent Practice Sessions
            </h2>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  song: 'Hotel California',
                  artist: 'Eagles',
                  date: '2024-01-15',
                  duration: '45m',
                  score: 92,
                  progress: 85,
                  thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=80&h=80&fit=crop'
                },
                {
                  id: 2,
                  song: 'Wonderwall',
                  artist: 'Oasis',
                  date: '2024-01-14',
                  duration: '30m',
                  score: 88,
                  progress: 78,
                  thumbnail: 'https://images.pexels.com/photos/1763076/pexels-photo-1763076.jpeg?w=80&h=80&fit=crop'
                },
                {
                  id: 3,
                  song: 'Perfect',
                  artist: 'Ed Sheeran',
                  date: '2024-01-13',
                  duration: '40m',
                  score: 94,
                  progress: 90,
                  thumbnail: 'https://images.pexels.com/photos/1763077/pexels-photo-1763077.jpeg?w=80&h=80&fit=crop'
                }
              ].map((session) => (
                <div key={session.id} className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300">
                  <div className="relative">
                    <img src={session.thumbnail} alt={session.song} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{session.song}</h3>
                    <p className="text-gray-400 text-sm">{session.artist}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-white font-medium">{session.duration}</div>
                    <div className="text-gray-400 text-sm">{session.date}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(session.score / 20) ? 'text-yellow-400 fill-current' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-white text-sm font-medium">{session.score}%</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 bg-gray-700 rounded-full h-2 mb-1">
                      <div
                        className="bg-brand-brown h-2 rounded-full transition-all duration-300"
                        style={{ width: `${session.progress}%` }}
                      />
                    </div>
                    <div className="text-gray-400 text-xs">{session.progress}% complete</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-brand-brown text-white rounded-lg text-sm hover:bg-brand-brown/80 transition-colors">
                      Practice Again
                    </button>
                    <button className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-500 transition-colors">
                      View Stats
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Insights */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-brown" />
              Practice Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Most Practiced Song',
                  content: 'Hotel California',
                  subtitle: '12 sessions this month',
                  icon: <Play className="w-5 h-5 text-blue-400" />,
                  color: 'bg-blue-500/20'
                },
                {
                  title: 'Favorite Genre',
                  content: 'Rock',
                  subtitle: '68% of your practice time',
                  icon: <TrendingUp className="w-5 h-5 text-green-400" />,
                  color: 'bg-green-500/20'
                },
                {
                  title: 'Best Practice Day',
                  content: 'Saturday',
                  subtitle: 'Average 75 minutes',
                  icon: <Calendar className="w-5 h-5 text-purple-400" />,
                  color: 'bg-purple-500/20'
                },
                {
                  title: 'Skill Improvement',
                  content: '+15%',
                  subtitle: 'This month vs last month',
                  icon: <Target className="w-5 h-5 text-yellow-400" />,
                  color: 'bg-yellow-500/20'
                },
                {
                  title: 'Streak Record',
                  content: '21 days',
                  subtitle: 'Your longest practice streak',
                  icon: <Award className="w-5 h-5 text-red-400" />,
                  color: 'bg-red-500/20'
                },
                {
                  title: 'Next Goal',
                  content: '150 hours',
                  subtitle: '8 hours to milestone',
                  icon: <Clock className="w-5 h-5 text-indigo-400" />,
                  color: 'bg-indigo-500/20'
                }
              ].map((insight, index) => (
                <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${insight.color}`}>
                      {insight.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white text-sm">{insight.title}</h3>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-white mb-1">{insight.content}</div>
                  <div className="text-gray-400 text-xs">{insight.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage; 