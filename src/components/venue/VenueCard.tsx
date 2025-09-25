import { Link } from 'react-router-dom';
import type { TVenue } from '../../types/venue';
import { FaMapMarkerAlt } from 'react-icons/fa';
import HolidazeLogo from '../../assets/Holidaze-logo.png';

/**
 * VenueCard component displays a card view of a venue with image, name, location, and rating.
 *
 * Features:
 * - Displays the first media image, or a default placeholder if none is available.
 * - Shows venue name and location (city, country).
 * - Displays the venue rating in the top-left corner.
 * - Optional `actions` prop allows rendering action buttons (e.g., edit, delete) on the top-right corner.
 *
 * @param {Object} props - Component props.
 * @param {TVenue} props.venue - The venue object containing details like `id`, `name`, `media`, `rating`, and `location`.
 * @param {React.ReactNode} [props.actions] - Optional action buttons to display on the card.
 *
 * @example
 * <VenueCard venue={venue} actions={<EditButton />} />
 */

type VenueCardProps = {
  venue: TVenue;
  actions?: React.ReactNode;
};

export function VenueCard({ venue, actions }: VenueCardProps) {
  const image =
    Array.isArray(venue.media) && venue.media.length > 0
      ? venue.media[0]
      : {
          url: HolidazeLogo,
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
