import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { TVenue } from '../types/venue';
import { VenueGallery } from '../components/venue/VenueGallery';
import { BookingSection } from '../components/booking/BookingSection';
import { getSingleVenue } from '../features/venues/services';
import { safeAsync } from '../lib/safeAsync';
import { SkeletonVenuePage } from '../components/common/LoadingSkeleton';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * Venue page component.
 *
 * Displays detailed information about a specific venue, including:
 *  - Gallery of images
 *  - Description
 *  - Specifications (guests, price, amenities)
 *  - Booking section
 *
 * Fetches venue data asynchronously based on the `id` URL parameter.
 * Handles loading and error states and displays fallback messages if the venue is not found.
 *
 * @returns {JSX.Element} The rendered venue page component.
 */

export function VenuePage() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<TVenue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  usePageMeta({
    title: venue ? `${venue.name} - Holidaze` : 'Loading...',
    description: venue ? `Details and bookings for ${venue.name}` : undefined,
  });
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

  if (loading) return <SkeletonVenuePage />;
  if (error)
    return (
      <p className="text-cta text-center font-body text-lg py-10">{error}</p>
    );
  if (!venue)
    return (
      <p className="text-gray-600 text-center font-body text-lg py-10">
        Cannot find venue...
      </p>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-auto mt-10">
      <h1 className="font-headings uppercase text-4xl md:text-5xl text-center mb-8">
        {venue.name}
      </h1>

      {/* Gallery */}
      <VenueGallery venue={venue} />

      {/* Description & Specs */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 mt-10">
        {/* Description */}
        <div>
          <h2 className="font-headings uppercase text-2xl mb-4">Description</h2>
          <p className="font-body text-gray-700 leading-relaxed">
            {venue.description}
          </p>
        </div>

        {/* Specifications */}
        <div>
          <h2 className="font-headings uppercase text-2xl mb-4">
            Specifications
          </h2>
          <ul className="font-body text-gray-700 border border-gray-200 rounded overflow-hidden">
            {[
              ['Guests', venue.maxGuests],
              ['Price per day', `${venue.price} $`],
              ['Pets', venue.meta.pets ? 'Yes' : 'No'],
              ['Wifi', venue.meta.wifi ? 'Yes' : 'No'],
              ['Breakfast', venue.meta.breakfast ? 'Yes' : 'No'],
              ['Parking', venue.meta.parking ? 'Yes' : 'No'],
            ].map(([label, value], index) => (
              <li
                key={label}
                className={`flex justify-between px-4 py-2 ${
                  index % 2 === 0 ? 'bg-gray-50' : ''
                } border-b border-gray-200`}
              >
                <span className="font-semibold">{label}:</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Booking Section */}
      <div className="mt-12">
        <BookingSection venue={venue} />
      </div>
    </div>
  );
}
