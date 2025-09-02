import { useEffect, useState } from 'react';
import { VenueCard } from '../components/common/VenueCard';
import type { TVenue } from '../types/venue';
import { SearchBar } from '../components/common/SearchBar';

export function VenueListPage() {
  const [search, setSearch] = useState('');
  const [venues, setVenues] = useState<TVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchedVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase())
  );

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
      <h1 className="font-headings text-transform: uppercase text-xl text-center m-4">
        Venues
      </h1>
      <div className="text-center m-4">
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 ">
        {searchedVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </ul>
    </div>
  );
}
