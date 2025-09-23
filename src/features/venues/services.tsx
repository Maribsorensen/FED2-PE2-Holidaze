import { fetchApi } from '../../lib/api';
import type { TPaginatedVenues, TVenue } from '../../types/venue';

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

export async function getSingleVenue(id: string): Promise<TVenue> {
  const response = await fetchApi<{ data: TVenue }>(
    `/holidaze/venues/${id}?_bookings=true`
  );
  return response.data;
}

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

export async function createVenue(data: Partial<TVenue>): Promise<TVenue> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No access token found');

  const response = await fetchApi<TVenue>(`/holidaze/venues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function getVenuesForUser(name: string): Promise<TVenue[]> {
  const data = await fetchApi<{ data: TVenue[] }>(
    `/holidaze/profiles/${name}/venues`
  );
  return data.data;
}

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
