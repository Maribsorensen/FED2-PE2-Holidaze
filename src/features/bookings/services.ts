import { fetchApi } from '../../lib/api';
import type { TBookings } from '../../types/bookings';
import type { VenueWithBookings } from '../../types/venue';

/**
 * Fetches all bookings for a given user, including venue information.
 *
 * @param {string} name - The username of the profile whose bookings to fetch.
 * @returns {Promise<TBookings[]>} - A promise that resolves to an array of bookings.
 */

export async function getBookingsForUser(name: string): Promise<TBookings[]> {
  const data = await fetchApi<{ data: TBookings[] }>(
    `/holidaze/profiles/${name}/bookings?_venue=true`
  );
  return data.data;
}

/**
 * Creates a new booking for the authenticated user.
 *
 * @param {Partial<TBookings>} data - The booking data to create.
 * @returns {Promise<TBookings>} - A promise that resolves to the created booking.
 * @throws {Error} - Throws if no access token is found in localStorage.
 */

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

/**
 * Deletes a booking by its ID.
 *
 * @param {string} id - The ID of the booking to delete.
 * @returns {Promise<void>} - A promise that resolves when the booking is successfully deleted.
 * @throws {Error} - Throws if no access token is found in localStorage.
 */

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

/**
 * Updates a booking by its ID.
 *
 * @param {string} id - The ID of the booking to update.
 * @param {Partial<Pick<TBookings, 'dateFrom' | 'dateTo' | 'guests'>>} data - The booking fields to update.
 * @returns {Promise<{ data: TBookings }>} - A promise that resolves to the updated booking.
 * @throws {Error} - Throws if no access token is found in localStorage.
 */

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

/**
 * Fetches all bookings for venues managed by a specific user (manager).
 *
 * @param {string} name - The username of the manager.
 * @returns {Promise<TBookings[]>} - A promise that resolves to a list of bookings for all venues owned by the manager.
 */

export async function getBookingsForManager(
  name: string
): Promise<TBookings[]> {
  const data = await fetchApi<{ data: VenueWithBookings[] }>(
    `/holidaze/profiles/${name}/venues?_bookings=true&_owner=true`
  );

  const venues = data.data;

  const bookings: TBookings[] = venues.flatMap((venue) =>
    venue.bookings.map((b) => ({
      ...b,
      venue,
    }))
  );

  return bookings;
}
