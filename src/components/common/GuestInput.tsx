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
