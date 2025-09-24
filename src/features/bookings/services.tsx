import { fetchApi } from '../../lib/api';
import type { TBookings } from '../../types/bookings';

export async function getBookingsForUser(name: string): Promise<TBookings[]> {
  const data = await fetchApi<{ data: TBookings[] }>(
    `/holidaze/profiles/${name}/bookings?_venue=true`
  );
  return data.data;
}

export async function createBooking(
  data: Partial<TBookings>
): Promise<TBookings> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No access token found');
  const response = await fetchApi<TBookings>(`/holidaze/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
}

export async function deleteBooking(id: string): Promise<void> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No access token found');

  await fetchApi<void>(`/holidaze/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateBooking(
  id: string,
  data: Partial<Pick<TBookings, 'dateFrom' | 'dateTo' | 'guests'>>
): Promise<{ data: TBookings }> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No access token found');

  const response = await fetchApi<{ data: TBookings }>(
    `/holidaze/bookings/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}
