import { useState } from "react";
import type { TVenue } from "../../types/venue";

type venueImages = {
    venue: TVenue;
};

export function VenueGallery ({ venue }: venueImages) {
    const images = Array.isArray(venue.media) ? venue.media : [venue.media];
    const [selectedImage, setSelectedImage] = useState(images[0]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="md:col-span-2">
        <img
          src={selectedImage.url}
          alt={selectedImage.alt || "Venue image"}
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
    )
}