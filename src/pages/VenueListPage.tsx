import { VenueCard } from '../components/common/VenueCard';
import { SearchBar } from '../components/common/SearchBar';
import { useEffect, useState } from 'react';
import { useSearchVenues, useVenues } from '../features/venues/useVenues';
import { SkeletonCardGrid } from '../components/common/LoadingSkeleton';

function useDebouncedValue<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function VenueListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 500);
  const [sortOption, setSortOption] = useState<'newest' | 'alphabetical'>(
    'newest'
  );

  const PAGE_SIZE = 50;
  const sortField = sortOption === 'newest' ? 'created' : 'name';
  const sortOrder = sortOption === 'newest' ? 'desc' : 'asc';
  const venuesData = useVenues(PAGE_SIZE, page, sortField, sortOrder);
  const searchData = useSearchVenues(debouncedSearch, PAGE_SIZE, page);
  const venues = debouncedSearch ? searchData.venues : venuesData.venues;
  const meta = debouncedSearch ? undefined : venuesData.meta;
  const loading = debouncedSearch ? searchData.loading : venuesData.loading;
  const error = debouncedSearch ? searchData.error : venuesData.error;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-auto mt-10">
      <h1 className="font-headings uppercase text-xl text-center m-4">
        Venues
      </h1>

      {/* Search and sorting */}
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

      {/* Loading / error */}
      {loading && <SkeletonCardGrid count={8} />}
      {error && <p>Error: {error}</p>}

      {/* Venue list */}
      <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </ul>

      {/* Pagination only for normal (non-search) list */}
      {meta && (
        <div className="flex justify-center my-6 gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={meta.isFirstPage}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {meta.currentPage} of {meta.pageCount}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={meta.isLastPage}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
