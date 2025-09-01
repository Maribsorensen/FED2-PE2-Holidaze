import { Link } from 'react-router-dom';
import type { TVenue } from '../../types/venue';
import { FaMapMarkerAlt } from 'react-icons/fa';

type VenueCardProps = {
  venue: TVenue;
};

export function VenueCard({ venue }: VenueCardProps) {
  const image =
    Array.isArray(venue.media) && venue.media.length > 0
      ? venue.media[0]
      : {
          url: 'https://via.placeholder.com/400x300?text=No+Image',
          alt: venue.name,
        };

  return (
    <li className="relative rounded-md overflow-hidden shadow-lg">
      <Link to={`/venue/${venue.id}`}>
        <img
          src={image.url}
          alt={image.alt || venue.name}
          className="w-full h-64 object-cover"
        />
        <span className="absolute top-2 left-2 bg-cta text-white text-xs font-semibold px-2 py-1 rounded-sm shadow">
          {venue.rating.toFixed(1)}
        </span>
        <div className="absolute bottom-0 w-full bg-black/50 text-white p-3">
          <h2 className="text-lg text-transform: uppercase font-headings">
            {venue.name}
          </h2>
          <p className="flex items-center gap-1 text-sm text-transform: uppercase font-headings">
            <FaMapMarkerAlt className="text-cta" />
            {venue.location.city}, {venue.location.country}
          </p>
        </div>
      </Link>
    </li>
  );
}
