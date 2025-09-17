import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { VenueListPage } from './pages/VenueListPage';
import { VenuePage } from './pages/VenuePage';
import { ProfilePage } from './pages/ProfilePage';
import { CreateVenuePage } from './pages/CreateVenuePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/venues" element={<VenueListPage />} />
        <Route path="/venues/:id" element={<VenuePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-venue" element={<CreateVenuePage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
