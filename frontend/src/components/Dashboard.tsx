import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MusicPlayerBar from './MusicBar';
import { useMusicPlayer } from '../contexts/PlayerContext';
import { useSidebar } from '../contexts/SidebarContext';
import { usePracticeSessions } from '../hooks/usePracticeSessions';
import { 
  Play, 
  Pause,
  SkipBack,
  SkipForward,
  Brain,
  Target,
  TrendingUp,
  Music,
  Clock
} from 'lucide-react';

// The leaderboard and popular songs data is now fetched from the backend,
// so the static mock data can be removed.

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();
  const { currentTrack, isPlaying, togglePlay, progress, duration, skip, playTrack } = useMusicPlayer();
  
  // Updated hook usage to handle loading and error states
  const { 
    recentSessions, 
    formatRelativeTime, 
    loading, 
    error,
    stats
  } = usePracticeSessions();

  return (
    <div className="min-h-screen bg-[#101218] text-white font-poppins relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-brand-brown/10 via-brand-brown/2 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-brand-yellow/6 via-brand-yellow/1 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-radial from-brand-brown/8 via-brand-brown/2 to-transparent rounded-full blur-3xl"></div>
      </div>

      <Sidebar />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'} relative z-10`}>
        <Navbar />
        <div className="px-4 py-8 flex flex-col gap-8">
          
          {/* Hero Section - Currently Playing and AI Recommendations */}
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Currently Playing Section with integrated Leaderboard - Takes first 9 columns */}
            <div className="lg:col-span-9 p-6">
              <div className="relative group">
                <img 
                  src={currentTrack?.thumbnail || "/src/assets/images/bmwsong.jpeg"}
                  alt={currentTrack?.title || "No track playing"}
                  className="w-full aspect-[3/1] rounded-xl object-cover cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
                  onClick={() => {
                    if (currentTrack?.id) {
                      navigate(`/practice/${currentTrack.id}`);
                    }
                  }}
                />
                {/* Practice button overlay */}
                {currentTrack?.id && (
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
                      練習ページへ
                    </div>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  中級者
                </div>

                {/* Music Player Controls - Left Side */}
                <div className="absolute bottom-3 left-6 right-3">
                  <div className="flex items-start">
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-white mb-1 text-center">
                        {currentTrack?.title || "再生中の楽曲なし"}
                      </h3>
                      <p className="text-sm text-gray-300 mb-3 text-center">
                        {currentTrack?.channelTitle || "楽曲を選択して開始"}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="flex items-center gap-2 mb-3 w-64">
                        <span className="text-xs text-gray-400">
                          {Math.floor(progress / 60)}:{(Math.floor(progress) % 60).toString().padStart(2, '0')}
                        </span>
                        <div className="flex-1 h-1.5 bg-gray-600 rounded-full overflow-hidden cursor-pointer">
                          <div 
                            className="h-1.5 bg-brand-brown rounded-full transition-all duration-200" 
                            style={{ width: duration > 0 ? `${(progress / duration) * 100}%` : '0%' }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {Math.floor(duration / 60)}:{(Math.floor(duration) % 60).toString().padStart(2, '0')}
                        </span>
                      </div>

                      {/* Play Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <button 
                          className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                          disabled={!currentTrack}
                          onClick={() => skip(-10)}
                        >
                          <SkipBack className="w-4 h-4 text-gray-300" />
                        </button>
                        <button 
                          className="p-3 rounded-full bg-brand-brown text-white hover:bg-brand-yellow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => togglePlay()}
                          disabled={!currentTrack}
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                        <button 
                          className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                          disabled={!currentTrack}
                          onClick={() => skip(10)}
                        >
                          <SkipForward className="w-4 h-4 text-gray-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leaderboard - Right Side within the image */}
                <div className="absolute top-3 right-16 bottom-3 flex flex-col justify-start w-56">
                  <div className="p-4">
                    <h3 className="text-lg font-light text-white mb-4">Leaderboard</h3>
                    <div className="space-y-3">
                      {/* Placeholder for fetched leaderboard data */}
                      <p className="text-xs text-gray-400">Leaderboard loading...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Songs Section - Takes 3 columns */}
            <div className="lg:col-span-3 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-brand-brown" />
                <h3 className="text-lg font-bold text-white">Popular Songs</h3>
              </div>
              <div className="space-y-3">
                {/* Placeholder for fetched popular songs data */}
                <p className="text-xs text-gray-400">Popular songs loading...</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Recent Practice Sessions - Takes first 9 columns */}
            <div className="lg:col-span-9 p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-xl flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">最近の練習セッション</h3>
                    <p className="text-sm text-gray-400">あなたの音楽の旅は続きます • クリックして再生・練習</p>
                  </div>
                </div>
                <button 
                  className="px-6 py-2 bg-brand-brown/20 text-brand-brown hover:bg-brand-brown hover:text-white font-medium text-sm transition-all duration-300 rounded-lg border border-brand-brown/30 hover:border-brand-brown"
                  title="すべての練習セッションを表示し、クリックして再生・練習できます"
                >
                  すべてのセッションを表示
                </button>
              </div>
              
              <div className="space-y-2">
                {loading ? (
                  <div className="text-center py-8 text-gray-400">Loading sessions...</div>
                ) : error ? (
                  <div className="text-center py-8 text-red-500">{error}</div>
                ) : recentSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-400 mb-2">No practice sessions yet</h4>
                    <p className="text-sm text-gray-500 mb-4">Select a song and start practicing!</p>
                  </div>
                ) : (
                  recentSessions.map((session) => (
                    <div
                      key={session.id}
                      className="group relative rounded-lg p-4 cursor-pointer hover:bg-gray-800/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                      onClick={() => {
                        // The new session object doesn't have trackData, so we construct it.
                        const track = {
                          id: session.songId,
                          title: session.songTitle,
                          channelTitle: session.artist,
                          thumbnail: `https://i.ytimg.com/vi/${session.songId}/hqdefault.jpg` // Assuming songId is a YouTube ID
                        };
                        playTrack(track);
                        navigate(`/practice/${session.songId}`);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        {/* Album Art with Play Overlay */}
                        <div className="relative">
                          <img
                            src={`https://i.ytimg.com/vi/${session.songId}/hqdefault.jpg`}
                            alt={session.songTitle}
                            className="w-12 h-12 rounded-lg object-cover shadow-md"
                          />
                          <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Song Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-bold text-white truncate group-hover:text-brand-yellow transition-colors">
                                {session.songTitle}
                              </h4>
                              <p className="text-sm text-gray-400 truncate">{session.artist}</p>
                            </div>

                            {/* Practice Stats */}
                            <div className="flex items-center gap-3 text-xs text-gray-300 mx-4">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{session.duration}m</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                <span>{session.score}%</span>
                              </div>
                            </div>

                            {/* Date and Skills */}
                            <div className="text-right">
                              <div className="text-xs text-gray-500 mb-1">{formatRelativeTime(session.completedAt.toDate())}</div>
                              {/* Skills improved is not part of the new model, can be added later */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* AI Recommendations Section - Takes 3 columns */}
            <div className="lg:col-span-3 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">AIおすすめ</h3>
                    <p className="text-xs text-gray-400">パーソナライズされた提案</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{Math.floor(stats.todayPracticeTime / 60)}/30</div>
                  <div className="text-yellow-100 text-sm">分</div>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div className="bg-white h-3 rounded-full" style={{ width: `${(stats.todayPracticeTime / (30 * 60)) * 100}%` }}></div>
              </div>
              <p className="text-yellow-100 text-sm">1日の目標達成まであと{Math.max(0, 30 - Math.floor(stats.todayPracticeTime / 60))}分！🎯</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Music Player Bar */}
      <MusicPlayerBar />
    </div>
  );
};

export default Dashboard;