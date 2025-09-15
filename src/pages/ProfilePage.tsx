import { useEffect, useState } from 'react';
import { Bookings } from '../components/common/Bookings';
import { getProfile } from '../features/profile/services';
import type { TUser } from '../types/user';

export function ProfilePage() {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const name = localStorage.getItem('name');
      if (!name) {
        console.error('No username found');
        setLoading(false);
        return;
      }

      try {
        const user = await getProfile(name);
        setUser(user);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Profile not found</p>;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <img src={user.avatar.url} alt={user.avatar.alt} />
        <div>
          <ul>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
          </ul>
        </div>
      </div>
      <div>
        <h2>Your bookings</h2>
        <Bookings />
      </div>
    </div>
  );
}
