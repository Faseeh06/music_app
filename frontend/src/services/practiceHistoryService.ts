import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  serverTimestamp,
  Timestamp,
  limit,
  startAfter,
  DocumentSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// TypeScript interfaces for practice history
export interface PracticeSession {
  id?: string;
  userId: string;
  songTitle: string;
  artist: string;
  duration: number; // in minutes
  practiceType: 'song' | 'scales' | 'technique' | 'theory' | 'improvisation' | 'other';
  notes?: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  score?: number; // 0-100 percentage
  progress?: number; // 0-100 percentage completion
  tags?: string[]; // e.g., ['chords', 'fingerpicking', 'barre']
  mood?: 'excellent' | 'good' | 'average' | 'poor';
  thumbnail?: string; // URL to song/album artwork
  completedAt: Timestamp;
  createdAt: Timestamp;
}

export interface PracticeSessionInput {
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

export interface PracticeStats {
  totalSessions: number;
  totalDuration: number; // in minutes
  averageScore: number;
  averageDuration: number;
  streakDays: number;
  lastPracticeDate?: Date;
  favoriteGenre?: string;
  mostPracticedSong?: string;
  weeklyStats: { day: string; minutes: number }[];
}

export interface PaginationOptions {
  limitCount?: number;
  lastDoc?: DocumentSnapshot;
}

/**
 * Add a new practice session to the user's history
 */
export const addPracticeSession = async (
  userId: string, 
  sessionData: PracticeSessionInput
): Promise<PracticeSession> => {
  try {
    const practiceSession = {
      userId,
      ...sessionData,
      completedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'practiceHistory'), practiceSession);
    
    return { 
      id: docRef.id, 
      ...practiceSession,
      completedAt: Timestamp.now(),
      createdAt: Timestamp.now()
    };
  } catch (error) {
    console.error('Error adding practice session:', error);
    throw new Error('Failed to save practice session');
  }
};

/**
 * Fetch user's practice history with pagination support
 */
export const getUserPracticeHistory = async (
  userId: string, 
  options: PaginationOptions = {}
): Promise<{ sessions: PracticeSession[]; lastDoc?: DocumentSnapshot }> => {
  try {
    const { limitCount = 20, lastDoc } = options;
    
    let q = query(
      collection(db, 'practiceHistory'),
      where('userId', '==', userId),
      orderBy('completedAt', 'desc'),
      limit(limitCount)
    );

    if (lastDoc) {
      q = query(
        collection(db, 'practiceHistory'),
        where('userId', '==', userId),
        orderBy('completedAt', 'desc'),
        startAfter(lastDoc),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    const sessions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PracticeSession[];

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { sessions, lastDoc: lastVisible };
  } catch (error) {
    console.error('Error fetching practice history:', error);
    throw new Error('Failed to load practice history');
  }
};

/**
 * Get practice history for a specific song
 */
export const getSongPracticeHistory = async (
  userId: string, 
  songTitle: string
): Promise<PracticeSession[]> => {
  try {
    const q = query(
      collection(db, 'practiceHistory'),
      where('userId', '==', userId),
      where('songTitle', '==', songTitle),
      orderBy('completedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PracticeSession[];
  } catch (error) {
    console.error('Error fetching song practice history:', error);
    throw new Error('Failed to load song practice history');
  }
};

/**
 * Get practice statistics for a user
 */
export const getUserPracticeStats = async (userId: string): Promise<PracticeStats> => {
  try {
    const q = query(
      collection(db, 'practiceHistory'),
      where('userId', '==', userId),
      orderBy('completedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const sessions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PracticeSession[];

    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        totalDuration: 0,
        averageScore: 0,
        averageDuration: 0,
        streakDays: 0,
        weeklyStats: []
      };
    }

    // Calculate stats
    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);
    const averageDuration = Math.round(totalDuration / totalSessions);
    
    const sessionsWithScore = sessions.filter(s => s.score !== undefined);
    const averageScore = sessionsWithScore.length > 0 
      ? Math.round(sessionsWithScore.reduce((sum, session) => sum + (session.score || 0), 0) / sessionsWithScore.length)
      : 0;

    // Calculate streak (simplified - consecutive days with practice)
    const streakDays = calculateStreakDays(sessions);

    // Get last practice date
    const lastPracticeDate = sessions[0]?.completedAt.toDate();

    // Calculate weekly stats (last 7 days)
    const weeklyStats = calculateWeeklyStats(sessions);

    // Find most practiced song
    const songCounts = sessions.reduce((acc, session) => {
      acc[session.songTitle] = (acc[session.songTitle] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostPracticedSong = Object.entries(songCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0];

    return {
      totalSessions,
      totalDuration,
      averageScore,
      averageDuration,
      streakDays,
      lastPracticeDate,
      mostPracticedSong,
      weeklyStats
    };
  } catch (error) {
    console.error('Error calculating practice stats:', error);
    throw new Error('Failed to calculate practice statistics');
  }
};

/**
 * Update an existing practice session
 */
export const updatePracticeSession = async (
  sessionId: string,
  updates: Partial<PracticeSessionInput>
): Promise<void> => {
  try {
    const sessionRef = doc(db, 'practiceHistory', sessionId);
    await updateDoc(sessionRef, updates);
  } catch (error) {
    console.error('Error updating practice session:', error);
    throw new Error('Failed to update practice session');
  }
};

/**
 * Delete a practice session
 */
export const deletePracticeSession = async (sessionId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'practiceHistory', sessionId));
  } catch (error) {
    console.error('Error deleting practice session:', error);
    throw new Error('Failed to delete practice session');
  }
};

/**
 * Get practice sessions filtered by date range
 */
export const getPracticeSessionsByDateRange = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<PracticeSession[]> => {
  try {
    const q = query(
      collection(db, 'practiceHistory'),
      where('userId', '==', userId),
      where('completedAt', '>=', Timestamp.fromDate(startDate)),
      where('completedAt', '<=', Timestamp.fromDate(endDate)),
      orderBy('completedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PracticeSession[];
  } catch (error) {
    console.error('Error fetching practice sessions by date range:', error);
    throw new Error('Failed to load practice sessions for date range');
  }
};

// Helper function to calculate consecutive practice days
const calculateStreakDays = (sessions: PracticeSession[]): number => {
  if (sessions.length === 0) return 0;

  const uniqueDates = [...new Set(
    sessions.map(session => 
      session.completedAt.toDate().toDateString()
    )
  )].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 1;
  
  // Check if the most recent practice was today or yesterday
  const mostRecentDate = new Date(uniqueDates[0]);
  const daysDiff = Math.floor((new Date().getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff > 1) return 0; // Streak broken if more than 1 day gap

  for (let i = 1; i < uniqueDates.length; i++) {
    const currentDate = new Date(uniqueDates[i]);
    const previousDate = new Date(uniqueDates[i - 1]);
    const diffTime = previousDate.getTime() - currentDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// Helper function to calculate weekly practice stats
const calculateWeeklyStats = (sessions: PracticeSession[]): { day: string; minutes: number }[] => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weeklyData = daysOfWeek.map(day => ({ day, minutes: 0 }));

  // Get sessions from the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const recentSessions = sessions.filter(session => 
    session.completedAt.toDate() >= oneWeekAgo
  );

  recentSessions.forEach(session => {
    const dayOfWeek = session.completedAt.toDate().getDay();
    weeklyData[dayOfWeek].minutes += session.duration;
  });

  return weeklyData;
};
