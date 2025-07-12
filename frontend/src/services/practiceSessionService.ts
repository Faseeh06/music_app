export interface PracticeSession {
  id: string;
  songId: string;
  songTitle: string;
  artist: string;
  thumbnail: string;
  duration: number; // in minutes
  date: string; // ISO string
  progress: number; // percentage
  aiScore: number;
  skillsImproved: string[];
  practiceTime: number; // in seconds
  difficulty: string;
  // Song data for playback
  trackData?: {
    id: string;
    title: string;
    channelTitle: string;
    thumbnail: string;
  };
}

class PracticeSessionService {
  private readonly STORAGE_KEY = 'practice_sessions';

  // Get all practice sessions for a user
  getPracticeSessions(): PracticeSession[] {
    try {
      const sessions = localStorage.getItem(this.STORAGE_KEY);
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('Error loading practice sessions:', error);
      return [];
    }
  }

  // Get recent practice sessions (last 5, unique songs only)
  getRecentPracticeSessions(limit: number = 5): PracticeSession[] {
    const sessions = this.getPracticeSessions();
    const sortedSessions = sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Filter to show only the most recent session for each unique song
    const uniqueSessions = new Map<string, PracticeSession>();
    
    for (const session of sortedSessions) {
      if (!uniqueSessions.has(session.songId)) {
        uniqueSessions.set(session.songId, session);
      }
    }
    
    return Array.from(uniqueSessions.values()).slice(0, limit);
  }

  // Add a historical practice session (for sample data)
  addHistoricalPracticeSession(session: Omit<PracticeSession, 'id'>, date: string): PracticeSession {
    const newSession: PracticeSession = {
      ...session,
      id: this.generateId(),
      date: date
    };

    const sessions = this.getPracticeSessions();
    sessions.unshift(newSession); // Add to beginning

    // Keep only last 50 sessions to prevent localStorage from getting too large
    const trimmedSessions = sessions.slice(0, 50);
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trimmedSessions));
    return newSession;
  }

  // Add a new practice session (or update existing recent one)
  addPracticeSession(session: Omit<PracticeSession, 'id' | 'date'>): PracticeSession {
    const sessions = this.getPracticeSessions();
    
    // Check if there's a recent session for the same song (within last 2 hours)
    const recentCutoff = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    const existingRecentSession = sessions.find(s => 
      s.songId === session.songId && 
      new Date(s.date) > recentCutoff
    );

    if (existingRecentSession) {
      // Update the existing recent session
      const updatedSession: PracticeSession = {
        ...existingRecentSession,
        ...session,
        date: new Date().toISOString(), // Update to current time
        practiceTime: existingRecentSession.practiceTime + (session.practiceTime || 0)
      };
      
      // Replace the existing session
      const sessionIndex = sessions.findIndex(s => s.id === existingRecentSession.id);
      sessions[sessionIndex] = updatedSession;
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
      return updatedSession;
    } else {
      // Create new session
      const newSession: PracticeSession = {
        ...session,
        id: this.generateId(),
        date: new Date().toISOString()
      };

      sessions.unshift(newSession); // Add to beginning

      // Keep only last 50 sessions to prevent localStorage from getting too large
      const trimmedSessions = sessions.slice(0, 50);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trimmedSessions));
      return newSession;
    }
  }

  // Update an existing practice session
  updatePracticeSession(id: string, updates: Partial<PracticeSession>): PracticeSession | null {
    const sessions = this.getPracticeSessions();
    const index = sessions.findIndex(session => session.id === id);
    
    if (index === -1) return null;

    sessions[index] = { ...sessions[index], ...updates };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
    return sessions[index];
  }

  // Delete a practice session
  deletePracticeSession(id: string): boolean {
    const sessions = this.getPracticeSessions();
    const filteredSessions = sessions.filter(session => session.id !== id);
    
    if (filteredSessions.length === sessions.length) return false;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredSessions));
    return true;
  }

  // Get practice statistics
  getPracticeStats() {
    const sessions = this.getPracticeSessions();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todaySessions = sessions.filter(session => 
      new Date(session.date) >= today
    );
    const weekSessions = sessions.filter(session => 
      new Date(session.date) >= thisWeek
    );

    return {
      totalSessions: sessions.length,
      todaySessions: todaySessions.length,
      weekSessions: weekSessions.length,
      totalPracticeTime: sessions.reduce((total, session) => total + session.practiceTime, 0),
      todayPracticeTime: todaySessions.reduce((total, session) => total + session.practiceTime, 0),
      weekPracticeTime: weekSessions.reduce((total, session) => total + session.practiceTime, 0),
      averageScore: sessions.length > 0 
        ? sessions.reduce((total, session) => total + session.aiScore, 0) / sessions.length 
        : 0
    };
  }

  // Check if a song was recently practiced
  isRecentlyPracticed(songId: string, hours: number = 24): boolean {
    const sessions = this.getPracticeSessions();
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    return sessions.some(session => 
      session.songId === songId && new Date(session.date) > cutoff
    );
  }

  // Get practice history for a specific song
  getSongPracticeHistory(songId: string): PracticeSession[] {
    const sessions = this.getPracticeSessions();
    return sessions
      .filter(session => session.songId === songId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Generate a unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Clear all practice sessions (for testing/reset)
  clearAllSessions(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const practiceSessionService = new PracticeSessionService(); 