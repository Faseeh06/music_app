import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Timer,
  Users,
  Repeat,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Clock,
  Heart,
  ThumbsUp,
  Star,
  Music,
  BookOpen,
  Settings
} from 'lucide-react';
import Layout from './Layout';

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

const PracticePage: React.FC = () => {
  const { songId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(0);
  const [practiceTime, setPracticeTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChords, setShowChords] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);

  // Mock song data
  const song: Song = {
    id: songId || '1',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    youtubeId: '2Vv-BfVoq4g',
    currentPractitioners: 42,
    difficulty: 'Intermediate',
    duration: '4:23',
    chords: ['Am', 'G', 'F', 'C'],
    sections: [
      { name: 'Intro', startTime: 0, endTime: 30 },
      { name: 'Verse 1', startTime: 30, endTime: 60 },
      { name: 'Chorus', startTime: 60, endTime: 90 },
      { name: 'Verse 2', startTime: 90, endTime: 120 },
      { name: 'Bridge', startTime: 120, endTime: 150 },
      { name: 'Outro', startTime: 150, endTime: 180 }
    ]
  };

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

  return (
    <Layout showSearchBar={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden aspect-video mb-6">
              <iframe
                src={`https://www.youtube.com/embed/${song.youtubeId}?enablejsapi=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{song.title}</h1>
                  <p className="text-gray-600">{song.artist}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-brand-brown rounded-lg hover:bg-gray-100">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-brand-brown rounded-lg hover:bg-gray-100">
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-brand-brown rounded-lg hover:bg-gray-100">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-200 rounded-full mb-4">
                <div
                  className="absolute h-full bg-brand-brown rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 bg-brand-brown text-white rounded-full hover:bg-brand-dark transition-colors"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button className="p-2 text-gray-600 hover:text-brand-brown">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-brand-brown">
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 text-gray-600 hover:text-brand-brown"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsLooping(!isLooping)}
                    className={`p-2 rounded-lg ${
                      isLooping ? 'bg-brand-brown text-white' : 'text-gray-600 hover:text-brand-brown'
                    }`}
                  >
                    <Repeat className="w-5 h-5" />
                  </button>
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(Number(e.target.value))}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Practice Timer */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Practice Session</h2>
                <div className="flex items-center text-gray-600">
                  <Timer className="w-5 h-5 mr-2" />
                  <span>{formatTime(practiceTime)}</span>
                </div>
              </div>
              <div className="space-y-4">
                {song.sections.map((section, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <Music className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{section.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatTime(section.startTime)} - {formatTime(section.endTime)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chord Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Chord Chart</h2>
                <button
                  onClick={() => setShowChords(!showChords)}
                  className="p-2 text-gray-600 hover:text-brand-brown"
                >
                  <BookOpen className="w-5 h-5" />
                </button>
              </div>
              {showChords && (
                <div className="grid grid-cols-2 gap-4">
                  {song.chords.map((chord, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg text-center font-mono text-lg"
                    >
                      {chord}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Emoji Reactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Reactions</h2>
              <div className="grid grid-cols-4 gap-4">
                {['🎸', '🎵', '🎼', '🎹', '🎺', '🎻', '🥁', '🎤'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setActiveEmoji(emoji)}
                    className={`p-3 text-2xl rounded-lg transition-colors ${
                      activeEmoji === emoji
                        ? 'bg-brand-brown text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Practice Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
                <button className="p-2 text-gray-600 hover:text-brand-brown">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metronome BPM
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="208"
                    defaultValue="120"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Volume
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="80"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage; 