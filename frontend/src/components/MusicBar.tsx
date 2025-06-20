import React from 'react';
import { useMusicPlayer } from '../contexts/PlayerContext';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const MusicPlayerBar: React.FC = () => {
  const { currentTrack, isPlaying, progress, duration, togglePlay, seek, skip } = useMusicPlayer();

  if (!currentTrack) {
    return null;
  }

  const formatTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(14, 5);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  // Calculate progress for the styled seekbar
  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;
  const trackStyle = {
    background: `linear-gradient(to right, #8B4513 ${progressPercentage}%, #e2e8f0 ${progressPercentage}%)`
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <img src={currentTrack.thumbnail} alt={currentTrack.title} className="w-14 h-14 rounded-md object-cover" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-brand-dark truncate">{currentTrack.title}</p>
          <p className="text-sm text-gray-500 truncate">{currentTrack.channelTitle}</p>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => skip(-10)} className="p-2 text-gray-600 hover:text-brand-dark"><SkipBack /></button>
          <button
            onClick={togglePlay}
            className="p-3 bg-brand-brown text-white rounded-full hover:bg-brand-dark transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button onClick={() => skip(10)} className="p-2 text-gray-600 hover:text-brand-dark"><SkipForward /></button>
        </div>

        <div className="hidden md:flex flex-1 items-center gap-2">
          <span className="text-xs text-gray-500">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-transparent rounded-lg appearance-none cursor-pointer"
            style={trackStyle}
          />
          <span className="text-xs text-gray-500">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerBar;