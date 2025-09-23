import { useEffect, useRef, useState } from 'react';
import type { TPaginationMeta, TVenue } from '../../types/venue';
import { getVenues, searchVenues } from './services';
import { safeAsync } from '../../lib/safeAsync';

export function useSearchVenues(query: string, limit = 50, page = 1) {
  const [venues, setVenues] = useState<TVenue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query) {
      setVenues([]);
      setLoading(false);
      setError(null);
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    safeAsync(
      () => searchVenues(query, limit, page, controller.signal),
      () => setError('Failed to search venues')
    ).then((data) => {
      if (data) setVenues(data);
      setLoading(false);
    });

    return () => controller.abort();
  }, [query, limit, page]);

  return { venues, loading, error };
}

export function useVenues(
  limit = 50,
  page = 1,
  sort: 'created' | 'name' = 'created',
  sortOrder: 'asc' | 'desc' = 'desc'
) {
  const [venues, setVenues] = useState<TVenue[]>([]);
  const [meta, setMeta] = useState<TPaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    safeAsync(
      () => getVenues(limit, page, sort, sortOrder),
      () => setError('Failed to fetch venues')
    ).then((response) => {
      if (response) {
        setVenues(response.data);
        setMeta(response.meta);
      }
      setLoading(false);
    });
  }, [limit, page, sort, sortOrder]);

  return { venues, meta, loading, error };
}
