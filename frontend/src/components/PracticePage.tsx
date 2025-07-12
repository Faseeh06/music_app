import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Timer,
  Users,
  Trophy,
  Medal,
  Crown,
  Target,
  ArrowLeft,
  Guitar
} from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MusicPlayerBar from './MusicBar';
import { useMusicPlayer } from '../contexts/PlayerContext';
import { useSidebar } from '../contexts/SidebarContext';
import { usePracticeSessions } from '../hooks/usePracticeSessions';

interface Song {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  currentPractitioners: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  chords: string[];
  sections: {
    name: string;
    startTime: number;
    endTime: number;
  }[];
}

interface ChordPosition {
  chord: string;
  frets: number[];
  fingers: number[];
}

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  avatar: string;
  rank: number;
  badge?: string;
}

const PracticePage: React.FC = () => {
  const { songId } = useParams();
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();
  const { currentTrack, isPlaying, togglePlay, progress, duration, skip } = useMusicPlayer();
  const { addSession } = usePracticeSessions();
  const [practiceTime, setPracticeTime] = useState(0);
  const [showChords, setShowChords] = useState(true);
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);
  const [selectedChord, setSelectedChord] = useState<string | null>(null);
  const [sessionRecorded, setSessionRecorded] = useState(false);
  const [sentEmojis, setSentEmojis] = useState<string[]>([]);
  const [emojiAnimation, setEmojiAnimation] = useState<string | null>(null);

  // Get current song data (could be from props, context, or API)
  const song: Song = currentTrack ? {
    id: currentTrack.id,
    title: currentTrack.title,
    artist: currentTrack.channelTitle,
    youtubeId: currentTrack.id,
    currentPractitioners: Math.floor(Math.random() * 100) + 1,
    difficulty: 'Intermediate',
    duration: '4:23',
    chords: ['Am', 'G', 'F', 'C', 'Dm', 'Em'],
    sections: [
      { name: 'イントロ', startTime: 0, endTime: 30 },
      { name: 'バース1', startTime: 30, endTime: 60 },
      { name: 'コーラス', startTime: 60, endTime: 90 },
      { name: 'バース2', startTime: 90, endTime: 120 },
      { name: 'ブリッジ', startTime: 120, endTime: 150 },
      { name: 'アウトロ', startTime: 150, endTime: 180 }
    ]
  } : {
    id: songId || '1',
    title: 'No Song Selected',
    artist: 'Select a song to practice',
    youtubeId: '',
    currentPractitioners: 0,
    difficulty: 'Beginner',
    duration: '0:00',
    chords: [],
    sections: []
  };

  // Chord positions data
  const chordPositions: Record<string, ChordPosition> = {
    'Am': { chord: 'Am', frets: [0, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
    'G': { chord: 'G', frets: [3, 2, 0, 0, 3, 3], fingers: [3, 1, 0, 0, 4, 4] },
    'F': { chord: 'F', frets: [1, 1, 3, 3, 2, 1], fingers: [1, 1, 3, 4, 2, 1] },
    'C': { chord: 'C', frets: [0, 1, 0, 2, 3, 0], fingers: [0, 1, 0, 2, 3, 0] },
    'Dm': { chord: 'Dm', frets: [0, 0, 0, 2, 3, 1], fingers: [0, 0, 0, 1, 3, 2] },
    'Em': { chord: 'Em', frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] }
  };

  // Leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    { id: '1', name: 'Ali Hassanain', score: 98, avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=40&h=40&fit=crop&crop=face', rank: 1, badge: '🏆' },
    { id: '2', name: 'Hamza', score: 95, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=40&h=40&fit=crop&crop=face', rank: 2, badge: '🥈' },
    { id: '3', name: 'Fahad', score: 92, avatar: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?w=40&h=40&fit=crop&crop=face', rank: 3, badge: '🥉' },
    { id: '4', name: 'Raza', score: 89, avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?w=40&h=40&fit=crop&crop=face', rank: 4 },
    { id: '5', name: 'Sara', score: 87, avatar: 'https://images.pexels.com/photos/1040882/pexels-photo-1040882.jpeg?w=40&h=40&fit=crop&crop=face', rank: 5 }
  ];

  // Record practice session when user starts practicing
  useEffect(() => {
    if (isPlaying && currentTrack && !sessionRecorded) {
      const difficulty = ['初心者', '中級者', '上級者'][Math.floor(Math.random() * 3)];
      const skillsArray = [
        'コード移行', 'ストラミングパターン', 'フィンガーピッキング', 'テンポコントロール',
        'バレーコード', 'ダイナミクス', 'リードギター', 'タイミング', 'メロディー', 'リズム'
      ];
      
      addSession({
        songId: currentTrack.id,
        songTitle: currentTrack.title,
        artist: currentTrack.channelTitle,
        thumbnail: currentTrack.thumbnail,
        duration: Math.floor(duration / 60) || 4, // Convert to minutes, default to 4 if not available
        progress: Math.floor(Math.random() * 40) + 60, // Random progress between 60-100%
        aiScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        skillsImproved: skillsArray.slice(0, Math.floor(Math.random() * 3) + 1), // 1-3 random skills
        practiceTime: 0, // Will be updated as they practice
        difficulty: difficulty,
        trackData: {
          id: currentTrack.id,
          title: currentTrack.title,
          channelTitle: currentTrack.channelTitle,
          thumbnail: currentTrack.thumbnail
        }
      });
      
      setSessionRecorded(true);
    }
  }, [isPlaying, currentTrack, sessionRecorded, addSession, duration]);

  // Reset session recording when track changes
  useEffect(() => {
    setSessionRecorded(false);
  }, [currentTrack?.id]);

  // Practice timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setPracticeTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render guitar chord diagram
  const renderChordDiagram = (chordName: string) => {
    const chordData = chordPositions[chordName];
    if (!chordData) return null;

    return (
      <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-3 text-center">
        <div className="font-bold text-lg mb-2 text-white">{chordName}</div>
        <div className="relative">
          {/* Fretboard */}
          <svg width="80" height="100" className="mx-auto">
            {/* Strings */}
            {[0, 1, 2, 3, 4, 5].map(string => (
              <line
                key={string}
                x1={15 + string * 10}
                y1={10}
                x2={15 + string * 10}
                y2={85}
                stroke="#9CA3AF"
                strokeWidth="1"
              />
            ))}
            {/* Frets */}
            {[0, 1, 2, 3, 4].map(fret => (
              <line
                key={fret}
                x1={15}
                y1={10 + fret * 15}
                x2={65}
                y2={10 + fret * 15}
                stroke="#9CA3AF"
                strokeWidth="1"
              />
            ))}
            {/* Finger positions */}
            {chordData.frets.map((fret, string) => {
              if (fret === 0) return null;
              return (
                <circle
                  key={string}
                  cx={15 + string * 10}
                  cy={10 + (fret - 0.5) * 15}
                  r="4"
                  fill="#8B4513"
                />
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-800/40 text-gray-300 hover:text-white rounded-lg border border-gray-700/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">戻る</span>
          </button>
        </div>

        <div className="px-4 py-8 flex flex-col gap-8">
          
          {/* Hero Section - Music Player and Practice Timer */}
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Music Player Section - Takes first 9 columns */}
            <div className="lg:col-span-9 p-6">
              <div className="relative group">
                <img 
                  src={currentTrack?.thumbnail || "/src/assets/images/bmwsong.jpeg"}
                  alt={currentTrack?.title || "No track playing"}
                  className="w-full aspect-[3/1] rounded-xl object-cover"
                />
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
                          onClick={(e) => {
                            e.stopPropagation();
                            skip(-10);
                          }}
                        >
                          <SkipBack className="w-4 h-4 text-gray-300" />
                        </button>
                        <button 
                          className="p-3 rounded-full bg-brand-brown text-white hover:bg-brand-yellow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                          }}
                          disabled={!currentTrack}
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                        <button 
                          className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                          disabled={!currentTrack}
                          onClick={(e) => {
                            e.stopPropagation();
                            skip(10);
                          }}
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

            {/* Practice Timer - Takes 3 columns */}
            <div className="lg:col-span-3 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Timer className="w-5 h-5 text-brand-brown" />
                <h3 className="text-lg font-bold text-white">練習時間</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/20 transition-colors">
                  <span className="text-gray-300">今日</span>
                  <span className="text-white font-mono">{formatTime(practiceTime)}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/20 transition-colors">
                  <span className="text-gray-300">合計</span>
                  <span className="text-white font-mono">23:45</span>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Content */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Practice Area - Takes first 9 columns */}
            <div className="lg:col-span-9 p-6">

              {/* Interactive Emoji Reactions */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">練習の感想を送信</h3>
                      <p className="text-sm text-gray-400">他の練習者と感想を共有しましょう</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">送信済み: {sentEmojis.length}</div>
                  </div>
                </div>
                
                {/* Emoji Selection Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {['🎸', '🎵', '🎼', '🎹', '🎺', '🎻', '🥁', '🎤', '🔥', '💪', '😍', '🎯', '👏', '⭐', '🚀', '❤️'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setActiveEmoji(emoji);
                        setEmojiAnimation(emoji);
                        setSentEmojis(prev => [...prev, emoji]);
                        // Reset animation after 1 second
                        setTimeout(() => setEmojiAnimation(null), 1000);
                      }}
                      className={`relative p-3 text-2xl rounded-lg transition-all transform hover:scale-110 ${
                        activeEmoji === emoji
                          ? 'bg-brand-brown/30 border-2 border-brand-brown scale-110'
                          : 'hover:bg-gray-800/20 border-2 border-transparent hover:border-brand-brown/50'
                      } ${emojiAnimation === emoji ? 'animate-bounce' : ''}`}
                    >
                      {emoji}
                      {sentEmojis.filter(e => e === emoji).length > 0 && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-brown rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">
                            {sentEmojis.filter(e => e === emoji).length}
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Recent Emoji Stream */}
                <div className="bg-gray-800/20 rounded-lg p-4 border border-gray-700/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-brand-brown" />
                    <h4 className="text-sm font-semibold text-white">リアルタイム感想</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
                    {sentEmojis.length > 0 ? (
                      sentEmojis.slice(-10).map((emoji, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <span className="text-lg">{emoji}</span>
                          <span className="text-xs text-gray-400">You</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">感想を送信して他の練習者とコミュニケーションしましょう</p>
                    )}
                  </div>
                </div>
                
                {/* Send Button */}
                {activeEmoji && (
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (activeEmoji) {
                          setSentEmojis(prev => [...prev, activeEmoji]);
                          setActiveEmoji(null);
                        }
                      }}
                      className="px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/80 transition-colors font-medium flex items-center gap-2"
                    >
                      <span className="text-lg">{activeEmoji}</span>
                      <span>送信</span>
                    </button>
                    <button
                      onClick={() => setActiveEmoji(null)}
                      className="px-4 py-3 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/70 transition-colors"
                    >
                      キャンセル
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Takes 3 columns */}
            <div className="lg:col-span-3 p-6">
              {/* Enhanced Chord Chart */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Guitar className="w-5 h-5 text-brand-brown" />
                    <h3 className="text-lg font-bold text-white">コード表</h3>
                  </div>
                  <button
                    onClick={() => setShowChords(!showChords)}
                    className="text-sm text-brand-brown hover:text-brand-yellow transition-colors"
                  >
                    {showChords ? '非表示' : '表示'}
                  </button>
                </div>
                
                {showChords && (
                  <div className="space-y-6">
                    {/* Chord Selection Grid */}
                    <div className="bg-gray-800/20 rounded-xl p-4 border border-gray-700/30">
                      <h4 className="text-sm font-semibold text-white mb-3">コード選択</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {song.chords.map((chord, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedChord(chord)}
                            className={`relative p-4 rounded-lg text-center font-mono text-xl transition-all transform hover:scale-105 ${
                              selectedChord === chord
                                ? 'bg-gradient-to-r from-brand-brown to-brand-yellow text-white shadow-lg border-2 border-brand-brown'
                                : 'bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 border-2 border-transparent hover:border-brand-brown/50'
                            }`}
                          >
                            {chord}
                            {selectedChord === chord && (
                              <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-yellow rounded-full flex items-center justify-center">
                                <Target className="w-2 h-2 text-black" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Selected Chord Diagram */}
                    {selectedChord && (
                      <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-2xl text-brand-brown">{selectedChord}</span>
                            <span className="text-sm font-normal text-gray-400">コード</span>
                          </h3>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-xs text-gray-400">練習中</span>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          {renderChordDiagram(selectedChord)}
                        </div>
                        <div className="mt-4 p-3 bg-gray-700/20 rounded-lg">
                          <h4 className="text-sm font-semibold text-white mb-2">練習のヒント</h4>
                          <p className="text-xs text-gray-400">
                            指の位置を確認し、各弦を個別に弾いて音がクリアに出るか確認しましょう。
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Chord Progression */}
                    <div className="bg-gray-800/20 rounded-xl p-4 border border-gray-700/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-white">コード進行</h4>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-brand-brown" />
                          <span className="text-xs text-gray-400">全{song.chords.length}コード</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {song.chords.map((chord, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedChord(chord)}
                            className={`px-3 py-2 rounded-lg text-sm font-mono transition-colors ${
                              selectedChord === chord
                                ? 'bg-brand-brown text-white'
                                : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/50'
                            }`}
                          >
                            {chord}
                          </button>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        コードをクリックして詳細を表示
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Practice Leaderboard */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-brand-brown" />
                    <h3 className="text-lg font-bold text-white">練習リーダーボード</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">リアルタイム</span>
                  </div>
                </div>
                
                                 <div className="bg-gray-800/20 rounded-xl p-4 border border-gray-700/30 space-y-3">
                   {leaderboardData.map((entry) => (
                    <div
                      key={entry.id}
                      className={`relative flex items-center justify-between p-4 rounded-lg transition-all hover:scale-[1.02] ${
                        entry.name === 'You' 
                          ? 'bg-gradient-to-r from-brand-brown/30 to-brand-yellow/20 border-2 border-brand-brown/50 shadow-lg' 
                          : 'bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30'
                      }`}
                    >
                      {/* Rank and Badge */}
                      <div className="flex items-center space-x-3">
                        <div className="relative flex items-center justify-center w-10 h-10">
                          {entry.rank === 1 ? (
                            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                              <Crown className="w-5 h-5 text-yellow-900" />
                            </div>
                          ) : entry.rank === 2 ? (
                            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                              <Medal className="w-5 h-5 text-gray-700" />
                            </div>
                          ) : entry.rank === 3 ? (
                            <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center">
                              <Medal className="w-5 h-5 text-amber-900" />
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gray-600/50 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-white">
                                {entry.rank}
                              </span>
                            </div>
                          )}
                          
                          {/* Rank Change Indicator */}
                          {entry.rank <= 3 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white">↑</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Player Info */}
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={entry.avatar}
                              alt={entry.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-gray-600/50"
                            />
                            {entry.name === 'You' && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-brown rounded-full flex items-center justify-center">
                                <Target className="w-2 h-2 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <span className={`font-semibold ${
                              entry.name === 'You' ? 'text-brand-yellow' : 'text-white'
                            }`}>
                              {entry.name}
                            </span>
                            {entry.name === 'You' && (
                              <div className="text-xs text-brand-brown">あなた</div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Score and Progress */}
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-xl text-brand-brown">
                            {entry.score}
                          </div>
                          <div className="text-xs text-gray-400">pts</div>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-brand-brown to-brand-yellow rounded-full transition-all"
                              style={{ width: `${(entry.score / 100) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{entry.score}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Your Current Position */}
                <div className="mt-4 bg-gradient-to-r from-brand-brown/20 to-brand-yellow/10 rounded-xl p-4 border border-brand-brown/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-brown rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">あなたの現在位置</h4>
                        <p className="text-sm text-gray-400">今日の練習で順位を上げましょう</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-brand-brown">6位</div>
                      <div className="text-xs text-gray-400">目標: 5位</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Music Player Bar */}
      <MusicPlayerBar />
    </div>
  );
};

export default PracticePage; 