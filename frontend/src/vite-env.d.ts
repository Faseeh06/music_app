/// <reference types="vite/client" />

// YouTube Player API types
declare global {
  namespace YT {
    enum PlayerState {
      UNSTARTED = -1,
      ENDED = 0,
      PLAYING = 1,
      PAUSED = 2,
      BUFFERING = 3,
      CUED = 5
    }

    interface Player {
      playVideo(): void;
      pauseVideo(): void;
      seekTo(seconds: number, allowSeekAhead: boolean): void;
      getCurrentTime(): number;
      getDuration(): number;
      getPlayerState(): PlayerState;
    }

    interface PlayerEvent {
      target: Player;
      data: PlayerState;
    }
  }
}
