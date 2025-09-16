import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { TVenue } from '../types/venue';
import { VenueGallery } from '../components/common/VenueGallery';
import type { TBookings } from '../types/bookings';
import { BookingCalendar } from '../components/common/Calendar';

export function VenuePage() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<TVenue | null>(null);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`
        );

        const json = await res.json();
        setVenue(json.data);
      } catch (error) {
        console.error('Error fetching venue:', error);
      }
    }
    fetchVenue();
  }, [id]);

  if (!venue) {
    return <p>Cannot find venue...</p>;
  }

  const disabledDates: Date[] =
    venue.bookings?.flatMap((booking: TBookings) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);

      const dates: Date[] = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      return dates;
    }) || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-auto mt-10">
      <h1 className="font-headings uppercase text-xl text-center m-4">
        {venue.name}
      </h1>
      <VenueGallery venue={venue} />
      <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr] gap-5">
        <div className="flex flex-col">
          <h2 className="font-headings uppercase">Description</h2>
          <p className="font-body">{venue.description}</p>
        </div>
        <div>
          <h2 className="font-headings uppercase">Specifications</h2>
          <ul className="font-body space-y-2">
            <li className="flex justify-between border-b border-gray-300 pb-1">
              <span>Guests:</span>
              <span>{venue.maxGuests}</span>
            </li>
            <li className="flex justify-between border-b border-gray-300 pb-1">
              <span>Price per night:</span>
              <span>{venue.price} $</span>
            </li>
            <li className="flex justify-between border-b border-gray-300 pb-1">
              <span>Pets:</span>
              <span>{venue.meta.pets ? 'Yes' : 'No'}</span>
            </li>
            <li className="flex justify-between border-b border-gray-300 pb-1">
              <span>Wifi:</span>
              <span>{venue.meta.wifi ? 'Yes' : 'No'}</span>
            </li>
            <li className="flex justify-between border-b border-gray-300 pb-1">
              <span>Breakfast:</span>
              <span>{venue.meta.breakfast ? 'Yes' : 'No'}</span>
            </li>
            <li className="flex justify-between pb-1">
              <span>Parking:</span>
              <span>{venue.meta.parking ? 'Yes' : 'No'}</span>
            </li>
          </ul>
        </div>
      </div>
      <BookingCalendar disabledDates={disabledDates} />
    </div>
  );
}
