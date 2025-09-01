import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-primary text-white">
      <nav>
        <div>Logo</div>
        <ul>
          <li>Home</li>
          <li>Venues</li>
        </ul>
        <div>
          Profile
          <ul>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
