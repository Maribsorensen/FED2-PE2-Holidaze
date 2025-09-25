import { format } from 'date-fns';
import type { TBookings } from '../../types/bookings';
import { VenueCard } from '../venue/VenueCard';
import { BookingActionsMenu } from './BookingsActionMenu';

/**
 * BookingCard component displays a summary of a booking along with venue details and actions.
 *
 * Features:
 * - Shows venue information using the `VenueCard` component.
 * - Displays booking dates and number of guests.
 * - Provides action buttons for editing or deleting the booking using `BookingActionsMenu`.
 *
 * @param {Object} props - Component props.
 * @param {TBookings} props.booking - The booking details including venue, dates, and guests.
 * @param {() => void} props.onUpdateBooking - Callback triggered when the "Edit" action is clicked.
 * @param {() => void} props.onDeleteBooking - Callback triggered when the "Delete" action is clicked.
 *
 * @example
 * <BookingCard
 *   booking={bookingData}
 *   onUpdateBooking={() => console.log('Edit booking')}
 *   onDeleteBooking={() => console.log('Delete booking')}
 * />
 *
 * @returns {JSX.Element} The rendered booking card component.
 */

interface BookingCardProps {
  booking: TBookings;
  onUpdateBooking: () => void;
  onDeleteBooking: () => void;
}

export function BookingCard({
  booking,
  onUpdateBooking,
  onDeleteBooking,
}: BookingCardProps) {
  const { venue, dateFrom, dateTo, guests } = booking;

  return (
    <div className="relative">
      <VenueCard
        venue={venue}
        actions={
          <div className="flex flex-col items-end gap-1">
            <span className="bg-white/80 text-black text-xs px-2 py-1 rounded">
              Guests: {guests}
            </span>
            <span className="bg-white/80 text-black text-xs px-2 py-1 rounded">
              {format(new Date(dateFrom), 'MMM d')} -{' '}
              {format(new Date(dateTo), 'MMM d')}
            </span>

            <BookingActionsMenu
              onUpdate={onUpdateBooking}
              onDelete={onDeleteBooking}
            />
          </div>
        }
      />
    </div>
  );
}
