import { useEffect, useState } from 'react';
import { SkeletonCardGrid } from '../common/LoadingSkeleton';
import type { TBookings } from '../../types/bookings';
import { safeAsync } from '../../lib/safeAsync';
import { getBookingsForManager } from '../../features/bookings/services';

/**
 * ManagerBookings component displays a list of bookings for venues managed by a specific user.
 *
 * Features:
 * - Fetches all bookings for venues managed by the given `userName` on mount.
 * - Displays loading state while fetching data.
 * - Shows an error message if fetching fails.
 * - Displays a message if no bookings are found.
 * - Filters bookings to show only upcoming bookings (where `dateTo` is in the future).
 * - Renders each booking with:
 *   - Venue image (or placeholder if not available)
 *   - Venue name
 *   - Booking dates (from → to)
 *   - Number of guests
 *
 * Props:
 * - `userName` (string): The username whose managed venue bookings should be fetched.
 *
 * @param {Object} props - Component props.
 * @param {string} props.userName - The username to fetch bookings for.
 *
 * @example
 * <ManagerBookings userName="john_doe" />
 */

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
            <p className="font-semibold font-headings text-transform uppercase">
              {b.venue.name}
            </p>
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
