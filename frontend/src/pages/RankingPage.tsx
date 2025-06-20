import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Trophy, Users, Award, Star, Medal } from 'lucide-react';

const dummyLeaderboards = {
  practiceTime: [
    { rank: 1, name: 'Alice', time: '120h', instrument: 'Guitar', avatar: 'https://picsum.photos/40?random=1' },
    { rank: 2, name: 'Bob', time: '90h', instrument: 'Piano', avatar: 'https://picsum.photos/40?random=2' },
    { rank: 3, name: 'Charlie', time: '75h', instrument: 'Violin', avatar: 'https://picsum.photos/40?random=3' },
    { rank: 4, name: 'Diana', time: '68h', instrument: 'Guitar', avatar: 'https://picsum.photos/40?random=4' },
    { rank: 5, name: 'Eve', time: '55h', instrument: 'Drums', avatar: 'https://picsum.photos/40?random=5' },
  ],
  popularSongs: [
    { rank: 1, song: 'Wonderwall', artist: 'Oasis', plays: 150, cover: 'https://picsum.photos/60?random=11' },
    { rank: 2, song: 'Hotel California', artist: 'Eagles', plays: 120, cover: 'https://picsum.photos/60?random=12' },
    { rank: 3, song: 'Stairway to Heaven', artist: 'Led Zeppelin', plays: 100, cover: 'https://picsum.photos/60?random=13' },
    { rank: 4, song: 'Bohemian Rhapsody', artist: 'Queen', plays: 95, cover: 'https://picsum.photos/60?random=14' },
    { rank: 5, song: 'Sweet Child O Mine', artist: 'Guns N Roses', plays: 85, cover: 'https://picsum.photos/60?random=15' },
  ],
  instrumentSpecific: {
    Guitar: [
      { rank: 1, name: 'Alice', time: '120h', avatar: 'https://picsum.photos/40?random=1' },
      { rank: 2, name: 'Bob', time: '90h', avatar: 'https://picsum.photos/40?random=2' },
      { rank: 3, name: 'Charlie', time: '75h', avatar: 'https://picsum.photos/40?random=3' },
    ],
    Piano: [
      { rank: 1, name: 'David', time: '100h', avatar: 'https://picsum.photos/40?random=6' },
      { rank: 2, name: 'Eve', time: '80h', avatar: 'https://picsum.photos/40?random=7' },
      { rank: 3, name: 'Frank', time: '60h', avatar: 'https://picsum.photos/40?random=8' },
    ],
  },
};

const dummyAchievements = [
  { name: 'Practice Streak', description: 'Practice for 7 days in a row', icon: '🏆', rarity: 'gold' },
  { name: 'Song Master', description: 'Master 10 songs', icon: '🎵', rarity: 'silver' },
  { name: 'Social Butterfly', description: 'Follow 5 friends', icon: '🦋', rarity: 'bronze' },
  { name: 'Night Owl', description: 'Practice after midnight', icon: '🦉', rarity: 'gold' },
  { name: 'Early Bird', description: 'Practice before 6 AM', icon: '🐦', rarity: 'silver' },
  { name: 'Marathon', description: 'Practice for 5+ hours straight', icon: '⏰', rarity: 'gold' },
];

const RankingPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timePeriod, setTimePeriod] = useState('all-time');
  const [instrument, setInstrument] = useState('all');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Medal className="w-5 h-5 text-orange-400" />;
      default: return <span className="text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'gold': return 'border-yellow-400 bg-yellow-400/10';
      case 'silver': return 'border-gray-300 bg-gray-300/10';
      case 'bronze': return 'border-orange-400 bg-orange-400/10';
      default: return 'border-gray-600 bg-gray-600/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Rankings</h1>
          
          {/* Time Period and Instrument Filters */}
          <div className="flex flex-wrap gap-4 mb-8 items-center">
            <select
              value={timePeriod}
              onChange={e => setTimePeriod(e.target.value)}
              className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-brown"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="all-time">All Time</option>
            </select>
            <select
              value={instrument}
              onChange={e => setInstrument(e.target.value)}
              className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-brown"
            >
              <option value="all">All Instruments</option>
              <option value="Guitar">Guitar</option>
              <option value="Piano">Piano</option>
              <option value="Violin">Violin</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Practice Time Leaderboard */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="text-white font-semibold mb-6 flex items-center gap-3">
                <div className="bg-brand-brown/20 p-2 rounded-lg">
                  <Trophy className="w-6 h-6 text-brand-brown" />
                </div>
                <div>
                  <h2 className="text-xl">Practice Time Leaders</h2>
                  <p className="text-sm text-gray-400">Top performers this {timePeriod}</p>
                </div>
              </div>
              <div className="space-y-3">
                {dummyLeaderboards.practiceTime.map((user) => (
                  <div key={user.rank} className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/50">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(user.rank)}
                    </div>
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.instrument}</div>
                    </div>
                    <div className="text-brand-brown font-bold">{user.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Songs Leaderboard */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="text-white font-semibold mb-6 flex items-center gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl">Popular Songs</h2>
                  <p className="text-sm text-gray-400">Most practiced tracks</p>
                </div>
              </div>
              <div className="space-y-3">
                {dummyLeaderboards.popularSongs.map((song) => (
                  <div key={song.rank} className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/50">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(song.rank)}
                    </div>
                    <img src={song.cover} alt={song.song} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="font-medium text-white">{song.song}</div>
                      <div className="text-sm text-gray-400">{song.artist}</div>
                    </div>
                    <div className="text-purple-400 font-bold">{song.plays} plays</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instrument-Specific Leaderboards */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            <div className="text-white font-semibold mb-6 flex items-center gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl">Instrument Rankings</h2>
                <p className="text-sm text-gray-400">Leaderboards by instrument</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(dummyLeaderboards.instrumentSpecific).map(([inst, users]) => (
                <div key={inst} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎸</span>
                    {inst}
                  </h3>
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div key={user.rank} className="flex items-center gap-3 p-3 bg-gray-600/30 rounded-lg">
                        <div className="flex items-center justify-center w-6">
                          {getRankIcon(user.rank)}
                        </div>
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="font-medium text-white text-sm">{user.name}</div>
                        </div>
                        <div className="text-blue-400 font-bold text-sm">{user.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            <div className="text-white font-semibold mb-6 flex items-center gap-3">
              <div className="bg-yellow-500/20 p-2 rounded-lg">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-xl">Available Achievements</h2>
                <p className="text-sm text-gray-400">Unlock these by practicing</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dummyAchievements.map((achievement) => (
                <div key={achievement.name} className={`p-6 rounded-xl text-center border hover:scale-105 transition-all duration-300 ${getRarityColor(achievement.rarity)}`}>
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <div className="font-medium text-white mb-2">{achievement.name}</div>
                  <div className="text-sm text-gray-400">{achievement.description}</div>
                  <div className="mt-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      achievement.rarity === 'gold' ? 'bg-yellow-400/20 text-yellow-400' :
                      achievement.rarity === 'silver' ? 'bg-gray-300/20 text-gray-300' :
                      'bg-orange-400/20 text-orange-400'
                    }`}>
                      {achievement.rarity.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage; 