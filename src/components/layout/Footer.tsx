import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6';

/**
 * Footer component that renders the bottom section of the application.
 *
 * Features:
 * - Displays the application name "Holidaze" with the current year.
 * - Includes social media icons linking to Facebook, Instagram, and Twitter.
 * - Responsive layout using flexbox for proper alignment on different screen sizes.
 * - Provides hover effects on social media icons for better user interaction.
 *
 * @component
 * @example
 * <Footer />
 *
 * @returns {JSX.Element} The Footer component.
 */

export function Footer() {
  return (
    <footer className="bg-primary text-white font-body py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm md:text-base">
          &copy; Holidaze {new Date().getFullYear()}
        </div>
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cta transition-colors"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cta transition-colors"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cta transition-colors"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
