import { VenueCard } from '../components/common/VenueCard';
import { SearchBar } from '../components/common/SearchBar';
import { useState } from 'react';
import { useVenues } from '../features/venues/useVenues';

export function VenueListPage() {
  const [page, setPage] = useState(1);
  const { venues, loading, error } = useVenues(50, page);

  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState<'newest' | 'alphabetical'>(
    'newest'
  );

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

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error: {error}</p>;

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

      <div className="flex justify-center my-6 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
