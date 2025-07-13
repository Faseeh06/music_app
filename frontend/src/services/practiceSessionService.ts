/**
 * @file practiceSessionService.ts
 * @description A client-facing service that acts as a wrapper around the core practiceService.
 * This service provides methods that the UI layer (hooks and components) can call.
 * It is responsible for adapting the core service's output for the client.
 */

import * as practiceService from './practiceService';
import { UserInfo } from './practiceService';

// This interface aligns with the Firestore PracticeHistoryEntry, providing a consistent data shape.
export type PracticeSession = practiceService.PracticeHistoryEntry;

// The input for creating a new session, matching the core service.
export type PracticeSessionInput = practiceService.PracticeSessionInput;

class PracticeSessionService {
  
  /**
   * Logs a new practice session by calling the core service.
   * @param userInfo - The identity of the user logging the session.
   * @param sessionData - The details of the practice session.
   */
  async addPracticeSession(userInfo: UserInfo, sessionData: PracticeSessionInput): Promise<void> {
    try {
      await practiceService.logPracticeSession(userInfo, sessionData);
    } catch (error) {
      console.error('Error in PracticeSessionService while adding session:', error);
      throw error; // Re-throw to be handled by the caller (e.g., the hook)
    }
  }

  /**
   * Fetches all practice history for a given user.
   * @param userId - The ID of the user whose sessions to fetch.
   * @returns A promise that resolves to an array of practice sessions.
   */
  async getPracticeSessions(userId: string): Promise<PracticeSession[]> {
    try {
      // A high limit is used to fetch all sessions for client-side calculations.
      // For apps with very large histories, a more sophisticated pagination or server-side aggregation would be needed.
      const result = await practiceService.getUserPracticeHistory(userId, { limitCount: 1000 });
      return result.history as PracticeSession[];
    } catch (error) {
      console.error('Error loading practice sessions:', error);
      return [];
    }
  }

  /**
   * Calculates practice statistics from a given list of sessions.
   * @param sessions - An array of practice sessions.
   * @returns An object containing calculated statistics.
   */
  getPracticeStats(sessions: PracticeSession[]) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(today);
    startOfWeek.setDate(startOfWeek.getDate() - today.getDay());

    const todaySessions = sessions.filter(session => 
      session.completedAt.toDate() >= today
    );
    const weekSessions = sessions.filter(session => 
      session.completedAt.toDate() >= startOfWeek
    );

    const totalPracticeTime = sessions.reduce((total, session) => total + session.duration, 0);

    return {
      totalSessions: sessions.length,
      todaySessions: todaySessions.length,
      weekSessions: weekSessions.length,
      totalPracticeTime: totalPracticeTime, // in minutes
      todayPracticeTime: todaySessions.reduce((total, session) => total + session.duration, 0),
      weekPracticeTime: weekSessions.reduce((total, session) => total + session.duration, 0),
      averageScore: sessions.length > 0 
        ? Math.round(sessions.reduce((total, session) => total + session.score, 0) / sessions.length)
        : 0
    };
  }
}

export const practiceSessionService = new PracticeSessionService();