import { Button } from '../common/Button';

/**
 * BookingSummary component displays a summary of the booking details.
 *
 * Features:
 * - Shows the selected date range and calculates the number of nights.
 * - Displays current number of guests and allows modifying it (up to `maxGuests`).
 * - Calculates and displays the total price for the stay.
 * - Provides a button to confirm the booking.
 *
 * @param {Object} props - Component props.
 * @param {Date[] | null} props.selectedRange - Array containing start and end dates of the booking.
 * @param {number} props.guests - Current number of guests.
 * @param {number} props.maxGuests - Maximum number of guests allowed.
 * @param {number} props.pricePerNight - Price per night for the booking.
 * @param {(g: number) => void} props.onChangeGuests - Callback when the number of guests changes.
 * @param {(range: Date[]) => void} props.onChangeDates - Callback when the date range changes.
 * @param {() => void} props.onBook - Callback to handle booking action.
 *
 * @example
 * <BookingSummary
 *   selectedRange={[new Date('2025-10-01'), new Date('2025-10-05')]}
 *   guests={2}
 *   maxGuests={5}
 *   pricePerNight={120}
 *   onChangeGuests={(g) => console.log(g)}
 *   onChangeDates={(range) => console.log(range)}
 *   onBook={() => console.log('Booked!')}
 * />
 *
 * @returns {JSX.Element | null} The rendered booking summary component, or null if no dates are selected.
 */

interface BookingSummaryProps {
  selectedRange: Date[] | null;
  guests: number;
  maxGuests: number;
  pricePerNight: number;
  onChangeGuests: (g: number) => void;
  onChangeDates: (range: Date[]) => void;
  onBook: () => void;
}

export function BookingSummary({
  selectedRange,
  guests,
  maxGuests,
  pricePerNight,
  onChangeGuests,
  onChangeDates,
  onBook,
}: BookingSummaryProps) {
  if (!selectedRange || selectedRange.length !== 2) return null;

  const [fromDate, toDate] = selectedRange;
  const nights = Math.ceil(
    (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-4 border rounded-md bg-gray-50 shadow-md space-y-4 mt-4">
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Dates:</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={fromDate.toISOString().split('T')[0]}
            onChange={(e) => onChangeDates([new Date(e.target.value), toDate])}
            className="border p-2 rounded-md flex-1"
          />
          <span className="self-center">→</span>
          <input
            type="date"
            value={toDate.toISOString().split('T')[0]}
            onChange={(e) =>
              onChangeDates([fromDate, new Date(e.target.value)])
            }
            className="border p-2 rounded-md flex-1 font-body"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold font-body">Guests:</label>
        <select
          value={guests}
          onChange={(e) => onChangeGuests(Number(e.target.value))}
          className="border p-2 rounded-md w-full mt-1"
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'guest' : 'guests'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <strong className="font-body">Total:</strong> ${nights * pricePerNight}
      </div>

      <Button onClick={onBook} className="w-full">
        Book Now
      </Button>
    </div>
  );
}
