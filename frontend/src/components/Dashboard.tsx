import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MusicPlayerBar from './MusicBar';
import SampleDataButton from './SampleDataButton';
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
  Clock,
  Users
} from 'lucide-react';





interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  avatar: string;
  rank: number;
  badge?: string;
}

interface PopularSong {
  id: string;
  title: string;
  artist: string;
  avatar: string;
  plays: string;
  difficulty: string;
}



const leaderboardData: LeaderboardEntry[] = [
  { id: '1', name: 'Ali Hassanain', score: 98, avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=40&h=40&fit=crop&crop=face', rank: 1, badge: '🏆' },
  { id: '2', name: 'Hamza', score: 95, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=40&h=40&fit=crop&crop=face', rank: 2, badge: '🥈' },
  { id: '3', name: 'Fahad', score: 92, avatar: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?w=40&h=40&fit=crop&crop=face', rank: 3, badge: '🥉' },
  { id: '4', name: 'Raza', score: 89, avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?w=40&h=40&fit=crop&crop=face', rank: 4 },
  { id: '5', name: 'Sara', score: 87, avatar: 'https://images.pexels.com/photos/1040882/pexels-photo-1040882.jpeg?w=40&h=40&fit=crop&crop=face', rank: 5 }
];

const popularSongs: PopularSong[] = [
  { id: '1', title: 'パーフェクト', artist: 'エド・シーラン', avatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=40&h=40&fit=crop', plays: '2.1M', difficulty: '中級者' },
  { id: '2', title: 'ワンダーウォール', artist: 'オアシス', avatar: 'https://images.pexels.com/photos/1763076/pexels-photo-1763076.jpeg?w=40&h=40&fit=crop', plays: '1.8M', difficulty: '初心者' },
  { id: '3', title: 'ホテル・カリフォルニア', artist: 'イーグルス', avatar: 'https://images.pexels.com/photos/1763077/pexels-photo-1763077.jpeg?w=40&h=40&fit=crop', plays: '1.5M', difficulty: '上級者' },
  { id: '4', title: 'ブラックバード', artist: 'ビートルズ', avatar: 'https://images.pexels.com/photos/1763078/pexels-photo-1763078.jpeg?w=40&h=40&fit=crop', plays: '1.2M', difficulty: '中級者' },
  { id: '5', title: '天国への階段', artist: 'レッド・ツェッペリン', avatar: 'https://images.pexels.com/photos/1763079/pexels-photo-1763079.jpeg?w=40&h=40&fit=crop', plays: '1.0M', difficulty: '上級者' }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();
  const { currentTrack, isPlaying, togglePlay, progress, duration, skip, playTrack } = useMusicPlayer();
  const { recentSessions, formatRelativeTime } = usePracticeSessions();


  const getDifficultyColorDark = (difficulty: string) => {
    switch (difficulty) {
      case '初心者': return 'text-green-400 bg-green-900/30 border-green-700/30';
      case '中級者': return 'text-orange-400 bg-orange-900/30 border-orange-700/30';
      case '上級者': return 'text-red-400 bg-red-900/30 border-red-700/30';
      default: return 'text-gray-400 bg-gray-800/30 border-gray-700/30';
    }
  };

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
              <div className="relative">
                <img 
                  src={currentTrack?.thumbnail || "/src/assets/images/bmwsong.jpeg"}
                  alt={currentTrack?.title || "No track playing"}
                  className="w-full aspect-[3/1] rounded-xl object-cover"
                />                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  中級者
                </div>

                {/* Music Player Controls - Left Side */}
                <div className="absolute bottom-3 left-6 right-3">
                  <div className="flex items-start">
                    <div className="flex flex-col items-center">                      <h3 className="text-xl font-bold text-white mb-1 text-center">
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
                    <h3 className="text-lg font-light text-white mb-4">リーダーボード</h3>
                    <div className="space-y-3">
                      {leaderboardData.slice(0, 5).map((player) => (
                        <div key={player.id} className="flex items-center gap-3 text-sm">
                          <div className="flex-shrink-0 w-5 text-center">
                            <span className="text-sm font-light text-white">{player.rank}.</span>
                          </div>
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-light text-white truncate text-sm">{player.name}</h4>
                          </div>
                        </div>
                  ))}
                </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Songs Section - Takes 3 columns */}
            <div className="lg:col-span-3 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-brand-brown" />
                <h3 className="text-lg font-bold text-white">人気の楽曲</h3>
              </div>
              <div className="space-y-3">
                {popularSongs.map((song, index) => (
                  <div 
                    key={song.id} 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/20 transition-colors cursor-pointer group"
                    onClick={() => {
                      const track = {
                        id: song.id,
                        title: song.title,
                        channelTitle: song.artist,
                        thumbnail: song.avatar
                      };
                      // For mock data, we'll use YouTube video IDs for real songs
                      const youtubeIds = ['2Vv-BfVoq4g', 'bx1Bh8ZvH84', 'BciS5krYL80', 'Man4t8eIOh0', 'QkF3oxziUI4'];
                      track.id = youtubeIds[parseInt(song.id) - 1] || song.id;
                      playTrack(track);
                    }}
                  >
                    <div className="flex-shrink-0 w-6 text-center">
                      <span className="text-sm font-bold text-gray-400">{index + 1}</span>
                    </div>
                    <img
                      src={song.avatar}
                      alt={song.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white truncate text-sm group-hover:text-brand-yellow transition-colors">{song.title}</h4>
                      <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{song.plays}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded border ${getDifficultyColorDark(song.difficulty)}`}>
                        {song.difficulty}
                      </span>
                    </div>
                    {/* Play button overlay */}
                    <div 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent onClick
                        const track = {
                          id: song.id,
                          title: song.title,
                          channelTitle: song.artist,
                          thumbnail: song.avatar
                        };
                        const youtubeIds = ['2Vv-BfVoq4g', 'bx1Bh8ZvH84', 'BciS5krYL80', 'Man4t8eIOh0', 'QkF3oxziUI4'];
                        track.id = youtubeIds[parseInt(song.id) - 1] || song.id;
                        playTrack(track);
                      }}
                    >
                      <Play className="w-4 h-4 text-brand-brown" />
                    </div>
                  </div>
                ))}
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
                {recentSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-400 mb-2">まだ練習セッションがありません</h4>
                    <p className="text-sm text-gray-500 mb-4">楽曲を選択して練習を開始しましょう</p>
                    <div className="text-xs text-gray-600">
                      ヒント: 右下の「Add Sample Data」ボタンでサンプルデータを追加できます<br/>
                      練習セッションをクリックすると、その楽曲を再生・練習できます
                    </div>
                  </div>
                ) : (
                  recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="group relative rounded-lg p-4 cursor-pointer hover:bg-gray-800/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                    onClick={() => {
                      // Load the song if we have track data
                      if (session.trackData) {
                        playTrack(session.trackData);
                      } else {
                        // Fallback: try to create track data from session info
                        const fallbackTrack = {
                          id: session.songId,
                          title: session.songTitle,
                          channelTitle: session.artist,
                          thumbnail: session.thumbnail
                        };
                        playTrack(fallbackTrack);
                      }
                      navigate(`/practice/${session.songId}`);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Album Art with Play Overlay */}
                      <div className="relative">
                        <img
                          src={session.thumbnail}
                          alt={session.songTitle}
                          className="w-12 h-12 rounded-lg object-cover shadow-md"
                    />
                        <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                        
                        {/* Play indicator - always visible */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-brown rounded-full flex items-center justify-center border-2 border-[#101218]">
                          <Play className="w-2 h-2 text-white" />
                        </div>
                        {/* Progress Ring */}
                        <div className="absolute -top-1 -right-1 w-5 h-5">
                          <div className="w-full h-full rounded-full border-2 border-brand-brown bg-[#101218] flex items-center justify-center">
                            <span className="text-xs font-bold text-brand-brown">{session.progress}%</span>
                          </div>
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
                              <span>{session.progress}%</span>
                            </div>
                          </div>

                          {/* Date and Skills */}
                          <div className="text-right">
                            <div className="text-xs text-gray-500 mb-1">{formatRelativeTime(session.date)}</div>
                            <div className="flex gap-1 justify-end">
                              {session.skillsImproved.slice(0, 1).map((skill, idx) => (
                                <span key={idx} className="text-xs bg-gradient-to-r from-green-900/40 to-emerald-900/40 text-green-300 px-2 py-0.5 rounded-full border border-green-700/30 font-medium">
                                  {skill}
                                </span>
                              ))}
                              {session.skillsImproved.length > 1 && (
                                <span className="text-xs bg-gray-700/30 text-gray-400 px-2 py-0.5 rounded-full border border-gray-600/30">
                                  +{session.skillsImproved.length - 1}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Arrow */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <div className="w-6 h-6 rounded-full bg-brand-brown/20 flex items-center justify-center">
                        <Play className="w-3 h-3 text-brand-brown" />
                      </div>
                    </div>
                    
                    {/* Play button tooltip */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-brand-brown text-white text-xs px-2 py-1 rounded-md shadow-lg">
                        クリックして再生・練習
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
                  <div>                    <h3 className="text-lg font-bold text-white">AIおすすめ</h3>
                    <p className="text-xs text-gray-400">パーソナライズされた提案</p>
          </div>
                </div>
                <div className="text-right">                  <div className="text-2xl font-bold">22/30</div>
                  <div className="text-yellow-100 text-sm">分</div>
              </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div className="bg-white h-3 rounded-full" style={{ width: '73%' }}></div>
              </div>
              <p className="text-yellow-100 text-sm">1日の目標達成まであと8分！🎯</p>
            </div>
          </div>


        </div>
        

      </div>
      {/* Music Player Bar */}
      <MusicPlayerBar />
      
      {/* Sample Data Button for testing */}
      <SampleDataButton />
    </div>
  );
};

export default Dashboard;