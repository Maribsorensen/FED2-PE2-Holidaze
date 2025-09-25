import { AppToaster } from '../common/Toaster';
import { Footer } from './Footer';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

/**
 * Layout component that structures the main layout of the application.
 *
 * Features:
 * - Renders a header at the top of the page.
 * - Contains a main content area that renders child routes via React Router's `Outlet`.
 * - Displays a footer at the bottom of the page.
 * - Integrates a global toaster for notifications (`AppToaster`).
 * - Uses a CSS grid layout to ensure the footer stays at the bottom of the viewport.
 * - Responsive design with maximum width constraints for the main content area.
 *
 * @component
 * @example
 * <Layout>
 *   <Outlet />
 * </Layout>
 *
 * @returns {JSX.Element} The Layout component.
 */

export function Layout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] gap-4 bg-background">
      <Header />
      <main className="max-w-screen-xl mx-auto w-full px-4">
        <Outlet />
      </main>
      <AppToaster />
      <Footer />
    </div>
  );
}
