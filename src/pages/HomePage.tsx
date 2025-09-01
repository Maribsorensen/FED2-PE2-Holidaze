import { useEffect, useState } from 'react';
import { VenueCard } from '../components/common/VenueCard';
import type { TVenue } from '../types/venue';

export function HomePage() {
  const [venues, setVenues] = useState<TVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(
          'https://v2.api.noroff.dev/holidaze/venues'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch venues');
        }
        const result = await response.json();
        setVenues(result.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  if (loading) {
    return <p>Loading venues...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Venues</h1>
      <ul>
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </ul>
    </div>
  );
}
