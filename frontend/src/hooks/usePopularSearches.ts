import { useState, useEffect, useCallback } from 'react';
import { getPopularSearches, PopularSearch } from '../services/searchService';

export const usePopularSearches = () => {
  const [popularSearches, setPopularSearches] = useState<PopularSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularSearches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const searches = await getPopularSearches();
      setPopularSearches(searches);
    } catch (err) {
      setError('Failed to load popular searches.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopularSearches();
  }, [fetchPopularSearches]);

  return { popularSearches, loading, error, refresh: fetchPopularSearches };
};
