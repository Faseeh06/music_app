# Song Scoring Service Documentation

The `leaderboardService.ts` provides Firebase integration for managing song scores and leaderboards in your music practice app. This simplified service focuses on tracking user scores for individual songs without complex gamification elements.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Data Types](#data-types)
- [Core Functions](#core-functions)
- [Usage Examples](#usage-examples)
- [Database Structure](#database-structure)
- [Security & Privacy](#security--privacy)
- [Best Practices](#best-practices)

## 🚀 Quick Start

### Import the Service

```typescript
import {
  addSongScore,
  getSongLeaderboard,
  getUserBestScores,
  getUserSongHistory,
  getUserSongRank,
  getPopularSongs,
  SongScore,
  UserSongBest
} from '../services/leaderboardService';
```

### Basic Usage

```typescript
// Add a score after practice session
await addSongScore(
  user.uid,
  "musiclover123",
  "Music Lover",
  "Wonderwall",
  "Oasis",
  85,
  "https://example.com/avatar.jpg"
);

// Get leaderboard for a song
const { scores } = await getSongLeaderboard("Wonderwall", "Oasis");

// Get user's best scores
const { scores: bestScores } = await getUserBestScores(user.uid);
```

## 📊 Data Types

### SongScore

Individual score entries for each practice attempt:

```typescript
interface SongScore {
  id?: string;                    // Document ID
  userId: string;                 // Firebase Auth user ID
  username: string;               // User's username
  displayName: string;            // Display name
  avatar?: string;                // Profile picture URL
  songTitle: string;              // Name of the song
  artist: string;                 // Artist/composer name
  score: number;                  // Score (0-100)
  practiceDate: Timestamp;        // When this score was achieved
  createdAt: Timestamp;           // When record was created
  updatedAt: Timestamp;           // Last update time
}
```

### UserSongBest

User's best score for each song:

```typescript
interface UserSongBest {
  id?: string;                    // Document ID
  userId: string;                 // Firebase Auth user ID
  songTitle: string;              // Song name
  artist: string;                 // Artist name
  bestScore: number;              // User's best score (0-100)
  totalAttempts: number;          // Number of practice attempts
  firstAttemptDate: Timestamp;    // When user first practiced this song
  lastAttemptDate: Timestamp;     // Most recent practice
  updatedAt: Timestamp;           // Last update time
}
```

This simplified scoring service provides a clean, focused approach to tracking user performance on individual songs while maintaining competitive leaderboards and progress tracking.
