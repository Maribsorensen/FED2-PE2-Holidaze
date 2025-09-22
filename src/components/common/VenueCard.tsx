import { Link } from 'react-router-dom';
import type { TVenue } from '../../types/venue';
import { FaMapMarkerAlt } from 'react-icons/fa';

type VenueCardProps = {
  venue: TVenue;
  actions?: React.ReactNode;
};

export function VenueCard({ venue, actions }: VenueCardProps) {
  const image =
    Array.isArray(venue.media) && venue.media.length > 0
      ? venue.media[0]
      : {
          url: 'https://via.placeholder.com/400x300?text=No+Image',
          alt: venue.name,
        };

  return (
    <li className="relative rounded-md overflow-hidden shadow-lg">
      <Link to={`/venues/${venue.id}`}>
        <img
          src={image.url}
          alt={image.alt || venue.name}
          className="w-full h-64 object-cover"
        />
        <span className="absolute top-2 left-2 bg-cta text-white text-xs font-semibold px-2 py-1 rounded-sm shadow">
          {venue.rating.toFixed(1)}
        </span>
        <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 px-3 h-1/3">
          <h2 className="text-md uppercase font-headings">{venue.name}</h2>
          <p className="flex items-center gap-1 text-xs uppercase font-headings absolute bottom-2">
            <FaMapMarkerAlt className="text-cta" />
            {venue.location.city}, {venue.location.country}
          </p>
        </div>
      </Link>

      {actions && (
        <div className="absolute top-2 right-2 flex gap-2">{actions}</div>
      )}
    </li>
  );
}
