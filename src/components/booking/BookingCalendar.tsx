import Calendar from 'react-calendar';
import './calendar-custom.css';

/**
 * BookingCalendar component renders a calendar for selecting a date range for bookings.
 *
 * Features:
 * - Allows users to select a single date or a range of dates.
 * - Disables dates that are already booked.
 * - Calls the `onChange` callback whenever the selected date range changes.
 *
 * @param {Object} props - Component props.
 * @param {Date[]} [props.disabledDates] - Optional array of dates to disable (already booked dates).
 * @param {(range: Date[] | null) => void} props.onChange - Callback function called with the selected date range or null.
 *
 * @example
 * <BookingCalendar
 *   disabledDates={[new Date('2025-10-10'), new Date('2025-10-11')]}
 *   onChange={(range) => console.log(range)}
 * />
 *
 * @returns {JSX.Element} The rendered booking calendar component.
 */

interface BookingCalendarProps {
  disabledDates?: Date[];
  onChange: (range: Date[] | null) => void;
}

export function BookingCalendar({
  disabledDates = [],
  onChange,
}: BookingCalendarProps) {
  const isDateDisabled = (date: Date) =>
    disabledDates.some(
      (disabled) =>
        date.getFullYear() === disabled.getFullYear() &&
        date.getMonth() === disabled.getMonth() &&
        date.getDate() === disabled.getDate()
    );

  return (
    <div className="p-6 rounded-2xl max-w-3xl mx-auto border shadow-md bg-white space-y-4">
      <Calendar
        selectRange
        onChange={(value) => {
          if (Array.isArray(value)) {
            onChange(value as Date[]);
          } else if (value) {
            onChange([value as Date]);
          } else {
            onChange(null);
          }
        }}
        tileDisabled={({ date }) => isDateDisabled(date)}
        minDate={new Date()}
        className="custom-calendar"
      />
    </div>
  );
}
