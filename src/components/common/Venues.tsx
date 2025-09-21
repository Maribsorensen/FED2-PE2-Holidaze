import { useEffect, useState } from 'react';
import type { TVenue } from '../../types/venue';
import { getVenuesForUser } from '../../features/venues/services';
import { VenueCard } from './VenueCard';

type VenuesProps = {
  userName: string;
};

export function Venues({ userName }: VenuesProps) {
  const [venues, setVenues] = useState<TVenue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVenues() {
      try {
        const venuesData = await getVenuesForUser(userName);
        setVenues(venuesData);
      } catch (err) {
        console.error('Failed to fetch venues', err);
      } finally {
        setLoading(false);
      }
    }
    loadVenues();
  }, [userName]);

  if (loading) return <p>Loading venues...</p>;
  if (!venues.length) return <p>You have not created any venues yet.</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </ul>
  );
}
