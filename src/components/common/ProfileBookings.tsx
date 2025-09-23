import { useEffect, useState } from 'react';
import type { TBookings } from '../../types/bookings';
import { getBookingsForUser } from '../../features/bookings/services';
import { BookingCard } from './BookingCard';
import { safeAsync } from '../../lib/safeAsync';

type BookingsProps = {
  userName: string;
};

export function Bookings({ userName }: BookingsProps) {
  const [bookings, setBookings] = useState<TBookings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBookings() {
      const bookingsData = await safeAsync(
        () => getBookingsForUser(userName),
        () => setError('Failed to fetch bookings')
      );
      if (bookingsData) setBookings(bookingsData);
      setLoading(false);
    }
    loadBookings();
  }, [userName]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;
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
