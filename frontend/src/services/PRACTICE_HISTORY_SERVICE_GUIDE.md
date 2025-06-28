# Practice History Service Documentation

The `practiceHistoryService.ts` provides comprehensive Firebase integration for managing user practice sessions in your music practice app. This service handles all CRUD operations, statistics calculation, and advanced querying for practice history data.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Data Types](#data-types)
- [Core Functions](#core-functions)
- [Usage Examples](#usage-examples)
- [Database Structure](#database-structure)
- [Best Practices](#best-practices)
- [Error Handling](#error-handling)

## 🚀 Quick Start

### Import the Service

```typescript
import {
  addPracticeSession,
  getUserPracticeHistory,
  getUserPracticeStats,
  getSongPracticeHistory,
  PracticeSessionInput,
  PracticeSession
} from '../services/practiceHistoryService';
```

### Basic Usage

```typescript
// Add a practice session
const sessionData: PracticeSessionInput = {
  songTitle: "Wonderwall",
  artist: "Oasis",
  duration: 30,
  practiceType: "song",
  difficulty: 3,
  score: 85,
  progress: 70,
  notes: "Worked on chord transitions"
};

const newSession = await addPracticeSession(user.uid, sessionData);

// Get user's practice history
const { sessions, lastDoc } = await getUserPracticeHistory(user.uid);
```

## 📊 Data Types

### PracticeSession

The complete practice session object stored in Firebase:

```typescript
interface PracticeSession {
  id?: string;                    // Document ID (auto-generated)
  userId: string;                 // Firebase Auth user ID
  songTitle: string;              // Name of the song practiced
  artist: string;                 // Artist/composer name
  duration: number;               // Practice duration in minutes
  practiceType: 'song' | 'scales' | 'technique' | 'theory' | 'improvisation' | 'other';
  notes?: string;                 // Optional practice notes
  difficulty: 1 | 2 | 3 | 4 | 5;  // Difficulty rating (1=Easy, 5=Expert)
  score?: number;                 // Performance score (0-100)
  progress?: number;              // Completion percentage (0-100)
  tags?: string[];                // Practice tags (e.g., ['chords', 'fingerpicking'])
  mood?: 'excellent' | 'good' | 'average' | 'poor';
  thumbnail?: string;             // URL to song/album artwork
  completedAt: Timestamp;         // When the session was completed
  createdAt: Timestamp;           // When the record was created
}
```

### PracticeSessionInput

Input data for creating new practice sessions:

```typescript
interface PracticeSessionInput {
  songTitle: string;
  artist: string;
  duration: number;
  practiceType: 'song' | 'scales' | 'technique' | 'theory' | 'improvisation' | 'other';
  notes?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  score?: number;
  progress?: number;
  tags?: string[];
  mood?: 'excellent' | 'good' | 'average' | 'poor';
  thumbnail?: string;
}
```

### PracticeStats

Aggregated statistics for user's practice history:

```typescript
interface PracticeStats {
  totalSessions: number;          // Total number of practice sessions
  totalDuration: number;          // Total practice time in minutes
  averageScore: number;           // Average performance score
  averageDuration: number;        // Average session duration
  streakDays: number;             // Current consecutive practice days
  lastPracticeDate?: Date;        // Most recent practice date
  favoriteGenre?: string;         // Most practiced genre
  mostPracticedSong?: string;     // Most frequently practiced song
  weeklyStats: { day: string; minutes: number }[]; // Last 7 days breakdown
}
```

## 🔧 Core Functions

### 1. addPracticeSession

Add a new practice session to the user's history.

```typescript
addPracticeSession(userId: string, sessionData: PracticeSessionInput): Promise<PracticeSession>
```

**Parameters:**
- `userId`: Firebase Auth user ID
- `sessionData`: Practice session details

**Returns:** Promise resolving to the created session with ID

**Example:**
```typescript
const session = await addPracticeSession(user.uid, {
  songTitle: "Hotel California",
  artist: "Eagles",
  duration: 45,
  practiceType: "song",
  difficulty: 4,
  score: 92,
  notes: "Nailed the solo!"
});
```

### 2. getUserPracticeHistory

Fetch user's practice history with pagination support.

```typescript
getUserPracticeHistory(userId: string, options?: PaginationOptions): Promise<{
  sessions: PracticeSession[];
  lastDoc?: DocumentSnapshot;
}>
```

**Parameters:**
- `userId`: Firebase Auth user ID
- `options`: Pagination options (optional)
  - `limitCount`: Number of sessions to fetch (default: 20)
  - `lastDoc`: Last document for pagination

**Example:**
```typescript
// Get first 10 sessions
const { sessions, lastDoc } = await getUserPracticeHistory(user.uid, { limitCount: 10 });

// Get next 10 sessions
const { sessions: moreSessions } = await getUserPracticeHistory(user.uid, { 
  limitCount: 10, 
  lastDoc 
});
```

### 3. getUserPracticeStats

Calculate comprehensive statistics for a user's practice history.

```typescript
getUserPracticeStats(userId: string): Promise<PracticeStats>
```

**Example:**
```typescript
const stats = await getUserPracticeStats(user.uid);
console.log(`Total practice time: ${stats.totalDuration} minutes`);
console.log(`Current streak: ${stats.streakDays} days`);
```

### 4. getSongPracticeHistory

Get all practice sessions for a specific song.

```typescript
getSongPracticeHistory(userId: string, songTitle: string): Promise<PracticeSession[]>
```

**Example:**
```typescript
const songSessions = await getSongPracticeHistory(user.uid, "Wonderwall");
// Analyze progress over time for this specific song
```

### 5. updatePracticeSession

Update an existing practice session.

```typescript
updatePracticeSession(sessionId: string, updates: Partial<PracticeSessionInput>): Promise<void>
```

**Example:**
```typescript
await updatePracticeSession(sessionId, {
  score: 95,
  notes: "Much better today!"
});
```

### 6. deletePracticeSession

Remove a practice session from history.

```typescript
deletePracticeSession(sessionId: string): Promise<void>
```

### 7. getPracticeSessionsByDateRange

Get practice sessions within a specific date range.

```typescript
getPracticeSessionsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<PracticeSession[]>
```

**Example:**
```typescript
const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);
const sessions = await getPracticeSessionsByDateRange(user.uid, lastWeek, new Date());
```

## 💡 Usage Examples

### React Component Integration

```typescript
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import {
  getUserPracticeHistory,
  getUserPracticeStats,
  addPracticeSession,
  PracticeSession,
  PracticeStats
} from '../services/practiceHistoryService';

const PracticeHistoryComponent: React.FC = () => {
  const [user] = useAuthState(auth);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [stats, setStats] = useState<PracticeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPracticeData();
    }
  }, [user]);

  const loadPracticeData = async () => {
    try {
      setLoading(true);
      const [historyResult, statsResult] = await Promise.all([
        getUserPracticeHistory(user!.uid, { limitCount: 10 }),
        getUserPracticeStats(user!.uid)
      ]);
      
      setSessions(historyResult.sessions);
      setStats(statsResult);
    } catch (error) {
      console.error('Failed to load practice data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSession = async (sessionData: PracticeSessionInput) => {
    try {
      const newSession = await addPracticeSession(user!.uid, sessionData);
      setSessions(prev => [newSession, ...prev]);
      // Refresh stats
      const updatedStats = await getUserPracticeStats(user!.uid);
      setStats(updatedStats);
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Display stats */}
      {stats && (
        <div className="stats-overview">
          <h2>Practice Statistics</h2>
          <p>Total Sessions: {stats.totalSessions}</p>
          <p>Total Time: {Math.floor(stats.totalDuration / 60)}h {stats.totalDuration % 60}m</p>
          <p>Current Streak: {stats.streakDays} days</p>
          <p>Average Score: {stats.averageScore}%</p>
        </div>
      )}

      {/* Display recent sessions */}
      <div className="recent-sessions">
        <h2>Recent Practice Sessions</h2>
        {sessions.map(session => (
          <div key={session.id} className="session-card">
            <h3>{session.songTitle} - {session.artist}</h3>
            <p>Duration: {session.duration} minutes</p>
            <p>Score: {session.score}%</p>
            <p>Date: {session.completedAt.toDate().toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Custom Hook for Practice History

```typescript
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import {
  getUserPracticeHistory,
  getUserPracticeStats,
  PracticeSession,
  PracticeStats
} from '../services/practiceHistoryService';

export const usePracticeHistory = () => {
  const [user] = useAuthState(auth);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [stats, setStats] = useState<PracticeStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async (limitCount: number = 20) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const { sessions } = await getUserPracticeHistory(user.uid, { limitCount });
      setSessions(sessions);
    } catch (err) {
      setError('Failed to load practice history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    if (!user) return;

    try {
      const stats = await getUserPracticeStats(user.uid);
      setStats(stats);
    } catch (err) {
      setError('Failed to load practice statistics');
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      loadHistory();
      loadStats();
    }
  }, [user]);

  return {
    sessions,
    stats,
    loading,
    error,
    refetch: () => {
      loadHistory();
      loadStats();
    }
  };
};
```

## 🗄️ Database Structure

### Firestore Collection: `practiceHistory`

```
practiceHistory/
├── {sessionId1}/
│   ├── userId: "abc123"
│   ├── songTitle: "Wonderwall"
│   ├── artist: "Oasis"
│   ├── duration: 30
│   ├── practiceType: "song"
│   ├── difficulty: 3
│   ├── score: 85
│   ├── progress: 70
│   ├── notes: "Worked on chord transitions"
│   ├── tags: ["chords", "strumming"]
│   ├── mood: "good"
│   ├── completedAt: Timestamp
│   └── createdAt: Timestamp
└── {sessionId2}/
    └── ...
```

### Required Firestore Indexes

For optimal performance, create these composite indexes in Firebase Console:

1. **Collection ID:** `practiceHistory`
   - **Fields:** `userId` (Ascending), `completedAt` (Descending)

2. **Collection ID:** `practiceHistory`
   - **Fields:** `userId` (Ascending), `songTitle` (Ascending), `completedAt` (Descending)

3. **Collection ID:** `practiceHistory`
   - **Fields:** `userId` (Ascending), `completedAt` (Ascending), `completedAt` (Descending)

## 🎯 Best Practices

### 1. Error Handling

Always wrap service calls in try-catch blocks:

```typescript
try {
  const session = await addPracticeSession(userId, sessionData);
  // Handle success
} catch (error) {
  // Handle error gracefully
  console.error('Practice session failed to save:', error);
  // Show user-friendly error message
}
```

### 2. Data Validation

Validate input data before sending to Firebase:

```typescript
const validateSessionData = (data: PracticeSessionInput): boolean => {
  return (
    data.songTitle.trim().length > 0 &&
    data.artist.trim().length > 0 &&
    data.duration > 0 &&
    data.difficulty >= 1 && data.difficulty <= 5
  );
};
```

### 3. Pagination

Use pagination for large datasets:

```typescript
const [sessions, setSessions] = useState<PracticeSession[]>([]);
const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
const [hasMore, setHasMore] = useState(true);

const loadMoreSessions = async () => {
  const { sessions: newSessions, lastDoc: newLastDoc } = 
    await getUserPracticeHistory(user.uid, { limitCount: 10, lastDoc });
  
  setSessions(prev => [...prev, ...newSessions]);
  setLastDoc(newLastDoc || null);
  setHasMore(newSessions.length === 10);
};
```

### 4. Caching

Consider implementing client-side caching for frequently accessed data:

```typescript
// Simple memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedStats = async (userId: string) => {
  const cacheKey = `stats_${userId}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const stats = await getUserPracticeStats(userId);
  cache.set(cacheKey, { data: stats, timestamp: Date.now() });
  return stats;
};
```

## ⚠️ Error Handling

The service provides detailed error messages for common failure scenarios:

### Common Errors

1. **Network Issues**
   ```typescript
   // Error: Failed to save practice session
   // Cause: No internet connection
   ```

2. **Authentication Issues**
   ```typescript
   // Error: Failed to load practice history
   // Cause: User not authenticated
   ```

3. **Permission Issues**
   ```typescript
   // Error: Permission denied
   // Cause: Firestore security rules
   ```

### Error Response Strategy

```typescript
const handleServiceError = (error: Error, operation: string) => {
  console.error(`${operation} failed:`, error);
  
  // Show user-friendly message based on error type
  if (error.message.includes('Permission denied')) {
    showToast('You do not have permission to perform this action');
  } else if (error.message.includes('Network')) {
    showToast('Please check your internet connection');
  } else {
    showToast('Something went wrong. Please try again.');
  }
};
```

## 🔧 Configuration

### Firebase Security Rules

Add these rules to your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Practice history rules
    match /practiceHistory/{sessionId} {
      allow read, write: if resource.data.userId == request.auth.uid;
      allow create: if resource.data.userId == request.auth.uid;
    }
  }
}
```

### Environment Setup

Ensure your Firebase configuration is properly set up in `src/config/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase config
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

## 📈 Performance Tips

1. **Use indexes** for complex queries
2. **Implement pagination** for large datasets  
3. **Cache frequently accessed data**
4. **Batch operations** when possible
5. **Use real-time listeners** sparingly
6. **Optimize query structure** to minimize reads

This service provides a robust foundation for managing practice history in your music app. The TypeScript types ensure type safety, while the comprehensive API covers all common use cases for practice tracking and analytics.
