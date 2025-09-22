import { format } from 'date-fns';
import type { TBookings } from '../../types/bookings';
import { VenueCard } from './VenueCard';

interface BookingCardProps {
  booking: TBookings;
}

export function BookingCard({ booking }: BookingCardProps) {
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
          </div>
        }
      />
    </div>
  );
}
