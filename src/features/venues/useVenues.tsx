import { useEffect, useState } from 'react';
import type { TVenue } from '../../types/venue';
import { getVenues } from './services';

export function useVenues(limit = 50, page = 1) {
  const [venues, setVenues] = useState<TVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVenues() {
      setLoading(true);
      try {
        const data = await getVenues(limit, page);
        setVenues(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchVenues();
  }, [limit, page]);
  return { venues, loading, error };
}
