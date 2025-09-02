import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { TVenue } from '../types/venue';

export function VenuePage() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<TVenue | null>(null);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}`
        );
        const json = await res.json();
        setVenue(json.data);
      } catch (error) {
        console.error('Error fetching venue:', error);
      }
    }
    fetchVenue();
  }, [id]);

  if (!venue) {
    return <p>Loading venue details...</p>;
  }

  return (
    <div>
      <h1 className="font-headings text-transform: uppercase text-xl text-center m-4">
        {venue.name}
      </h1>
    </div>
  );
}
