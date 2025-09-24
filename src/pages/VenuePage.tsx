import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { TVenue } from '../types/venue';
import { VenueGallery } from '../components/venue/VenueGallery';
import { BookingSection } from '../components/booking/BookingSection';
import { getSingleVenue } from '../features/venues/services';
import { safeAsync } from '../lib/safeAsync';

export function VenuePage() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<TVenue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No venue ID provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    safeAsync(
      () => getSingleVenue(id),
      () => setError('Failed to fetch venue')
    )
      .then((data) => {
        if (data) setVenue(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading venue...</p>;
  if (error) return <p className="text-cta">{error}</p>;
  if (!venue) return <p>Cannot find venue...</p>;

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
      <BookingSection venue={venue} />
    </div>
  );
}
