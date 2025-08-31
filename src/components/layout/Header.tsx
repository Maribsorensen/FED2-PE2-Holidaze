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
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
