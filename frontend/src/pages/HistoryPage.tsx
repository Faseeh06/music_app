import React from 'react';
import { Calendar, Clock, Play, Star, BarChart3, TrendingUp, Target, Award } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useSidebar } from '../contexts/SidebarContext';

// TODO: Implement these data structures when backend is connected
// const dummySessions = [...];
// const insights = [...];
// const weeklyStats = [...];

const HistoryPage: React.FC = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-white mb-8">練習履歴</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-gray-400 text-sm">総練習時間</span>
              </div>
              <div className="text-2xl font-bold text-white">142h 30m</div>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-gray-400 text-sm">セッション数</span>
              </div>
              <div className="text-2xl font-bold text-white">89</div>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-gray-400 text-sm">平均スコア</span>
              </div>
              <div className="text-2xl font-bold text-white">87%</div>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-gray-400 text-sm">連続日数</span>
              </div>
              <div className="text-2xl font-bold text-white">12日</div>
            </div>
          </div>

          {/* Calendar and Weekly Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Practice Calendar */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-brown" />
                練習カレンダー
              </h2>              <div className="grid grid-cols-7 gap-2 text-center">
                {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
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
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand-brown" />
                週間練習
              </h2>
              <div className="space-y-4">
                {[
                  { day: '月曜日', minutes: 45, color: 'from-blue-500 to-blue-600' },
                  { day: '火曜日', minutes: 30, color: 'from-green-500 to-green-600' },
                  { day: '水曜日', minutes: 60, color: 'from-purple-500 to-purple-600' },
                  { day: '木曜日', minutes: 25, color: 'from-yellow-500 to-yellow-600' },
                  { day: '金曜日', minutes: 50, color: 'from-red-500 to-red-600' },
                  { day: '土曜日', minutes: 75, color: 'from-indigo-500 to-indigo-600' },
                  { day: '日曜日', minutes: 40, color: 'from-pink-500 to-pink-600' }
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
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-brown" />
              最近の練習セッション
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
                    <div className="text-gray-400 text-xs">{session.progress}% 完了</div>
                  </div>
                    <div className="flex gap-2">
                    <button className="px-3 py-1 bg-brand-brown text-white rounded-lg text-sm hover:bg-brand-brown/80 transition-colors">
                      再練習
                    </button>
                    <button className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-500 transition-colors">
                      統計表示
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Insights */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-brown" />
              練習インサイト
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">              {[
                {
                  title: '最も練習した楽曲',
                  content: 'ホテル・カリフォルニア',
                  subtitle: '今月12セッション',
                  icon: <Play className="w-5 h-5 text-blue-400" />,
                  color: 'bg-blue-500/20'
                },
                {
                  title: '好きなジャンル',
                  content: 'ロック',
                  subtitle: '練習時間の68%',
                  icon: <TrendingUp className="w-5 h-5 text-green-400" />,
                  color: 'bg-green-500/20'
                },
                {
                  title: 'ベスト練習日',
                  content: '土曜日',
                  subtitle: '平均75分',
                  icon: <Calendar className="w-5 h-5 text-purple-400" />,
                  color: 'bg-purple-500/20'
                },
                {
                  title: 'スキル向上',
                  content: '+15%',
                  subtitle: '今月 対 前月',
                  icon: <Target className="w-5 h-5 text-yellow-400" />,
                  color: 'bg-yellow-500/20'
                },
                {
                  title: '連続記録',
                  content: '21日',
                  subtitle: '最長の練習連続記録',
                  icon: <Award className="w-5 h-5 text-red-400" />,
                  color: 'bg-red-500/20'
                },
                {
                  title: '次の目標',
                  content: '150時間',
                  subtitle: 'マイルストーンまで8時間',
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