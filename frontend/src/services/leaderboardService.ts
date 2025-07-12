import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  serverTimestamp,
  Timestamp,
  limit,
  where,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  startAfter,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';

// TypeScript interfaces for song scores
export interface SongScore {
  id?: string;
  userId: string;
  username: string;
  displayName: string;
  avatar?: string;
  songTitle: string;
  artist: string;
  score: number; // 0-100
  practiceDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserSongBest {
  id?: string;
  userId: string;
  songTitle: string;
  artist: string;
  bestScore: number;
  totalAttempts: number;
  firstAttemptDate: Timestamp;
  lastAttemptDate: Timestamp;
  updatedAt: Timestamp;
}

export interface SongLeaderboard {
  songTitle: string;
  artist: string;
  topScores: SongScore[];
}

export interface PaginationOptions {
  limitCount?: number;
  lastDoc?: DocumentSnapshot;
}

/**
 * Add or update a user's score for a specific song
 */
export const addSongScore = async (
  userId: string,
  username: string,
  displayName: string,
  songTitle: string,
  artist: string,
  score: number,
  avatar?: string
): Promise<SongScore> => {
  try {
    // Create the song score entry
    const songScore: Omit<SongScore, 'id'> = {
      userId,
      username,
      displayName,
      avatar,
      songTitle,
      artist,
      score,
      practiceDate: serverTimestamp() as Timestamp,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp
    };

    // Add to songScores collection (stores all attempts)
    const scoresCollection = collection(db, 'songScores');
    const scoreDoc = doc(scoresCollection);
    await setDoc(scoreDoc, songScore);

    // Update or create user's best score for this song
    await updateUserSongBest(userId, songTitle, artist, score);

    return {
      id: scoreDoc.id,
      ...songScore,
      practiceDate: Timestamp.now(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
  } catch (error) {
    console.error('Error adding song score:', error);
    throw new Error('Failed to save song score');
  }
};

/**
 * Get leaderboard for a specific song
 */
export const getSongLeaderboard = async (
  songTitle: string,
  artist: string,
  options: PaginationOptions = {}
): Promise<{ scores: SongScore[]; lastDoc?: DocumentSnapshot }> => {
  try {
    const { limitCount = 50 } = options;

    // Get best scores for this song from userSongBests collection
    let q = query(
      collection(db, 'userSongBests'),
      where('songTitle', '==', songTitle),
      where('artist', '==', artist),
      orderBy('bestScore', 'desc'),
      limit(limitCount)
    );

    if (options.lastDoc) {
      q = query(
        collection(db, 'userSongBests'),
        where('songTitle', '==', songTitle),
        where('artist', '==', artist),
        orderBy('bestScore', 'desc'),
        startAfter(options.lastDoc),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    
    // Convert UserSongBest to SongScore format for display
    const scores: SongScore[] = [];
    
    for (const docSnapshot of querySnapshot.docs) {
      const bestData = docSnapshot.data() as UserSongBest;
      
      // Get user details from the most recent score entry
      const userScoreQuery = query(
        collection(db, 'songScores'),
        where('userId', '==', bestData.userId),
        where('songTitle', '==', songTitle),
        where('artist', '==', artist),
        orderBy('practiceDate', 'desc'),
        limit(1)
      );
      
      const userScoreSnapshot = await getDocs(userScoreQuery);
      if (!userScoreSnapshot.empty) {
        const userScoreData = userScoreSnapshot.docs[0].data() as SongScore;
        
        scores.push({
          id: docSnapshot.id,
          userId: bestData.userId,
          username: userScoreData.username,
          displayName: userScoreData.displayName,
          avatar: userScoreData.avatar,
          songTitle: bestData.songTitle,
          artist: bestData.artist,
          score: bestData.bestScore,
          practiceDate: bestData.lastAttemptDate,
          createdAt: bestData.firstAttemptDate,
          updatedAt: bestData.updatedAt
        });
      }
    }

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { scores, lastDoc: lastVisible };
  } catch (error) {
    console.error('Error fetching song leaderboard:', error);
    throw new Error('Failed to load song leaderboard');
  }
};

/**
 * Get user's best scores for all songs they've practiced
 */
export const getUserBestScores = async (
  userId: string,
  options: PaginationOptions = {}
): Promise<{ scores: UserSongBest[]; lastDoc?: DocumentSnapshot }> => {
  try {
    const { limitCount = 50 } = options;

    let q = query(
      collection(db, 'userSongBests'),
      where('userId', '==', userId),
      orderBy('bestScore', 'desc'),
      limit(limitCount)
    );

    if (options.lastDoc) {
      q = query(
        collection(db, 'userSongBests'),
        where('userId', '==', userId),
        orderBy('bestScore', 'desc'),
        startAfter(options.lastDoc),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    const scores = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserSongBest[];

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { scores, lastDoc: lastVisible };
  } catch (error) {
    console.error('Error fetching user best scores:', error);
    throw new Error('Failed to load user best scores');
  }
};

/**
 * Get user's score history for a specific song
 */
export const getUserSongHistory = async (
  userId: string,
  songTitle: string,
  artist: string,
  options: PaginationOptions = {}
): Promise<{ scores: SongScore[]; lastDoc?: DocumentSnapshot }> => {
  try {
    const { limitCount = 20 } = options;

    let q = query(
      collection(db, 'songScores'),
      where('userId', '==', userId),
      where('songTitle', '==', songTitle),
      where('artist', '==', artist),
      orderBy('practiceDate', 'desc'),
      limit(limitCount)
    );

    if (options.lastDoc) {
      q = query(
        collection(db, 'songScores'),
        where('userId', '==', userId),
        where('songTitle', '==', songTitle),
        where('artist', '==', artist),
        orderBy('practiceDate', 'desc'),
        startAfter(options.lastDoc),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    const scores = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SongScore[];

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { scores, lastDoc: lastVisible };
  } catch (error) {
    console.error('Error fetching user song history:', error);
    throw new Error('Failed to load user song history');
  }
};

/**
 * Get user's rank for a specific song
 */
export const getUserSongRank = async (
  userId: string,
  songTitle: string,
  artist: string
): Promise<{ rank: number; totalPlayers: number; userBest?: UserSongBest }> => {
  try {
    // Get user's best score for this song
    const userBestQuery = query(
      collection(db, 'userSongBests'),
      where('userId', '==', userId),
      where('songTitle', '==', songTitle),
      where('artist', '==', artist),
      limit(1)
    );

    const userBestSnapshot = await getDocs(userBestQuery);
    if (userBestSnapshot.empty) {
      return { rank: 0, totalPlayers: 0 };
    }

    const userBest = userBestSnapshot.docs[0].data() as UserSongBest;

    // Count users with better scores
    const betterScoresQuery = query(
      collection(db, 'userSongBests'),
      where('songTitle', '==', songTitle),
      where('artist', '==', artist),
      where('bestScore', '>', userBest.bestScore)
    );

    const betterScoresSnapshot = await getDocs(betterScoresQuery);
    const rank = betterScoresSnapshot.size + 1;

    // Count total players for this song
    const totalPlayersQuery = query(
      collection(db, 'userSongBests'),
      where('songTitle', '==', songTitle),
      where('artist', '==', artist)
    );

    const totalPlayersSnapshot = await getDocs(totalPlayersQuery);
    const totalPlayers = totalPlayersSnapshot.size;

    return {
      rank,
      totalPlayers,
      userBest: {
        id: userBestSnapshot.docs[0].id,
        ...userBest
      }
    };
  } catch (error) {
    console.error('Error getting user song rank:', error);
    throw new Error('Failed to get user song rank');
  }
};

/**
 * Get top songs by number of players
 */
export const getPopularSongs = async (
  limitCount: number = 20
): Promise<{ songTitle: string; artist: string; playerCount: number }[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'userSongBests'));
    
    // Group by song and count players
    const songPlayerCounts: Record<string, { songTitle: string; artist: string; count: number }> = {};
    
    querySnapshot.docs.forEach(doc => {
      const data = doc.data() as UserSongBest;
      const songKey = `${data.songTitle}|${data.artist}`;
      
      if (songPlayerCounts[songKey]) {
        songPlayerCounts[songKey].count++;
      } else {
        songPlayerCounts[songKey] = {
          songTitle: data.songTitle,
          artist: data.artist,
          count: 1
        };
      }
    });

    // Sort by player count and return top songs
    return Object.values(songPlayerCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, limitCount)
      .map(song => ({
        songTitle: song.songTitle,
        artist: song.artist,
        playerCount: song.count
      }));
  } catch (error) {
    console.error('Error fetching popular songs:', error);
    throw new Error('Failed to load popular songs');
  }
};

// Helper function to update user's best score for a song
const updateUserSongBest = async (
  userId: string,
  songTitle: string,
  artist: string,
  newScore: number
): Promise<void> => {
  try {
    const songKey = `${userId}_${songTitle}_${artist}`.replace(/[^a-zA-Z0-9_]/g, '_');
    const bestScoreRef = doc(db, 'userSongBests', songKey);
    const existingDoc = await getDoc(bestScoreRef);

    if (existingDoc.exists()) {
      const existingData = existingDoc.data() as UserSongBest;
      
      // Update if new score is better, or update attempt count and last attempt date
      if (newScore > existingData.bestScore) {
        await updateDoc(bestScoreRef, {
          bestScore: newScore,
          totalAttempts: existingData.totalAttempts + 1,
          lastAttemptDate: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } else {
        await updateDoc(bestScoreRef, {
          totalAttempts: existingData.totalAttempts + 1,
          lastAttemptDate: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    } else {
      // Create new best score record
      const newBest: Omit<UserSongBest, 'id'> = {
        userId,
        songTitle,
        artist,
        bestScore: newScore,
        totalAttempts: 1,
        firstAttemptDate: serverTimestamp() as Timestamp,
        lastAttemptDate: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp
      };

      await setDoc(bestScoreRef, newBest);
    }
  } catch (error) {
    console.error('Error updating user song best:', error);
    throw new Error('Failed to update user song best');
  }
};
