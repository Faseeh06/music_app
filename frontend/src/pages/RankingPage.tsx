import React, { useState, useMemo, useEffect } from 'react';
import { Trophy, Medal, Star, Zap, Filter, Search, TrendingUp, ChevronDown, ChevronUp, Info, Users, Target } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useSidebar } from '../contexts/SidebarContext';

interface Player {
  rank: number;
  name: string;
  avatar: string;
  country: string;
  points: number;
  wins: number;
  loses: number;
  winRate: number;
  isTopPlayer?: boolean;
  streak: number;
  level: string;
  lastActive: string;
  totalGames: number;
  averageScore: number;
}

const RankingPage: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const [timeFilter, setTimeFilter] = useState('weekly');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRank, setSelectedRank] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'points' | 'winRate' | 'wins'>('points');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showStats, setShowStats] = useState(true);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  // Enhanced mock data with more detailed statistics
  const leaderboardData: Player[] = useMemo(() => [
    {
      rank: 1,
      name: 'AlexSkywalker',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=60&h=60&fit=crop&crop=face',
      country: '🇺🇸',
      points: 3100,
      wins: 31,
      loses: 0,
      winRate: 100,
      isTopPlayer: true,
      streak: 15,
      level: 'Master',
      lastActive: '2分前',
      totalGames: 31,
      averageScore: 100
    },
    {
      rank: 2,
      name: 'JuvenirSnoods',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=60&h=60&fit=crop&crop=face',
      country: '🇺🇸',
      points: 900,
      wins: 38,
      loses: 6,
      winRate: 86,
      streak: 7,
      level: 'Expert',
      lastActive: '5分前',
      totalGames: 44,
      averageScore: 86
    },
    {
      rank: 3,
      name: 'SarkhanFirefeffer',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=60&h=60&fit=crop&crop=face',
      country: '🇺🇸',
      points: 870,
      wins: 50,
      loses: 9,
      winRate: 80,
      streak: 3,
      level: 'Expert',
      lastActive: '1時間前',
      totalGames: 59,
      averageScore: 80
    },
    {
      rank: 4,
      name: 'tropsatlantic',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=60&h=60&fit=crop&crop=face',
      country: '🇺🇸',
      points: 840,
      wins: 29,
      loses: 6,
      winRate: 78,
      streak: 2,
      level: 'Advanced',
      lastActive: '2時間前',
      totalGames: 35,
      averageScore: 78
    },
    {
      rank: 5,
      name: 'introducerdapping',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=60&h=60&fit=crop&crop=face',
      country: '🇺🇸',
      points: 810,
      wins: 25,
      loses: 4,
      winRate: 69,
      streak: 1,
      level: 'Advanced',
      lastActive: '3時間前',
      totalGames: 29,
      averageScore: 69
    },
    {
      rank: 6,
      name: 'uninvesduniquely',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=60&h=60&fit=crop&crop=face',
      country: '🇺🇸',
      points: 690,
      wins: 50,
      loses: 16,
      winRate: 65,
      streak: 0,
      level: 'Intermediate',
      lastActive: '4時間前',
      totalGames: 66,
      averageScore: 65
    },
    {
      rank: 7,
      name: 'musicmaster7',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=60&h=60&fit=crop&crop=face',
      country: '🇺🇸',
      points: 610,
      wins: 25,
      loses: 4,
      winRate: 53,
      streak: 0,
      level: 'Intermediate',
      lastActive: '6時間前',
      totalGames: 29,
      averageScore: 53
    },
    {
      rank: 8,
      name: 'rhythmking8',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=60&h=60&fit=crop&crop=face',
      country: '🇺🇸',
      points: 580,
      wins: 40,
      loses: 18,
      winRate: 45,
      streak: 0,
      level: 'Beginner',
      lastActive: '8時間前',
      totalGames: 58,
      averageScore: 45
    }
  ], []);

  // Enhanced utility functions
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg animate-pulse">1</div>;
    if (rank === 2) return <div className="w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">2</div>;
    if (rank === 3) return <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">3</div>;
    return <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md hover:shadow-lg transition-shadow duration-200">{rank}</div>;
  };

  const getWinRateColor = (winRate: number) => {
    if (winRate >= 90) return 'text-green-400';
    if (winRate >= 70) return 'text-yellow-400';
    if (winRate >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getWinRateBadge = (winRate: number) => {
    if (winRate >= 90) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (winRate >= 70) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (winRate >= 50) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  const getPerformanceTrend = (winRate: number) => {
    if (winRate >= 80) return { icon: <TrendingUp className="w-3 h-3" />, color: 'text-green-400' };
    if (winRate >= 60) return { icon: <TrendingUp className="w-3 h-3" />, color: 'text-yellow-400' };
    return { icon: <TrendingUp className="w-3 h-3 rotate-180" />, color: 'text-red-400' };
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Master': return 'text-purple-400 bg-purple-500/20';
      case 'Expert': return 'text-blue-400 bg-blue-500/20';
      case 'Advanced': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Beginner': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 10) return <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />;
    if (streak >= 5) return <div className="w-4 h-4 bg-orange-500 rounded-full" />;
    if (streak >= 3) return <div className="w-4 h-4 bg-yellow-500 rounded-full" />;
    if (streak > 0) return <div className="w-4 h-4 bg-green-500 rounded-full" />;
    return <div className="w-4 h-4 bg-gray-500 rounded-full" />;
  };

  // Enhanced filtering and sorting with useMemo
  const filteredAndSortedData = useMemo(() => {
    const filtered = leaderboardData.filter(player => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort data based on selected criteria
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'points':
          aValue = a.points;
          bValue = b.points;
          break;
        case 'winRate':
          aValue = a.winRate;
          bValue = b.winRate;
          break;
        case 'wins':
          aValue = a.wins;
          bValue = b.wins;
          break;
        default:
          aValue = a.points;
          bValue = b.points;
      }

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return filtered;
  }, [leaderboardData, searchTerm, sortBy, sortOrder]);

  // Enhanced statistics calculation
  const stats = useMemo(() => {
    const totalPlayers = leaderboardData.length;
    const totalGames = leaderboardData.reduce((sum, player) => sum + player.totalGames, 0);
    const averageWinRate = leaderboardData.reduce((sum, player) => sum + player.winRate, 0) / totalPlayers;
    const topStreak = Math.max(...leaderboardData.map(player => player.streak));
    
    return {
      totalPlayers,
      totalGames,
      averageWinRate: Math.round(averageWinRate),
      topStreak,
      activeNow: leaderboardData.filter(player => player.lastActive.includes('分前')).length
    };
  }, [leaderboardData]);

  // Animation and interaction effects
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTrigger(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Trigger subtle animations for visual appeal
  useEffect(() => {
    // This effect uses animationTrigger to create subtle UI updates
    const elements = document.querySelectorAll('.animate-pulse');
    elements.forEach(el => {
      el.classList.remove('animate-pulse');
      setTimeout(() => el.classList.add('animate-pulse'), 100);
    });
  }, [animationTrigger]);

  const handleSortChange = (newSortBy: 'points' | 'winRate' | 'wins') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const topPlayer = leaderboardData[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">ランキング＆リーダーボード</h1>
            
            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="プレイヤーを検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              
              {/* Time Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                >
                  <option value="daily">日間</option>
                  <option value="weekly">週間</option>
                  <option value="monthly">月間</option>
                  <option value="yearly">年間</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Header Section with Enhanced Controls and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Enhanced Statistics Panel */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  統計情報
                </h3>
                <button 
                  onClick={() => setShowStats(!showStats)}
                  className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                >
                  {showStats ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
              {showStats && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">総プレイヤー数</span>
                    <span className="text-white font-bold">{stats.totalPlayers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">総ゲーム数</span>
                    <span className="text-white font-bold">{stats.totalGames}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">平均勝率</span>
                    <span className="text-white font-bold">{stats.averageWinRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">最高連勝</span>
                    <span className="text-white font-bold flex items-center gap-1">
                      {getStreakIcon(stats.topStreak)}
                      {stats.topStreak}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">現在オンライン</span>
                    <span className="text-green-400 font-bold">{stats.activeNow}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Top Player Showcase */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 lg:col-span-3 hover:bg-gray-800/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <img src={topPlayer.avatar} alt={topPlayer.name} className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400 group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1 group-hover:bg-yellow-400 transition-colors">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold text-lg hover:text-purple-300 transition-colors cursor-pointer">{topPlayer.name}</div>
                    <div className="text-gray-400 text-sm">ランク 1 - チャンピオン</div>
                    <div className={`text-xs px-2 py-1 rounded-full mt-1 border ${getWinRateBadge(topPlayer.winRate)}`}>
                      勝率 {topPlayer.winRate}%
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full mt-1 ${getLevelColor(topPlayer.level)}`}>
                      {topPlayer.level}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 group hover:bg-blue-500/10 px-3 py-2 rounded-lg transition-colors">
                    <Zap className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-blue-400 font-bold">{topPlayer.points}</span>
                  </div>
                  <div className="flex items-center gap-2 group hover:bg-green-500/10 px-3 py-2 rounded-lg transition-colors">
                    <div className="w-3 h-3 bg-green-400 rounded-full group-hover:scale-110 transition-transform"></div>
                    <span className="text-green-400 font-bold">{topPlayer.wins}</span>
                  </div>
                  <div className="flex items-center gap-2 group hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors">
                    <div className="w-3 h-3 bg-red-400 rounded-full group-hover:scale-110 transition-transform"></div>
                    <span className="text-red-400 font-bold">{topPlayer.loses}</span>
                  </div>
                  <div className="flex items-center gap-2 group hover:bg-yellow-500/10 px-3 py-2 rounded-lg transition-colors">
                    <Star className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                    <span className="text-yellow-400 font-bold">{topPlayer.winRate}%</span>
                    <div className={getPerformanceTrend(topPlayer.winRate).color}>
                      {getPerformanceTrend(topPlayer.winRate).icon}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 group hover:bg-orange-500/10 px-3 py-2 rounded-lg transition-colors">
                    {getStreakIcon(topPlayer.streak)}
                    <span className="text-orange-400 font-bold">{topPlayer.streak}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Controls and Sorting */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="プレイヤーを検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                
                {/* Time Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="daily">日間</option>
                    <option value="weekly">週間</option>
                    <option value="monthly">月間</option>
                    <option value="yearly">年間</option>
                  </select>
                </div>
              </div>
              
              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">並び替え:</span>
                <button
                  onClick={() => handleSortChange('points')}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    sortBy === 'points' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    ポイント {sortBy === 'points' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </div>
                </button>
                <button
                  onClick={() => handleSortChange('winRate')}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    sortBy === 'winRate' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  勝率 {sortBy === 'winRate' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button
                  onClick={() => handleSortChange('wins')}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    sortBy === 'wins' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  勝利数 {sortBy === 'wins' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
              </div>
            </div>
          </div>

          {/* Main Leaderboard */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden mb-8">
            {/* Table Header */}
            <div className="bg-gray-700/50 px-6 py-4 border-b border-gray-600/50">
              <div className="grid grid-cols-7 gap-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                <div>ランク</div>
                <div>プレイヤー</div>
                <div>ポイント</div>
                <div>勝利</div>
                <div>敗北</div>
                <div>勝率</div>
                <div>アクション</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-700/50">
              {filteredAndSortedData.map((player: Player, index: number) => (
                <div 
                  key={index} 
                  className={`px-6 py-4 hover:bg-gray-700/30 transition-all duration-300 cursor-pointer ${
                    player.rank <= 3 ? 'bg-gray-700/20' : ''
                  } ${selectedRank === player.rank ? 'bg-blue-500/20 border-l-4 border-blue-500' : ''}`}
                  onClick={() => setSelectedRank(selectedRank === player.rank ? null : player.rank)}
                >
                  <div className="grid grid-cols-7 gap-4 items-center">
                    {/* Rank */}
                    <div className="flex items-center gap-3">
                      <div className="hover:scale-110 transition-transform duration-200">
                        {getRankIcon(player.rank)}
                      </div>
                    </div>

                    {/* Player */}
                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full object-cover group-hover:scale-105 transition-transform duration-200" />
                        {player.rank <= 3 && (
                          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {player.rank === 1 && <Trophy className="w-3 h-3 text-yellow-400" />}
                            {player.rank === 2 && <Medal className="w-3 h-3 text-gray-400" />}
                            {player.rank === 3 && <Medal className="w-3 h-3 text-orange-400" />}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium hover:text-blue-400 transition-colors">{player.name}</div>
                        <div className={`text-xs px-2 py-1 rounded-full mt-1 ${getLevelColor(player.level)}`}>
                          {player.level}
                        </div>
                        {selectedRank === player.rank && (
                          <div className="text-xs text-gray-400 mt-1">最後のアクティブ: {player.lastActive}</div>
                        )}
                      </div>
                      <span className="text-lg hover:scale-110 transition-transform duration-200">{player.country}</span>
                    </div>

                    {/* Points */}
                    <div className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {player.points}
                      </div>
                    </div>

                    {/* Wins */}
                    <div className="text-green-400 font-bold hover:text-green-300 transition-colors">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        {player.wins}
                      </div>
                    </div>

                    {/* Loses */}
                    <div className="text-red-400 font-bold hover:text-red-300 transition-colors">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        {player.loses}
                      </div>
                    </div>

                    {/* Win Rate with Streak */}
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getWinRateColor(player.winRate)} hover:scale-105 transition-transform duration-200`}>
                        {player.winRate}%
                      </span>
                      <div className={getPerformanceTrend(player.winRate).color}>
                        {getPerformanceTrend(player.winRate).icon}
                      </div>
                      {player.streak > 0 && (
                        <div className="flex items-center gap-1">
                          {getStreakIcon(player.streak)}
                          <span className="text-xs text-orange-400">{player.streak}</span>
                        </div>
                      )}
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-2">
                      <button 
                        className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/40 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRank(player.rank);
                        }}
                      >
                        <Info className="w-4 h-4 text-blue-400" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Enhanced Expanded Details */}
                  {selectedRank === player.rank && (
                    <div className="mt-4 pt-4 border-t border-gray-600/50 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-xs text-gray-400 mb-1">総合スコア</div>
                          <div className="text-white font-bold flex items-center gap-1">
                            <Target className="w-3 h-3 text-blue-400" />
                            {player.points}
                          </div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-xs text-gray-400 mb-1">勝利数/敗北数</div>
                          <div className="text-white font-bold">{player.wins}/{player.loses}</div>
                        </div>
                        <div className={`rounded-lg p-3 border ${getWinRateBadge(player.winRate)}`}>
                          <div className="text-xs opacity-70 mb-1">勝率</div>
                          <div className="font-bold">{player.winRate}%</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-xs text-gray-400 mb-1">連勝記録</div>
                          <div className="font-bold text-orange-400 flex items-center gap-1">
                            {getStreakIcon(player.streak)}
                            {player.streak}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-xs text-gray-400 mb-1">総ゲーム数</div>
                          <div className="text-white font-bold">{player.totalGames}</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-xs text-gray-400 mb-1">平均スコア</div>
                          <div className="text-white font-bold">{player.averageScore}</div>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="text-xs text-gray-400 mb-1">最後のアクティブ</div>
                          <div className="text-white font-bold">{player.lastActive}</div>
                        </div>
                      </div>
                    </div>
                  )}
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