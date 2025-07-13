# Practice & Session Services Documentation

This document outlines the architecture and usage of the new services for handling user practice sessions, progress, and leaderboards.

## Architecture Overview

The system is designed to be robust, scalable, and secure, decoupling client-side logic from the core backend operations. It consists of three main parts:

1.  **`practiceService.ts` (Core Backend Service)**: This is the single source of truth for all practice-related data mutations. It communicates directly with Firestore and contains the critical business logic.
2.  **`practiceSessionService.ts` (Client-Facing Service Wrapper)**: This service acts as a clean, asynchronous bridge between the UI components and the `practiceService`. It simplifies the interface for the frontend.
3.  **`usePracticeSessions.ts` (React Hook)**: This custom hook is the primary way UI components should interact with the practice session system. It abstracts away all data fetching, state management (loading, errors), and provides conveniently formatted data and action functions to the components.

### Data Flow

`Component` -> `usePracticeSessions` (Hook) -> `practiceSessionService` (Wrapper) -> `practiceService` (Core) -> `Firestore`

## Firestore Data Model

The database is structured to support efficient queries and maintain data integrity.

-   `songs/{songId}`
    -   **Purpose**: Stores canonical, public information about each song (title, artist, etc.).
-   `users/{userId}/userSongData/{songId}`
    -   **Purpose**: Stores a user's private, detailed progress for a specific song.
    -   **Fields**: `xp`, `level`, `bestScore`, `lastPracticed`.
-   `practiceHistory/{sessionId}`
    -   **Purpose**: An immutable log of every single practice session a user completes.
    -   **Fields**: `userId`, `songId`, `completedAt`, `durationSeconds`, `score`.
-   `songLeaderboards/{songId}/entries/{userId}`
    -   **Purpose**: A denormalized, public-readable collection for efficient and secure leaderboard queries. This collection is updated atomically whenever a user's score changes.
    -   **Fields**: `userName`, `userAvatar`, `score`.

## How to Use

### Logging a Practice Session

The primary action is logging a completed practice session. The `PracticePage.tsx` component now handles this automatically when the user navigates away after practicing.

**Example from `PracticePage.tsx`:**

The component tracks the `practiceTime` while the user is on the page. An effect with a cleanup function ensures that when the component unmounts, the session is logged if the practice time is greater than zero.

```typescript
// In PracticePage.tsx

const { addSession } = usePracticeSessions();
const practiceTimeRef = useRef(practiceTime);
practiceTimeRef.current = practiceTime;

useEffect(() => {
    return () => {
      const finalPracticeTime = practiceTimeRef.current;
      if (finalPracticeTime > 0 && songId) {
        // A score is generated (e.g., from an AI model or other logic)
        const score = Math.floor(Math.random() * 30) + 70; // Example score
        
        // The addSession function from the hook is called
        addSession(songId, score, finalPracticeTime)
          .catch(err => console.error("Failed to log practice session:", err));
      }
    };
  }, [songId, addSession]);
```

### Displaying Practice Data in Components

The `usePracticeSessions` hook is the only thing a component needs to display session history, stats, and more.

**Example from `Dashboard.tsx`:**

```typescript
// In Dashboard.tsx

import { usePracticeSessions } from '../hooks/usePracticeSessions';

const { 
    recentSessions, 
    stats,
    formatRelativeTime, 
    loading, 
    error 
} = usePracticeSessions();

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;

return (
    <div>
        {/* Display daily practice time */}
        <p>Time practiced today: {Math.floor(stats.todayPracticeTime / 60)} minutes</p>

        {/* Display recent sessions */}
        <ul>
            {recentSessions.map(session => (
                <li key={session.id}>
                    {session.songTitle} - {formatRelativeTime(session.completedAt.toDate())}
                </li>
            ))}
        </ul>
    </div>
);
```

### Core Logic: `practiceService.logPracticeSession`

This is the heart of the system. It's a single, atomic transaction that ensures all database updates happen together or not at all. This prevents data inconsistency.

**What it does in one transaction:**

1.  **Creates a new document** in `practiceHistory`.
2.  **Reads the user's `userSongData`** for the specific song.
3.  **Updates the user's `userSongData`**, incrementing XP and updating the level and best score if necessary.
4.  **Updates the public `songLeaderboards`** entry for the user if their new score is a personal best.

This transactional approach guarantees that the leaderboard, user's private stats, and practice history are always perfectly in sync.
