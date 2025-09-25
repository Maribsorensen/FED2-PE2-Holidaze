import { useState } from 'react';
import type { TVenue } from '../../types/venue';
import { createBooking } from '../../features/bookings/services';
import { BookingCalendar } from './BookingCalendar';
import { BookingSummary } from './BookingSummary';
import Modal from '../common/Modal';
import { useNavigate } from 'react-router-dom';
import { safeAsync } from '../../lib/safeAsync';
import toast from 'react-hot-toast';
import { Button } from '../common/Button';

/**
 * BookingSection component integrates the booking calendar and booking summary for a venue.
 *
 * Features:
 * - Displays a calendar for selecting a date range, disabling already booked dates.
 * - Shows a booking summary including selected dates, number of guests, and total price.
 * - Handles booking confirmation with validation and error handling.
 * - Prompts users to log in or register if they attempt to book without being authenticated.
 * - Provides modals for booking confirmation and login/register prompts.
 *
 * @param {Object} props - Component props.
 * @param {TVenue} props.venue - The venue details, including existing bookings, price, and max guests.
 *
 * @example
 * <BookingSection venue={venueData} />
 *
 * @returns {JSX.Element} The rendered booking section component.
 */

interface BookingSectionProps {
  venue: TVenue;
}

export function BookingSection({ venue }: BookingSectionProps) {
  const [selectedRange, setSelectedRange] = useState<Date[] | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
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

  // New handler for "Book Now"
  const handleBookNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoginModal(true);
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr] gap-5 mt-6">
        {/* Calendar */}
        <BookingCalendar
          disabledDates={disabledDates}
          onChange={(range) => {
            setSelectedRange(range);
            setError(null);
          }}
        />

        {/* Booking Summary */}
        <BookingSummary
          selectedRange={selectedRange}
          guests={guests}
          maxGuests={venue.maxGuests}
          pricePerNight={venue.price}
          onChangeGuests={(g) => setGuests(g)}
          onChangeDates={(range) => setSelectedRange(range)}
          onBook={handleBookNow} // Use the new handler
        />

        {/* Confirmation Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {selectedRange && selectedRange.length === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold font-headings uppercase">
                Confirm Your Booking
              </h2>
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
                  className="font-headings px-4 py-2 rounded-md border hover:bg-gray-100 transition uppercase"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="font-headings px-4 py-2 rounded-md bg-cta text-white hover:bg-cta-hover transition uppercase"
                  disabled={loading}
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Login/Register Modal */}
        <Modal isOpen={loginModal} onClose={() => setLoginModal(false)}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold font-headings uppercase">
              You must be logged in
            </h2>
            <p>Please log in or register to make a booking.</p>
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-md text-white transition uppercase"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/register')}
                className="px-4 py-2 rounded-md bg-gray-200 text-black! hover:bg-gray-300 transition uppercase"
              >
                Register
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
