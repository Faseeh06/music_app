import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Trophy, Users, Award, Star } from 'lucide-react';

const dummyLeaderboards = {
  practiceTime: [
    { rank: 1, name: 'Alice', time: '120h', instrument: 'Guitar' },
    { rank: 2, name: 'Bob', time: '90h', instrument: 'Piano' },
    { rank: 3, name: 'Charlie', time: '75h', instrument: 'Violin' },
  ],
  popularSongs: [
    { rank: 1, song: 'Wonderwall', artist: 'Oasis', plays: 150 },
    { rank: 2, song: 'Hotel California', artist: 'Eagles', plays: 120 },
    { rank: 3, song: 'Stairway to Heaven', artist: 'Led Zeppelin', plays: 100 },
  ],
  instrumentSpecific: {
    Guitar: [
      { rank: 1, name: 'Alice', time: '120h' },
      { rank: 2, name: 'Bob', time: '90h' },
      { rank: 3, name: 'Charlie', time: '75h' },
    ],
    Piano: [
      { rank: 1, name: 'David', time: '100h' },
      { rank: 2, name: 'Eve', time: '80h' },
      { rank: 3, name: 'Frank', time: '60h' },
    ],
  },
};

const dummyAchievements = [
  { name: 'Practice Streak', description: 'Practice for 7 days in a row', icon: '🏆' },
  { name: 'Song Master', description: 'Master 10 songs', icon: '🎵' },
  { name: 'Social Butterfly', description: 'Follow 5 friends', icon: '🦋' },
];

const RankingPage: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('all-time');
  const [instrument, setInstrument] = useState('all');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Rankings</h1>
          {/* Time Period and Instrument Filters */}
          <div className="flex flex-wrap gap-4 mb-8 items-center">
            <select
              value={timePeriod}
              onChange={e => setTimePeriod(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="all-time">All Time</option>
            </select>
            <select
              value={instrument}
              onChange={e => setInstrument(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="all">All Instruments</option>
              <option value="Guitar">Guitar</option>
              <option value="Piano">Piano</option>
              <option value="Violin">Violin</option>
            </select>
          </div>
          {/* Practice Time Leaderboard */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg w-full max-w-2xl mx-auto">
            <div className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5" /> Practice Time Leaderboard
            </div>
            <div className="space-y-2">
              {dummyLeaderboards.practiceTime.map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                  <span className="font-medium">{user.rank}. {user.name}</span>
                  <span>{user.time} - {user.instrument}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Popular Songs Leaderboard */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg w-full max-w-2xl mx-auto">
            <div className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" /> Popular Songs
            </div>
            <div className="space-y-2">
              {dummyLeaderboards.popularSongs.map((song) => (
                <div key={song.rank} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                  <span className="font-medium">{song.rank}. {song.song} - {song.artist}</span>
                  <span>{song.plays} plays</span>
                </div>
              ))}
            </div>
          </div>
          {/* Instrument-Specific Leaderboards */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg w-full max-w-2xl mx-auto">
            <div className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> Instrument-Specific Rankings
            </div>
            {Object.entries(dummyLeaderboards.instrumentSpecific).map(([inst, users]) => (
              <div key={inst} className="mb-4">
                <h3 className="text-lg font-medium mb-2">{inst}</h3>
                <div className="space-y-2">
                  {users.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                      <span className="font-medium">{user.rank}. {user.name}</span>
                      <span>{user.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-2xl mx-auto">
            <div className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" /> Achievements
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dummyAchievements.map((achievement) => (
                <div key={achievement.name} className="p-4 bg-gray-100 rounded-lg text-center">
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <div className="font-medium">{achievement.name}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
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