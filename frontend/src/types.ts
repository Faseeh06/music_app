export interface Song {
    id: string;
    title: string;
    artist: string;
    youtubeId: string;
    currentPractitioners: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    chords: Chord[];
    sections: {
      name: string;
      startTime: number;
      endTime: number;
    }[];
  }
  
  export interface Chord {
      name: string;
  }

  export interface ChordPosition {
    chord: string;
    frets: number[];
    fingers: number[];
  }
  
  export interface LeaderboardEntry {
    userId: string;
    userName: string;
    userAvatar: string | null;
    score: number;
    rank: number;
  }

  export interface PracticeHistoryEntry {
    id: string;
    userId: string;
    songId: string;
    songTitle: string;
    artist: string;
    duration: number;
    score: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    practiceType: 'song' | 'technique' | 'theory';
    notes?: string;
    completedAt: Date;
  }
