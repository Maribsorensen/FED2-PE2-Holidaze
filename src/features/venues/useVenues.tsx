import { useEffect, useRef, useState } from 'react';
import type { TVenue } from '../../types/venue';
import { getVenues, searchVenues } from './services';

export function useSearchVenues(query: string, limit = 50, page = 1) {
  const [venues, setVenues] = useState<TVenue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep a ref to abort previous requests
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query) {
      setVenues([]);
      setLoading(false);
      return;
    }

    // Abort any previous request
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);

    searchVenues(query, limit, page, controller.signal)
      .then((data) => setVenues(data))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort(); // cancel if query changes or component unmounts
    };
  }, [query, limit, page]);

  return { venues, loading, error };
}
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
