import { fetchApi } from '../../lib/api';
import type { TBookings } from '../../types/bookings';

export async function getBookingsForUser(name: string): Promise<TBookings[]> {
  const data = await fetchApi<{ data: TBookings[] }>(
    `/holidaze/profiles/${name}/bookings?_venue=true`
  );
  return data.data;
}
