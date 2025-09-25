import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

/**
 * BookingActionsMenu component provides a dropdown menu with actions to update or delete a booking.
 *
 * Features:
 * - Displays a button with three vertical dots.
 * - Toggles a dropdown menu with "Edit" and "Delete" options.
 * - Calls the provided callback functions when the respective options are clicked.
 *
 * @param {Object} props - Component props.
 * @param {() => void} props.onUpdate - Callback function triggered when the "Edit" option is clicked.
 * @param {() => void} props.onDelete - Callback function triggered when the "Delete" option is clicked.
 *
 * @example
 * <BookingActionsMenu
 *   onUpdate={() => console.log('Edit clicked')}
 *   onDelete={() => console.log('Delete clicked')}
 * />
 *
 * @returns {JSX.Element} The rendered booking actions menu component.
 */

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
