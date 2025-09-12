import { useEffect, useState } from 'react';
import { VenueCard } from '../components/common/VenueCard';
import type { TVenue } from '../types/venue';
import { SearchBar } from '../components/common/SearchBar';

export function VenueListPage() {
  const [search, setSearch] = useState('');
  const [venues, setVenues] = useState<TVenue[]>([]);
  const [sortOption, setSortOption] = useState<'newest' | 'alphabetical'>(
    'newest'
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(
          'https://v2.api.noroff.dev/holidaze/venues?limit=100'
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
  const filteredVenues = venues
    .filter((venue) => venue.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      }
      if (sortOption === 'alphabetical') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  if (loading) {
    return <p>Loading venues...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="font-headings uppercase text-xl text-center m-4">
        Venues
      </h1>

      <div className="flex flex-col sm:flex-row justify-center gap-4 m-4">
        <SearchBar value={search} onChange={setSearch} />
        <select
          value={sortOption}
          onChange={(e) =>
            setSortOption(e.target.value as 'newest' | 'alphabetical')
          }
          className="border p-2 rounded"
        >
          <option value="newest">Newest</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
        {filteredVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </ul>
    </div>
  );
}
