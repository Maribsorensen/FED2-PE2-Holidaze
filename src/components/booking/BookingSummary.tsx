import { Button } from '../common/Button';

interface BookingSummaryProps {
  selectedRange: Date[] | null;
  guests: number;
  maxGuests: number;
  pricePerNight: number;
  onBook: () => void;
}

export function BookingSummary({
  selectedRange,
  guests,
  maxGuests,
  pricePerNight,
  onBook,
}: BookingSummaryProps) {
  if (!selectedRange || selectedRange.length !== 2) return null;

  const nights = Math.ceil(
    (selectedRange[1].getTime() - selectedRange[0].getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-4 border rounded-md bg-gray-50 shadow-md space-y-2 mt-4">
      <p>
        <strong>Dates:</strong> {selectedRange[0].toDateString()} →{' '}
        {selectedRange[1].toDateString()}
      </p>
      <p>
        <strong>Guests:</strong> {guests} / {maxGuests}
      </p>
      <p>
        <strong>Total:</strong> ${nights * pricePerNight}
      </p>
      <Button onClick={onBook} className="w-full">
        Book Now
      </Button>
    </div>
  );
}
