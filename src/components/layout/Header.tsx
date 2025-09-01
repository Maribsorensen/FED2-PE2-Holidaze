import { FaUser } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-primary text-white font-headings text-tranform: uppercase">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div>Logo</div>
        <ul className="flex gap-4">
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
        <div>
          <FaUser className="text"></FaUser>
          <ul>
            <li>
              <NavLink to="/login" className="hover:underline">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="hover:underline">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
