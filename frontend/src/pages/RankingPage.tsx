import React from 'react';
import { Trophy, Medal, Clock, Guitar, Piano, Award, TrendingUp } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useSidebar } from '../contexts/SidebarContext';

const RankingPage: React.FC = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-white mb-8">ランキング＆リーダーボード</h1>
          
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Practice Time Leaderboard */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-brand-brown/20 p-2 rounded-lg">
                  <Clock className="w-6 h-6 text-brand-brown" />
                </div>
                <div>                  <h2 className="text-xl font-bold text-white">練習時間リーダー</h2>
                  <p className="text-gray-400 text-sm">今月のトップ練習者</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[                  { 
                    rank: 1, 
                    name: 'Alex Johnson', 
                    hours: '45.2h', 
                    instrument: 'ギター',
                    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=60&h=60&fit=crop&crop=face',
                    isCurrentUser: false
                  },                  { 
                    rank: 2, 
                    name: 'Sarah Chen', 
                    hours: '42.8h', 
                    instrument: 'ピアノ',
                    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=60&h=60&fit=crop&crop=face',
                    isCurrentUser: false
                  },                  { 
                    rank: 3, 
                    name: 'Mike Rodriguez', 
                    hours: '38.1h', 
                    instrument: 'ドラム',
                    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=60&h=60&fit=crop&crop=face',
                    isCurrentUser: false
                  },                  { 
                    rank: 4, 
                    name: 'あなた', 
                    hours: '35.7h', 
                    instrument: 'ギター',
                    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=60&h=60&fit=crop&crop=face',
                    isCurrentUser: true
                  },                  { 
                    rank: 5, 
                    name: 'Emma Wilson', 
                    hours: '33.2h', 
                    instrument: 'バイオリン',
                    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=60&h=60&fit=crop&crop=face',
                    isCurrentUser: false
                  }
                ].map((user) => (
                  <div key={user.rank} className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                    user.isCurrentUser 
                      ? 'bg-brand-brown/20 border-brand-brown/50 ring-1 ring-brand-brown/30' 
                      : 'bg-gray-700/30 border-gray-600/50 hover:bg-gray-700/50'
                  }`}>
                    <div className="flex items-center justify-center w-8 h-8">
                      {user.rank === 1 && <Trophy className="w-6 h-6 text-yellow-400" />}
                      {user.rank === 2 && <Medal className="w-6 h-6 text-gray-300" />}
                      {user.rank === 3 && <Medal className="w-6 h-6 text-amber-600" />}
                      {user.rank > 3 && <span className="text-gray-400 font-bold">{user.rank}</span>}
                    </div>
                    
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                    
                    <div className="flex-1">
                      <h3 className={`font-medium ${user.isCurrentUser ? 'text-brand-brown' : 'text-white'}`}>
                        {user.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Guitar className="w-4 h-4" />
                        <span>{user.instrument}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-bold ${user.isCurrentUser ? 'text-brand-brown' : 'text-white'}`}>
                        {user.hours}
                      </div>
                      <div className="text-gray-400 text-sm">今月</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Songs Leaderboard */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>                <div>
                  <h2 className="text-xl font-bold text-white">最も練習された楽曲</h2>
                  <p className="text-gray-400 text-sm">コミュニティのお気に入り</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    rank: 1, 
                    song: 'Hotel California', 
                    artist: 'Eagles',
                    practices: '2,847',
                    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=60&h=60&fit=crop'
                  },
                  { 
                    rank: 2, 
                    song: 'Wonderwall', 
                    artist: 'Oasis',
                    practices: '2,156',
                    cover: 'https://images.pexels.com/photos/1763076/pexels-photo-1763076.jpeg?w=60&h=60&fit=crop'
                  },
                  { 
                    rank: 3, 
                    song: 'Perfect', 
                    artist: 'Ed Sheeran',
                    practices: '1,923',
                    cover: 'https://images.pexels.com/photos/1763077/pexels-photo-1763077.jpeg?w=60&h=60&fit=crop'
                  },
                  { 
                    rank: 4, 
                    song: 'Blackbird', 
                    artist: 'The Beatles',
                    practices: '1,678',
                    cover: 'https://images.pexels.com/photos/1763078/pexels-photo-1763078.jpeg?w=60&h=60&fit=crop'
                  },
                  { 
                    rank: 5, 
                    song: 'Stairway to Heaven', 
                    artist: 'Led Zeppelin',
                    practices: '1,432',
                    cover: 'https://images.pexels.com/photos/1763079/pexels-photo-1763079.jpeg?w=60&h=60&fit=crop'
                  }
                ].map((song) => (
                  <div key={song.rank} className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300">
                    <div className="flex items-center justify-center w-8 h-8">
                      {song.rank === 1 && <Trophy className="w-6 h-6 text-yellow-400" />}
                      {song.rank === 2 && <Medal className="w-6 h-6 text-gray-300" />}
                      {song.rank === 3 && <Medal className="w-6 h-6 text-amber-600" />}
                      {song.rank > 3 && <span className="text-gray-400 font-bold">{song.rank}</span>}
                    </div>
                    
                    <img src={song.cover} alt={song.song} className="w-12 h-12 rounded-lg object-cover" />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{song.song}</h3>
                      <p className="text-gray-400 text-sm">{song.artist}</p>
                    </div>
                      <div className="text-right">
                      <div className="text-white font-bold">{song.practices}</div>
                      <div className="text-gray-400 text-sm">練習回数</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instrument-Specific Rankings */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Guitar className="w-6 h-6 text-blue-400" />
              </div>              <div>
                <h2 className="text-xl font-bold text-white">楽器別ランキング</h2>
                <p className="text-gray-400 text-sm">楽器別トッププレイヤー</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[                {
                  instrument: 'ギター',
                  icon: <Guitar className="w-5 h-5 text-orange-400" />,
                  color: 'from-orange-500 to-red-500',
                  players: [
                    { name: 'Alex Johnson', score: '98%', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&crop=face' },
                    { name: 'Mike Rodriguez', score: '95%', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=40&h=40&fit=crop&crop=face' },
                    { name: 'あなた', score: '92%', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=40&h=40&fit=crop&crop=face', isCurrentUser: true }
                  ]
                },                {
                  instrument: 'ピアノ',
                  icon: <Piano className="w-5 h-5 text-purple-400" />,
                  color: 'from-purple-500 to-pink-500',
                  players: [
                    { name: 'Sarah Chen', score: '97%', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=40&h=40&fit=crop&crop=face' },
                    { name: 'Emily Davis', score: '94%', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=40&h=40&fit=crop&crop=face' },
                    { name: 'James Wilson', score: '91%', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=40&h=40&fit=crop&crop=face' }
                  ]
                },                {
                  instrument: 'ドラム',
                  icon: <Award className="w-5 h-5 text-green-400" />,
                  color: 'from-green-500 to-emerald-500',
                  players: [
                    { name: 'Chris Taylor', score: '96%', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=40&h=40&fit=crop&crop=face' },
                    { name: 'David Kim', score: '93%', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=40&h=40&fit=crop&crop=face' },
                    { name: 'Lisa Brown', score: '90%', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=40&h=40&fit=crop&crop=face' }
                  ]
                }
              ].map((instrumentRank, index) => (
                <div key={index} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${instrumentRank.color} bg-opacity-20`}>
                      {instrumentRank.icon}
                    </div>
                    <h3 className="font-bold text-white">{instrumentRank.instrument}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {instrumentRank.players.map((player, playerIndex) => (
                      <div key={playerIndex} className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        player.isCurrentUser ? 'bg-brand-brown/20' : 'hover:bg-gray-600/30'
                      }`}>
                        <div className="flex items-center justify-center w-6 h-6">
                          {playerIndex === 0 && <Trophy className="w-4 h-4 text-yellow-400" />}
                          {playerIndex === 1 && <Medal className="w-4 h-4 text-gray-300" />}
                          {playerIndex === 2 && <Medal className="w-4 h-4 text-amber-600" />}
                        </div>
                        
                        <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-full object-cover" />
                        
                        <div className="flex-1">
                          <div className={`font-medium text-sm ${player.isCurrentUser ? 'text-brand-brown' : 'text-white'}`}>
                            {player.name}
                          </div>
                        </div>
                        
                        <div className={`font-bold text-sm ${player.isCurrentUser ? 'text-brand-brown' : 'text-white'}`}>
                          {player.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Showcase */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-500/20 p-2 rounded-lg">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>              <div>
                <h2 className="text-xl font-bold text-white">最近の実績</h2>
                <p className="text-gray-400 text-sm">コミュニティの節目と成果</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[                {
                  title: '完璧な練習',
                  description: '100%の精度で10曲を完了',
                  user: 'Alex Johnson',
                  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=60&h=60&fit=crop&crop=face',
                  rarity: 'レジェンダリー',
                  color: 'border-yellow-500 bg-yellow-500/10'
                },                {
                  title: 'スピードマスター',
                  description: '150%スピードで95%以上の精度で5曲演奏',
                  user: 'Sarah Chen',
                  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=60&h=60&fit=crop&crop=face',
                  rarity: 'エピック',
                  color: 'border-purple-500 bg-purple-500/10'
                },                {
                  title: '献身',
                  description: '30日間連続で毎日練習',
                  user: 'Mike Rodriguez',
                  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=60&h=60&fit=crop&crop=face',
                  rarity: 'レア',
                  color: 'border-blue-500 bg-blue-500/10'
                },                {
                  title: 'ジャンル探検家',
                  description: '10の異なるジャンルの楽曲を練習',
                  user: 'Emma Wilson',
                  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=60&h=60&fit=crop&crop=face',
                  rarity: 'レア',
                  color: 'border-green-500 bg-green-500/10'
                },                {
                  title: 'ナイトオウル',
                  description: '深夜0時以降に20回の練習セッションを完了',
                  user: 'Chris Taylor',
                  avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=60&h=60&fit=crop&crop=face',
                  rarity: 'コモン',
                  color: 'border-gray-500 bg-gray-500/10'
                },                {
                  title: '人気の的',
                  description: '楽曲練習が100回以上シェアされた',
                  user: 'Lisa Brown',
                  avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=60&h=60&fit=crop&crop=face',
                  rarity: 'エピック',
                  color: 'border-pink-500 bg-pink-500/10'
                }
              ].map((achievement, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${achievement.color}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={achievement.avatar} alt={achievement.user} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm">{achievement.title}</h3>
                      <p className="text-gray-400 text-xs">{achievement.user}</p>
                    </div>                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      achievement.rarity === 'レジェンダリー' ? 'bg-yellow-500/20 text-yellow-400' :
                      achievement.rarity === 'エピック' ? 'bg-purple-500/20 text-purple-400' :
                      achievement.rarity === 'レア' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{achievement.description}</p>
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