import { useState, useEffect, useCallback } from 'react';
import { practiceSessionService, PracticeSession } from '../services/practiceSessionService';

export const usePracticeSessions = () => {
  const [recentSessions, setRecentSessions] = useState<PracticeSession[]>([]);
  const [allSessions, setAllSessions] = useState<PracticeSession[]>([]);
  const [stats, setStats] = useState(practiceSessionService.getPracticeStats());
  const [loading, setLoading] = useState(false);

  // Load practice sessions
  const loadSessions = useCallback(() => {
    setLoading(true);
    try {
      const sessions = practiceSessionService.getPracticeSessions();
      const recent = practiceSessionService.getRecentPracticeSessions(5);
      const currentStats = practiceSessionService.getPracticeStats();
      
      setAllSessions(sessions);
      setRecentSessions(recent);
      setStats(currentStats);
    } catch (error) {
      console.error('Error loading practice sessions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new practice session
  const addSession = useCallback((sessionData: Omit<PracticeSession, 'id' | 'date'>) => {
    try {
      const newSession = practiceSessionService.addPracticeSession(sessionData);
      loadSessions(); // Reload to get updated data
      return newSession;
    } catch (error) {
      console.error('Error adding practice session:', error);
      return null;
    }
  }, [loadSessions]);

  // Update a practice session
  const updateSession = useCallback((id: string, updates: Partial<PracticeSession>) => {
    try {
      const updatedSession = practiceSessionService.updatePracticeSession(id, updates);
      if (updatedSession) {
        loadSessions(); // Reload to get updated data
      }
      return updatedSession;
    } catch (error) {
      console.error('Error updating practice session:', error);
      return null;
    }
  }, [loadSessions]);

  // Delete a practice session
  const deleteSession = useCallback((id: string) => {
    try {
      const success = practiceSessionService.deletePracticeSession(id);
      if (success) {
        loadSessions(); // Reload to get updated data
      }
      return success;
    } catch (error) {
      console.error('Error deleting practice session:', error);
      return false;
    }
  }, [loadSessions]);

  // Get practice history for a specific song
  const getSongHistory = useCallback((songId: string) => {
    return practiceSessionService.getSongPracticeHistory(songId);
  }, []);

  // Check if a song was recently practiced
  const isRecentlyPracticed = useCallback((songId: string, hours: number = 24) => {
    return practiceSessionService.isRecentlyPracticed(songId, hours);
  }, []);

  // Format relative time (e.g., "2時間前", "1日前")
  const formatRelativeTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}分前`;
    } else if (diffInHours < 24) {
      return `${diffInHours}時間前`;
    } else if (diffInDays < 7) {
      return `${diffInDays}日前`;
    } else {
      return date.toLocaleDateString('ja-JP');
    }
  }, []);

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  return {
    recentSessions,
    allSessions,
    stats,
    loading,
    addSession,
    updateSession,
    deleteSession,
    getSongHistory,
    isRecentlyPracticed,
    formatRelativeTime,
    refresh: loadSessions
  };
}; 