import { useState, useEffect, useCallback } from 'react';
import { practiceSessionService, PracticeSession, PracticeSessionInput } from '../services/practiceSessionService';
import { useAuth } from './useAuth';
import { UserInfo } from '../services/practiceService';

export const usePracticeSessions = () => {
  const { currentUser } = useAuth();
  const [allSessions, setAllSessions] = useState<PracticeSession[]>([]);
  const [stats, setStats] = useState(practiceSessionService.getPracticeStats([])); // Initial empty stats
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all practice sessions for the current user
  const loadSessions = useCallback(async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const sessions = await practiceSessionService.getPracticeSessions(currentUser.uid);
      setAllSessions(sessions);
      setStats(practiceSessionService.getPracticeStats(sessions));
    } catch (err) {
      console.error('Error loading practice sessions:', err);
      setError('Failed to load practice sessions.');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Add a new practice session
  const addSession = useCallback(async (sessionData: PracticeSessionInput) => {
    if (!currentUser) {
      setError('You must be logged in to add a session.');
      return;
    }
    
    setLoading(true);
    try {
      const userInfo: UserInfo = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      };
      await practiceSessionService.addPracticeSession(userInfo, sessionData);
      await loadSessions(); // Reload all data to reflect the new session
    } catch (err) {
      console.error('Error adding practice session:', err);
      setError('Failed to add practice session.');
    } finally {
      setLoading(false);
    }
  }, [currentUser, loadSessions]);

  // Format relative time (e.g., "2 hours ago", "1 day ago")
  const formatRelativeTime = useCallback((date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  }, []);

  // Load sessions on mount or when user changes
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  return {
    allSessions,
    // Derived state: recent sessions (unique by songId)
    recentSessions: [...new Map(allSessions.map(item => [item.songId, item])).values()].slice(0, 5),
    stats,
    loading,
    error,
    addSession,
    formatRelativeTime,
    refresh: loadSessions
  };
};