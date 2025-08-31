import { Footer } from './Footer';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] gap-4 bg-background">
      <Header />
      <main className="max-w-screen-xl mx-auto w-full px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
