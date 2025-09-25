import { useState } from 'react';
import type { TVenue } from '../../types/venue';
import HolidazeLogo from '../../assets/Holidaze-logo.png';

/**
 * VenueGallery component displays a gallery of images for a venue.
 *
 * If the venue has media images, it displays them with a main selected image
 * and smaller thumbnails. Hovering over a thumbnail updates the main image.
 * If no media images are provided, a default placeholder image is shown.
 *
 * @param {Object} props - Component props.
 * @param {TVenue} props.venue - The venue object containing media information and name.
 *
 * @example
 * <VenueGallery venue={venue} />
 */

type VenueImagesProps = {
  venue: TVenue;
};

export function VenueGallery({ venue }: VenueImagesProps) {
  const images =
    Array.isArray(venue.media) && venue.media.length > 0
      ? venue.media
      : [{ url: HolidazeLogo, alt: venue.name }];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="md:col-span-2">
        <img
          src={selectedImage.url}
          alt={selectedImage.alt || 'Venue image'}
          className="w-full h-[400px] object-cover transition-all"
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-3 gap-2 h-[400px]">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={img.alt || `Venue image ${index + 1}`}
            className="w-full h-full object-cover cursor-pointer hover:opacity-80"
            onMouseEnter={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
