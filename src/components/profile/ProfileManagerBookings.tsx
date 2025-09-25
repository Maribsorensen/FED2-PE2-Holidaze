import { useEffect, useState } from 'react';
import { SkeletonCardGrid } from '../common/LoadingSkeleton';
import type { TBookings } from '../../types/bookings';
import { safeAsync } from '../../lib/safeAsync';
import { getBookingsForManager } from '../../features/bookings/services';

type ManagerBookingsProps = {
  userName: string;
};

export function ManagerBookings({ userName }: ManagerBookingsProps) {
  const [bookings, setBookings] = useState<TBookings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBookings() {
      const data = await safeAsync(
        () => getBookingsForManager(userName),
        () => setError('Failed to fetch bookings for your venues')
      );
      if (data) setBookings(data);
      setLoading(false);
    }
    loadBookings();
  }, [userName]);

  if (loading) return <SkeletonCardGrid count={6} />;
  if (error) return <p>{error}</p>;
  if (!bookings.length) return <p>No upcoming bookings for your venues.</p>;

  const now = new Date();
  const upcoming = bookings.filter((b) => new Date(b.dateTo) >= now);

  return (
    <div className="space-y-4">
      {upcoming.map((b) => (
        <div
          key={b.id}
          className="flex items-center gap-4 border p-4 rounded-md shadow-sm"
        >
          <img
            src={b.venue.media?.[0]?.url || '/placeholder.jpg'}
            alt={b.venue.media?.[0]?.alt || b.venue.name}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <p className="font-semibold font-headings">{b.venue.name}</p>
            <p className="text-sm text-gray-600 font-body">
              {new Date(b.dateFrom).toLocaleDateString()} →{' '}
              {new Date(b.dateTo).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 font-body">{b.guests} guests</p>
          </div>
        </div>
      ))}
    </div>
  );
}
