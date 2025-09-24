import { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearToken, getToken } from '../../lib/auth';
import toast from 'react-hot-toast';

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
            <ul className="absolute right-0 mt-2 bg-white text-primary rounded shadow-lg flex flex-col min-w-[120px]">
              <li
                className="px-4 py-2 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                <NavLink to="/login">Login</NavLink>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          )}

          {token && dropdownOpen && (
            <ul className="absolute right-0 mt-2 bg-white text-primary rounded shadow-lg flex flex-col min-w-[120px]">
              <li
                className="px-4 py-2 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                <NavLink to="/profile">Profile</NavLink>
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
