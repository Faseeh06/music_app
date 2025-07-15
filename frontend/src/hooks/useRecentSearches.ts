import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getRecentSearches, RecentSearch } from '../services/searchService';

export const useRecentSearches = () => {
  const { currentUser } = useAuth();
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentSearches = useCallback(async () => {
    if (!currentUser) {
      setRecentSearches([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const searches = await getRecentSearches(currentUser.uid);
      setRecentSearches(searches);
    } catch (err) {
      setError('Failed to load recent searches.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchRecentSearches();
  }, [fetchRecentSearches]);

  return { recentSearches, loading, error, refresh: fetchRecentSearches };
};
