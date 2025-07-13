/**
 * @file practiceService.ts
 * @description Unified service for handling all music practice-related logic.
 * This service manages song data, user progress, practice history, and leaderboards.
 */

import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  Timestamp,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  DocumentSnapshot,
  startAfter,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// --- DATA INTERFACES ---

/**
 * Represents a user's identity, passed from the frontend.
 */
export interface UserInfo {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}

/**
 * Represents the data for a single practice session, provided by the frontend.
 */
export interface PracticeSessionInput {
  songTitle: string;
  artist: string;
  duration: number; // in minutes
  score: number; // 0-100
  difficulty: 1 | 2 | 3 | 4 | 5;
  practiceType: 'song' | 'technique' | 'theory';
  notes?: string;
}

/**
 * Represents the canonical document for a song in the `songs` collection.
 */
export interface Song {
  id: string; // e.g., "wonderwall_oasis"
  songTitle: string;
  artist: string;
  playerCount: number;
  totalPracticeTime: number; // in minutes
  createdAt: Timestamp;
  // Optional metadata
  albumArtUrl?: string;
}

/**
 * Represents a user's specific progress and stats for a single song.
 * Stored in `/users/{userId}/userSongData/{songId}`
 */
export interface UserSongData {
  userId: string;
  songId: string;
  songTitle: string;
  artist: string;
  bestScore: number;
  totalPracticeTime: number; // in minutes
  level: number;
  xp: number;
  lastPracticedAt: Timestamp;
  // For leaderboards
  userDisplayName: string | null;
  userPhotoURL: string | null;
}

/**
 * Represents a single, detailed entry in a user's practice history log.
 * Stored in `/practiceHistory`
 */
export interface PracticeHistoryEntry {
  id: string;
  userId: string;
  songId: string;
  songTitle: string;
  artist: string;
  duration: number;
  score: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  practiceType: 'song' | 'technique' | 'theory';
  notes?: string;
  completedAt: Timestamp;
}

/**
 * Represents an entry in the leaderboard for a song.
 * Stored in `/songLeaderboards/{songId}/entries/{userId}`
 */
export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userAvatar: string | null;
  score: number;
  rank: number;
}

// --- HELPER FUNCTIONS ---

/**
 * Calculates XP earned from a practice session.
 * @param score The score achieved in the session.
 * @returns The amount of XP earned.
 */
const calculateXp = (score: number): number => {
  if (score < 50) return 10;
  if (score < 75) return 25;
  if (score < 90) return 50;
  return 100;
};

/**
 * Determines if a user has leveled up.
 * @param currentLevel The user's current level.
 * @param newXp The user's new total XP.
 * @returns The new level.
 */
const getNewLevel = (currentLevel: number, newXp: number): number => {
  const xpForNextLevel = currentLevel * 100; // Simple linear progression
  if (newXp >= xpForNextLevel) {
    return currentLevel + 1;
  }
  return currentLevel;
};

// --- CORE SERVICE FUNCTIONS ---

/**
 * Logs a completed practice session. This is the primary entry point for all practice activity.
 * It uses a transaction to update all relevant documents atomically.
 * 1. Creates/updates the master song document.
 * 2. Creates/updates the user's progress for that song.
 * 3. Creates a detailed practice history log entry.
 */
