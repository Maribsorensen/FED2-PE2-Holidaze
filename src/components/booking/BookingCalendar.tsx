import Calendar from 'react-calendar';
import './calendar-custom.css';

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
