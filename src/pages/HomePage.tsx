import { useEffect, useState } from 'react';
import { HomeHero } from '../components/common/HomeHero';
import type { TVenue } from '../types/venue';
import { getVenues } from '../features/venues/services';
import { VenueCard } from '../components/venue/VenueCard';
import { usePageMeta } from '../hooks/usePageMeta';

export function HomePage() {
  const [venues, setVenues] = useState<TVenue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVenues(4, 1, 'created', 'desc')
      .then((data) => setVenues(data.data))
      .finally(() => setLoading(false));
  }, []);
  usePageMeta();
  return (
    <div>
      <HomeHero />

      {/* Featured Venues */}
      <section className="py-16 bg-background text-center">
        <h2 className="font-headings text-3xl mb-6">Featured Venues</h2>

        {loading ? (
          <p>Loading venues...</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
