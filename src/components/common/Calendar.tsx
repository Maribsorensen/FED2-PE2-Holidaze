import { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar-custom.css';
import { Button } from './Button';

interface BookingCalendarProps {
  disabledDates?: Date[];
}

export function BookingCalendar({ disabledDates = [] }: BookingCalendarProps) {
  const [selectedRange, setSelectedRange] = useState<Date[] | null>(null);

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
        onChange={(value: Date | Date[] | null) => {
          if (Array.isArray(value)) setSelectedRange(value);
          else if (value) setSelectedRange([value]);
          else setSelectedRange(null);
        }}
        tileDisabled={({ date }) => isDateDisabled(date)}
        minDate={new Date()}
        className="custom-calendar"
      />

      <Button
        className="w-full"
        onClick={() => {
          if (selectedRange && selectedRange.length === 2) {
            alert(
              `Booking from ${selectedRange[0].toDateString()} → ${selectedRange[1].toDateString()}`
            );
          } else {
            alert('Please select a date range');
          }
        }}
      >
        Book selected dates
      </Button>
    </div>
  );
}
