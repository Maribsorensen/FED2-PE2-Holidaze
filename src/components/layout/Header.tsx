import { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearToken, getToken } from '../../lib/auth';

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();
  const token = getToken();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    clearToken();
    setDropdownOpen(false);
    setToast(true);
    navigate('/login');
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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
      {toast && (
        <div className="fixed top-4 right-4 bg-cta text-white px-4 py-2 rounded shadow-lg animate-fade">
          Logged out successfully
        </div>
      )}
      <style>{`
        @keyframes fade {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade {
          animation: fade 3s forwards;
        }
      `}</style>
    </header>
  );
}
