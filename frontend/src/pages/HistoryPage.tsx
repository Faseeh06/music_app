import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { CalendarDays, ChevronDown, Search, Download, Play, BarChart3, Clock, Star } from 'lucide-react';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search, setSearch] = useState('');

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
      <Sidebar onCollapse={setSidebarCollapsed} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Practice History</h1>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 items-center">
            <button className="flex items-center gap-2 bg-brand-brown/20 border border-brand-brown text-brand-brown px-4 py-2 rounded-lg font-medium hover:bg-brand-brown/30 transition-colors">
              <CalendarDays className="w-5 h-5" /> Last 30 days <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 bg-purple-500/20 border border-purple-500 text-purple-400 px-4 py-2 rounded-lg font-medium hover:bg-purple-500/30 transition-colors">
              🎸 All instruments <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 bg-blue-500/20 border border-blue-500 text-blue-400 px-4 py-2 rounded-lg font-medium hover:bg-blue-500/30 transition-colors">
              ⏱️ All durations <ChevronDown className="w-4 h-4" />
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search songs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-brown w-64"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <button className="ml-auto flex items-center gap-2 bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-lg font-medium hover:bg-green-500/30 transition-colors">
              <Download className="w-5 h-5" /> Export
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Calendar View */}
            <div className="lg:col-span-2 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="text-white font-semibold mb-6 flex items-center gap-3">
                <div className="bg-brand-brown/20 p-2 rounded-lg">
                  <CalendarDays className="w-6 h-6 text-brand-brown" />
                </div>
                <div>
                  <h2 className="text-xl">Practice Calendar</h2>
                  <p className="text-sm text-gray-400">January 2024</p>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-gray-400 mb-4">
                <div className="font-medium">S</div><div className="font-medium">M</div><div className="font-medium">T</div><div className="font-medium">W</div><div className="font-medium">T</div><div className="font-medium">F</div><div className="font-medium">S</div>
              </div>
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2 text-center">
                <div></div><div></div><div className="text-gray-500 p-2">1</div><div className="text-gray-500 p-2">2</div><div className="text-gray-500 p-2">3</div><div className="text-gray-500 p-2">4</div><div></div>
                <div className="text-gray-500 p-2">5</div><div className="text-gray-500 p-2">6</div><div className="text-gray-500 p-2">7</div><div className="text-gray-500 p-2">8</div><div className="text-gray-500 p-2">9</div><div className="text-gray-500 p-2">10</div><div className="text-gray-500 p-2">11</div>
                <div className="bg-brand-brown/30 text-brand-brown rounded-lg p-2 font-bold border border-brand-brown/50">12</div><div className="bg-brand-brown/30 text-brand-brown rounded-lg p-2 font-bold border border-brand-brown/50">13</div><div className="bg-brand-brown/30 text-brand-brown rounded-lg p-2 font-bold border border-brand-brown/50">14</div><div className="bg-brand-brown/30 text-brand-brown rounded-lg p-2 font-bold border border-brand-brown/50">15</div><div className="text-gray-500 p-2">16</div><div className="text-gray-500 p-2">17</div><div className="text-gray-500 p-2">18</div>
                <div className="text-gray-500 p-2">19</div><div className="text-gray-500 p-2">20</div><div className="bg-brand-brown/30 text-brand-brown rounded-lg p-2 font-bold border border-brand-brown/50">21</div><div className="text-gray-500 p-2">22</div><div className="bg-brand-brown/30 text-brand-brown rounded-lg p-2 font-bold border border-brand-brown/50">23</div><div className="text-gray-500 p-2">24</div><div className="text-gray-500 p-2">25</div>
                <div className="text-gray-500 p-2">26</div><div className="text-gray-500 p-2">27</div><div className="text-gray-500 p-2">28</div><div className="text-gray-500 p-2">29</div><div className="text-gray-500 p-2">30</div><div className="text-gray-500 p-2">31</div><div></div>
              </div>
              <div className="mt-4 text-xs text-gray-400 flex items-center gap-2">
                <span className="bg-brand-brown/30 w-3 h-3 rounded border border-brand-brown/50 inline-block"></span> 
                = Practice day
              </div>
            </div>

            {/* Weekly Stats */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="text-white font-semibold mb-6 flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl">This Week</h2>
                  <p className="text-sm text-gray-400">Practice minutes</p>
                </div>
              </div>
              <div className="space-y-3">
                {weeklyStats.map((stat, idx) => (
                  <div key={stat.day} className="flex items-center gap-3">
                    <div className="w-8 text-gray-400 text-sm font-medium">{stat.day}</div>
                    <div className="flex-1 bg-gray-700/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(stat.minutes / maxMinutes) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-blue-400 text-sm font-medium w-12">{stat.minutes}m</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            <div className="text-white font-semibold mb-6 flex items-center gap-3">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl">Recent Sessions</h2>
                <p className="text-sm text-gray-400">Your latest practice sessions</p>
              </div>
            </div>
            <div className="space-y-4">
              {dummySessions.map((session, idx) => (
                <div key={idx} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <img src={session.cover} alt={session.song} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-medium text-white mb-1">{session.song}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                            <span className="flex items-center gap-1">
                              📅 {session.date}
                            </span>
                            <span className="flex items-center gap-1">
                              ⏰ {session.time}
                            </span>
                            <span className="flex items-center gap-1">
                              ⏱️ {session.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              🎸 {session.instrument}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(session.rating)}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white font-medium">{session.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-brand-brown to-yellow-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${session.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">📝 {session.notes}</p>
                      
                      <div className="flex gap-3">
                        <button className="bg-brand-brown/20 hover:bg-brand-brown/30 text-brand-brown border border-brand-brown/50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Practice Again
                        </button>
                        <button className="bg-gray-600/30 hover:bg-gray-600/50 text-gray-300 border border-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          View Stats
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Insights */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            <div className="text-white font-semibold mb-6 flex items-center gap-3">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl">Practice Insights</h2>
                <p className="text-sm text-gray-400">AI-powered recommendations</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="bg-gray-700/30 p-4 rounded-xl border border-gray-600/50 flex items-start gap-3">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <span className="text-green-400 text-lg">💡</span>
                  </div>
                  <div className="text-gray-300 text-sm">{insight}</div>
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