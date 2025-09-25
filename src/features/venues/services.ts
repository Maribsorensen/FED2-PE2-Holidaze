import { fetchApi } from '../../lib/api';
import type { TPaginatedVenues, TVenue } from '../../types/venue';

/**
 * Fetches a paginated list of venues from the API.
 *
 * @param {number} [limit=40] - Number of venues to fetch per page (default 40).
 * @param {number} [page=1] - Page number to fetch (default 1).
 * @param {'created' | 'name'} [sort='created'] - Field to sort by (default 'created').
 * @param {'asc' | 'desc'} [sortOrder='desc'] - Sort order (default 'desc').
 * @returns {Promise<TPaginatedVenues>} - Resolves to an object containing venues data and pagination metadata.
 */

export async function getVenues(
  limit = 40,
  page = 1,
  sort = 'created',
  sortOrder: 'asc' | 'desc' = 'desc'
): Promise<TPaginatedVenues> {
  return fetchApi<TPaginatedVenues>(
    `/holidaze/venues?limit=${limit}&page=${page}&sort=${sort}&sortOrder=${sortOrder}`
  );
}

/**
 * Fetches a single venue by its ID, including its bookings.
 * @param {string} id - The ID of the venue to fetch.
 * @returns {Promise<TVenue>} - A promise that resolves to the venue data.
 */

export async function getSingleVenue(id: string): Promise<TVenue> {
  const response = await fetchApi<{ data: TVenue }>(
    `/holidaze/venues/${id}?_bookings=true`
  );
  return response.data;
}

/**
 * Searches for venues based on a query string (automatically URL-encoded).
 * @param {string} query - The search query string.
 * @param {number} [limit=50] - Number of venues to fetch per page.
 * @param {number} [page=1] - The page number to fetch.
 * @param {AbortSignal} [signal] - Optional AbortSignal to cancel the request.
 * @returns {Promise<TVenue[]>} - A promise that resolves to an array of venues matching the search query.
 */

export async function searchVenues(
  query: string,
  limit = 50,
  page = 1,
  signal?: AbortSignal
) {
  const response = await fetchApi<{ data: TVenue[] }>(
    `/holidaze/venues/search?q=${encodeURIComponent(query)}&limit=${limit}&page=${page}`,
    { signal }
  );
  return response.data;
}

/**
 * Creates a new venue.
 * Requires an access token stored in localStorage under the key 'token'.
 * @param {Partial<TVenue>} data - The venue data to create.
 * @returns {Promise<TVenue>} - A promise that resolves to the created venue data.
 * @throws {Error} - Throws an error if no access token is found.
 */

export async function createVenue(data: Partial<TVenue>): Promise<TVenue> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No access token found');

  const response = await fetchApi<{ data: TVenue }>(`/holidaze/venues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.data;
}

/**
 * Fetches venues created by a specific user.
 * @param {string} name - The username of the profile whose venues to fetch.
 * @returns {Promise<TVenue[]>} - A promise that resolves to an array of venues created by the user.
 */

export async function getVenuesForUser(name: string): Promise<TVenue[]> {
  const data = await fetchApi<{ data: TVenue[] }>(
    `/holidaze/profiles/${name}/venues`
  );
  return data.data;
}

/**
 * Edits an existing venue.
 * Requires an access token stored in localStorage under the key 'token'.
 * @param {string} id - The ID of the venue to edit.
 * @param {Partial<TVenue>} data - The venue data to update.
 * @returns {Promise<TVenue>} - A promise that resolves to the updated venue data.
 * @throws {Error} - Throws an error if no access token is found.
 */

export async function editVenue(
  id: string,
  data: Partial<TVenue>
): Promise<TVenue> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No access token found');
  const response = await fetchApi<TVenue>(`/holidaze/venues/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
}

/**
 * Deletes a venue by its ID.
 * Requires an access token stored in localStorage under the key 'token'.
 * @param {string} id - The ID of the venue to delete.
 * @returns {Promise<void>} - A promise that resolves when the venue is deleted.
 * @throws {Error} - Throws an error if no access token is found.
 */

export async function deleteVenue(id: string): Promise<void> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No access token found');
  await fetchApi(`/holidaze/venues/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
