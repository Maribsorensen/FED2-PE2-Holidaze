/**
 * GuestInput Component
 *
 * A reusable input component for selecting the number of guests.
 * Includes validation to ensure the number of guests does not exceed the maximum allowed.
 *
 * Props:
 * - guests: Current number of guests.
 * - maxGuests: Maximum number of guests allowed.
 * - onChange: Function to handle changes to the number of guests.
 * @param {Object} props - Component props.
 * @param {number} props.guests - Current number of guests.
 * @param {number} props.maxGuests - Maximum number of guests allowed.
 */

interface GuestInputProps {
  guests: number;
  maxGuests: number;
  onChange: (value: number) => void;
}

export function GuestInput({ guests, maxGuests, onChange }: GuestInputProps) {
  return (
    <div className="flex flex-col space-y-1 mt-4">
      <label className="font-semibold">Number of Guests</label>
      <input
        type="number"
        min={1}
        max={maxGuests}
        value={guests}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border p-2 rounded-md w-full"
      />
      <small className="text-gray-500">Max guests: {maxGuests}</small>
    </div>
  );
}
