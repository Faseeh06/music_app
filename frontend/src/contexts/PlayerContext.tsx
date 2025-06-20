import React, { createContext, useState, useRef, useContext, ReactNode, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

export interface Track {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

interface MusicPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  skip: (seconds: number) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<YT.Player | null>(null);
  const intervalRef = useRef<number>();

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const playTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };
  
  const seek = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      setProgress(time);
    }
  };

  const skip = (seconds: number) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const newTime = Math.max(0, currentTime + seconds);
      seek(newTime);
    }
  };

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    event.target.playVideo();
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    setIsPlaying(event.data === YT.PlayerState.PLAYING);
    if (event.data === YT.PlayerState.PLAYING) {
        const videoDuration = playerRef.current?.getDuration() || 0;
        setDuration(videoDuration);

        clearInterval(intervalRef.current);
        
        intervalRef.current = window.setInterval(() => {
            const currentTime = playerRef.current?.getCurrentTime() || 0;
            setProgress(currentTime);
        }, 500);
    } else {
        clearInterval(intervalRef.current);
    }
  };
  
  const onEnd: YouTubeProps['onEnd'] = () => {
      setIsPlaying(false);
      if (duration > 0) {
        setProgress(duration);
      }
  };

  const value = { currentTrack, isPlaying, progress, duration, playTrack, togglePlay, seek, skip };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <div style={{ position: 'absolute', top: -9999, left: -9999 }}>
        {currentTrack && (
          <YouTube
            key={currentTrack.id}
            videoId={currentTrack.id}
            opts={{ height: '0', width: '0', playerVars: { autoplay: 1 } }}
            onReady={onReady}
            onStateChange={onStateChange}
            onEnd={onEnd}
          />
        )}
      </div>
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};