import { useEffect, useState } from 'react';
import { VenueCard } from './VenueCard';
import type { TBookings } from '../../types/bookings';
import { getBookingsForUser } from '../../features/bookings/services';

type BookingsProps = {
  userName: string;
};

export function Bookings({ userName }: BookingsProps) {
  const [bookings, setBookings] = useState<TBookings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      try {
        const bookingsData = await getBookingsForUser(userName);
        setBookings(bookingsData);
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, [userName]);

  if (loading) return <p>Loading bookings...</p>;
  if (!bookings.length) return <p>You have no bookings yet.</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <VenueCard key={booking.id} venue={booking.venue} />
      ))}
    </ul>
  );
}
