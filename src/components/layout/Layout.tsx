import { Footer } from './Footer';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
