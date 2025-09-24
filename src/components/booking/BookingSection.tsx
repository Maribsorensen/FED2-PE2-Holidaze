import { useState } from 'react';
import type { TVenue } from '../../types/venue';
import { createBooking } from '../../features/bookings/services';
import { BookingCalendar } from './BookingCalendar';
import { GuestInput } from './GuestInput';
import { BookingSummary } from './BookingSummary';
import Modal from '../common/Modal';
import { useNavigate } from 'react-router-dom';
import { safeAsync } from '../../lib/safeAsync';
import toast from 'react-hot-toast';

interface BookingSectionProps {
  venue: TVenue;
}

export function BookingSection({ venue }: BookingSectionProps) {
  const [selectedRange, setSelectedRange] = useState<Date[] | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const disabledDates: Date[] =
    venue.bookings?.flatMap((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      const dates: Date[] = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      return dates;
    }) || [];

  const handleConfirmBooking = async () => {
    setError(null);

    if (!selectedRange || selectedRange.length !== 2) {
      setError('Please select a valid date range.');
      return;
    }
    if (guests < 1 || guests > venue.maxGuests) {
      setError(`Number of guests must be between 1 and ${venue.maxGuests}.`);
      return;
    }

    setLoading(true);
    await safeAsync(
      () =>
        createBooking({
          dateFrom: selectedRange[0].toISOString(),
          dateTo: selectedRange[1].toISOString(),
          guests,
          venueId: venue.id,
        }),
      () => setError('Booking failed. Please try again.')
    )
      .then((res) => {
        if (res) {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-fade-in' : 'animate-fade-out'
              } bg-cta text-white px-6 py-3 rounded shadow-lg z-50`}
            >
              Booking confirmed!
              <button
                className="underline ml-2 cursor-pointer"
                onClick={() => navigate('/profile')}
              >
                View Booking
              </button>
            </div>
          ));
          setModalOpen(false);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr] gap-5 mt-6">
        <div>
          <BookingCalendar
            disabledDates={disabledDates}
            onChange={(range) => {
              setSelectedRange(range);
              setError(null);
            }}
          />
          <GuestInput
            guests={guests}
            maxGuests={venue.maxGuests}
            onChange={(g) => {
              setGuests(g);
              setError(null);
            }}
          />
        </div>

        <div>
          <BookingSummary
            selectedRange={selectedRange}
            guests={guests}
            maxGuests={venue.maxGuests}
            pricePerNight={venue.price}
            onBook={() => setModalOpen(true)}
          />
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {selectedRange && selectedRange.length === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Confirm Your Booking</h2>
              <p>
                <strong>Dates:</strong> {selectedRange[0].toDateString()} →{' '}
                {selectedRange[1].toDateString()}
              </p>
              <p>
                <strong>Guests:</strong> {guests}
              </p>
              <p>
                <strong>Total:</strong> $
                {Math.ceil(
                  (selectedRange[1].getTime() - selectedRange[0].getTime()) /
                    (1000 * 60 * 60 * 24)
                ) * venue.price}
              </p>

              {error && <p className="text-red-500 font-semibold">{error}</p>}

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-md border hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                  disabled={loading}
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
