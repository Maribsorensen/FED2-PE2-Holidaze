import { useEffect, useRef, useState } from 'react';
import type { TPaginationMeta, TVenue } from '../../types/venue';
import { getVenues, searchVenues } from './services';
import { safeAsync } from '../../lib/safeAsync';

/**
 * Custom hook to search for venues based on a query string.
 * Cancels previous requests if a new query is entered.
 *
 * @param {string} query - The search query string.
 * @param {number} [limit=50] - Number of venues to fetch per page.
 * @param {number} [page=1] - The page number to fetch.
 * @returns {{ venues: TVenue[], loading: boolean, error: string | null }}
 *   An object containing:
 *   - venues: Array of venues matching the search query.
 *   - loading: Boolean indicating if the search is in progress.
 *   - error: Error message if the search fails, otherwise null.
 */

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

/**
 * Custom hook to fetch a list of venues with pagination and sorting options.
 *
 * @param {number} [limit=50] - Number of venues to fetch per page.
 * @param {number} [page=1] - The page number to fetch.
 * @param {'created' | 'name'} [sort='created'] - Field to sort by.
 * @param {'asc' | 'desc'} [sortOrder='desc'] - Sort order.
 * @returns {{
 *   venues: TVenue[],
 *   meta: TPaginationMeta | null,
 *   loading: boolean,
 *   error: string | null
 * }} An object containing the fetched venues, pagination metadata, loading state, and error message.
 */

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
