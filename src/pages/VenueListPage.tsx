import { VenueCard } from '../components/venue/VenueCard';
import { SearchBar } from '../components/common/SearchBar';
import { useEffect, useState } from 'react';
import { useSearchVenues, useVenues } from '../features/venues/useVenues';
import { SkeletonCardGrid } from '../components/common/LoadingSkeleton';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * Custom hook that debounces a value by a specified delay.
 *
 * @template T
 * @param {T} value - The value to debounce.
 * @param {number} [delay=500] - Delay in milliseconds before updating the debounced value.
 * @returns {T} The debounced value.
 */

function useDebouncedValue<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Venue list page component.
 *
 * Displays a searchable and sortable list of venues.
 * Supports pagination, loading states, and error handling.
 * Utilizes a debounced search input to avoid excessive API calls.
 *
 * @returns {JSX.Element} The rendered venue list page component.
 */

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
  usePageMeta();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-auto mt-10">
      <h1 className="font-headings uppercase text-3xl md:text-4xl text-center mb-8">
        Venues
      </h1>

      {/* Search and Sorting */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <select
          value={sortOption}
          onChange={(e) =>
            setSortOption(e.target.value as 'newest' | 'alphabetical')
          }
          className="border border-gray-300 p-2 rounded shadow-sm"
        >
          <option value="newest">Newest</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      {/* Loading / Error */}
      {loading && <SkeletonCardGrid count={8} />}
      {error && (
        <p className="text-cta text-center font-body text-lg my-8">
          Error: {error}
        </p>
      )}

      {/* Venue List */}
      {!loading && venues.length > 0 && (
        <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </ul>
      )}
      {!loading && venues.length === 0 && (
        <p className="text-gray-600 text-center mt-8">No venues found.</p>
      )}

      {/* Pagination */}
      {meta && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={meta.isFirstPage}
            className="px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-primary/80 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2 text-gray-700 font-medium">
            Page {meta.currentPage} of {meta.pageCount}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={meta.isLastPage}
            className="px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-primary/80 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
