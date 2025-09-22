import { useEffect, useState } from 'react';
import type { TBookings } from '../../types/bookings';
import { getBookingsForUser } from '../../features/bookings/services';
import { BookingCard } from './BookingCard';

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

  const now = new Date();
  const upcoming = bookings.filter((b) => new Date(b.dateTo) >= now);
  const past = bookings.filter((b) => new Date(b.dateTo) < now);

  const renderList = (list: TBookings[]) => (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((b) => (
        <BookingCard key={b.venueId} booking={b} />
      ))}
    </ul>
  );

  return (
    <div className="space-y-8">
      {upcoming.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>
          {renderList(upcoming)}
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Past Bookings</h2>
          {renderList(past)}
        </section>
      )}
    </div>
  );
}
