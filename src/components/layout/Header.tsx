import { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearToken, getToken } from '../../lib/auth';
import toast from 'react-hot-toast';

/**
 * Header component that displays the top navigation bar and user options.
 *
 * Features:
 * - Shows the application name "Holidaze" linking to the home page.
 * - Navigation links to "Home" and "Venues".
 * - User icon toggles a dropdown menu.
 * - Dropdown menu changes based on authentication status:
 *   - Not authenticated: shows "Login" and "Register".
 *   - Authenticated: shows "Profile" and "Logout".
 * - Clicking "Logout" clears the authentication token, shows a toast notification, and redirects to the login page.
 * - Dropdown closes when clicking outside of it.
 *
 * @component
 * @example
 * <Header />
 *
 * @returns {JSX.Element} The Header component.
 */

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const token = getToken();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    clearToken();
    setDropdownOpen(false);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-fade-in' : 'animate-fade-out'
        } fixed top-1 right-6 bg-cta text-white px-4 py-2 rounded shadow-lg`}
      >
        Logged out successfully
      </div>
    ));
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-primary text-white font-headings uppercase relative">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <NavLink to="/" className="text-2xl">
          Holidaze
        </NavLink>

        <ul className="flex gap-2 md:gap-6">
          <li>
            <NavLink to="/" className="hover:underline">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/venues" className="hover:underline">
              Venues
            </NavLink>
          </li>
        </ul>

        <div className="relative" ref={dropdownRef}>
          <FaUser
            className="text-2xl cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {!token && dropdownOpen && (
            <ul className="absolute right-0 mt-2 bg-white text-primary rounded shadow-lg flex flex-col min-w-[120px] z-50">
              <li>
                <NavLink
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          )}

          {token && dropdownOpen && (
            <ul className="absolute right-0 mt-2 bg-white text-primary rounded shadow-lg flex flex-col text-center min-w-[120px] z-50">
              <li>
                <NavLink
                  to="/profile"
                  className="block w-full px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </NavLink>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
