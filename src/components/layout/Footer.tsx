export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div>
        <div>&copy; Holidaze {new Date().getFullYear()}</div>
        <div>
          <a href="https://facebook.com">Facebook</a>
          <a href="https://instagram.com">Instagram</a>
          <a href="https://twitter.com">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
