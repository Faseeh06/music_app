import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useMusicPlayer } from '../../contexts/PlayerContext';
import { LeaderboardEntry } from '../../types';

interface MusicPlayerProps {
  leaderboard: LeaderboardEntry[];
  leaderboardLoading: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ leaderboard, leaderboardLoading }) => {
  const { currentTrack, isPlaying, togglePlay, progress, duration, skip } = useMusicPlayer();

  return (
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
              {leaderboardLoading ? (
                <p className="text-gray-400 text-center">Loading...</p>
              ) : (
                leaderboard.slice(0, 5).map((player) => (
                  <div key={player.userId} className="flex items-center gap-3 text-sm">
                    <div className="flex-shrink-0 w-5 text-center">
                      <span className="text-sm font-light text-white">{player.rank}.</span>
                    </div>
                    <img
                      src={player.userAvatar || "/src/assets/images/default-avatar.png"}
                      alt={player.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-light text-white truncate text-sm">{player.userName}</h4>
                    </div>
                  </div>
                )))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
