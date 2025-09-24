import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

interface BookingActionsMenuProps {
  onUpdate: () => void;
  onDelete: () => void;
}

export function BookingActionsMenu({
  onUpdate,
  onDelete,
}: BookingActionsMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-right">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1 bg-white/80 rounded-full hover:bg-white"
      >
        <FaEllipsisV />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-md z-10">
          <button
            className="w-full px-3 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              onUpdate();
              setOpen(false);
            }}
          >
            Edit
          </button>
          <button
            className="w-full px-3 py-2 text-left text-red-600 hover:bg-gray-100"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