export const logPracticeSession = async (
  userInfo: UserInfo,
  sessionData: PracticeSessionInput
): Promise<void> => {
  const songId = `${sessionData.songTitle}_${sessionData.artist}`.toLowerCase().replace(/\s+/g, '_');
  
  const songDocRef = doc(db, 'songs', songId);
  const userSongDataDocRef = doc(db, 'users', userInfo.uid, 'userSongData', songId);
  const practiceHistoryRef = doc(collection(db, 'practiceHistory')); // New doc with auto-ID
  
  // New reference for the public leaderboard entry
  const leaderboardEntryRef = doc(db, 'songLeaderboards', songId, 'entries', userInfo.uid);

  try {
    await runTransaction(db, async (transaction) => {
      // 1. Get current state of documents
      const songDoc = await transaction.get(songDocRef);
      const userSongDataDoc = await transaction.get(userSongDataDocRef);

      // 2. Process master song document (no changes here)
      if (!songDoc.exists()) {
        const newSong: Omit<Song, 'id'> = {
          songTitle: sessionData.songTitle,
          artist: sessionData.artist,
          playerCount: 1,
          totalPracticeTime: sessionData.duration,
          createdAt: serverTimestamp() as Timestamp,
        };
        transaction.set(songDocRef, newSong);
      } else {
        transaction.update(songDocRef, {
          playerCount: (songDoc.data().playerCount || 0) + 1,
          totalPracticeTime: (songDoc.data().totalPracticeTime || 0) + sessionData.duration,
        });
      }

      // 3. Process user's song-specific data and public leaderboard entry
      const xpGained = calculateXp(sessionData.score);
      let isNewHighScore = false;

      if (!userSongDataDoc.exists()) {
        isNewHighScore = true;
        const newUserSongData: UserSongData = {
          userId: userInfo.uid,
          songId: songId,
          songTitle: sessionData.songTitle,
          artist: sessionData.artist,
          bestScore: sessionData.score,
          totalPracticeTime: sessionData.duration,
          level: 1,
          xp: xpGained,
          lastPracticedAt: serverTimestamp() as Timestamp,
          userDisplayName: userInfo.displayName,
          userPhotoURL: userInfo.photoURL,
        };
        transaction.set(userSongDataDocRef, newUserSongData);
      } else {
        const currentData = userSongDataDoc.data() as UserSongData;
        const newBestScore = Math.max(currentData.bestScore, sessionData.score);
        
        if (newBestScore > currentData.bestScore) {
          isNewHighScore = true;
        }

        const newTotalPracticeTime = currentData.totalPracticeTime + sessionData.duration;
        const newXp = currentData.xp + xpGained;
        const newLevel = getNewLevel(currentData.level, newXp);

        transaction.update(userSongDataDocRef, {
          bestScore: newBestScore,
          totalPracticeTime: newTotalPracticeTime,
          xp: newXp,
          level: newLevel,
          lastPracticedAt: serverTimestamp(),
          // Also update user info in case it changed
          userDisplayName: userInfo.displayName,
          userPhotoURL: userInfo.photoURL,
        });
      }

      // 4. If there's a new high score, update the public leaderboard collection
      if (isNewHighScore) {
        transaction.set(leaderboardEntryRef, {
          userId: userInfo.uid,
          userName: userInfo.displayName,
          userAvatar: userInfo.photoURL,
          score: sessionData.score,
          updatedAt: serverTimestamp(),
        });
      }

      // 5. Create the detailed practice history log entry
      const newHistoryEntry: Omit<PracticeHistoryEntry, 'id'> = {
        userId: userInfo.uid,
        songId: songId,
        songTitle: sessionData.songTitle,
        artist: sessionData.artist,
        duration: sessionData.duration,
        score: sessionData.score,
        difficulty: sessionData.difficulty,
        practiceType: sessionData.practiceType,
        notes: sessionData.notes, // This can be undefined, which is correct
        completedAt: serverTimestamp() as Timestamp,
      };
      transaction.set(practiceHistoryRef, newHistoryEntry);
    });
    console.log('Practice session logged successfully!');
  } catch (error) {
    console.error('Transaction failed: ', error);
    throw new Error('Failed to log practice session.');
  }
};

// --- DATA GETTER FUNCTIONS ---

/**
 * Fetches the leaderboard for a specific song.
 */
export const getSongLeaderboard = async (songId: string, options: { limitCount?: number, lastDoc?: DocumentSnapshot } = {}) => {
  const { limitCount = 15, lastDoc } = options;
  
  // Query the new, dedicated leaderboard collection. This is much more efficient and avoids permissions issues.
  const leaderboardCollectionRef = collection(db, 'songLeaderboards', songId, 'entries');
  
  let q = query(
    leaderboardCollectionRef,
    orderBy('bestScore', 'desc'),
    limit(limitCount)
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const querySnapshot = await getDocs(q);
  // The data structure in the leaderboard collection is already what we need.
  const leaderboard = querySnapshot.docs.map(doc => doc.data());
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { leaderboard, lastDoc: lastVisible };
};

/**
 * Fetches a user's detailed practice history for all songs.
 */
export const getUserPracticeHistory = async (userId: string, options: { limitCount?: number, lastDoc?: DocumentSnapshot } = {}) => {
  const { limitCount = 20, lastDoc } = options;

  let q = query(
    collection(db, 'practiceHistory'),
    where('userId', '==', userId),
    orderBy('completedAt', 'desc'),
    limit(limitCount)
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const querySnapshot = await getDocs(q);
  const history = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PracticeHistoryEntry));
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { history, lastDoc: lastVisible };
};

/**
 * Fetches a user's progress data for all the songs they have played.
 */
export const getAllUserSongData = async (userId: string) => {
  const q = query(
    collection(db, 'users', userId, 'userSongData'),
    orderBy('lastPracticedAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as UserSongData);
};
