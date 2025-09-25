import { Button } from '../common/Button';

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
      {/* Date selection */}
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
            className="border p-2 rounded-md flex-1"
          />
        </div>
      </div>

      {/* Guests dropdown */}
      <div className="flex flex-col">
        <label className="font-semibold">Guests:</label>
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

      {/* Total */}
      <div>
        <strong>Total:</strong> ${nights * pricePerNight}
      </div>

      {/* Book button */}
      <Button onClick={onBook} className="w-full">
        Book Now
      </Button>
    </div>
  );
}
