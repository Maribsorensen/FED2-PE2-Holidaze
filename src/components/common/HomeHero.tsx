import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

/**
 * HomeHero component renders a hero section with a background image, overlay text, and a call-to-action button.
 * Features:
 * - Full-width responsive background image.
 * - Semi-transparent overlay for better text visibility.
 * - Centered heading, subheading, and button.
 * - Uses Tailwind CSS for styling.
 * @example
 * <HomeHero />
 * @returns {JSX.Element} The HomeHero component.
 */

export function HomeHero() {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden h-[500px] md:h-[600px]">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80"
        alt="Holiday destination"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
        <h1 className="font-headings text-4xl md:text-6xl text-white uppercase mb-4">
          Welcome to Holidaze
        </h1>
        <p className="font-body text-white text-lg md:text-2xl max-w-xl">
          Discover amazing venues, plan your perfect getaway, and create
          unforgettable memories.
        </p>
        <Button className="mt-6" onClick={() => navigate('/venues')}>
          Browse Venues
        </Button>
      </div>
    </div>
  );
}
