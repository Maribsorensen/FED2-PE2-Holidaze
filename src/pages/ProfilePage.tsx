import { useEffect, useState } from 'react';
import { Bookings } from '../components/common/Bookings';
import { getProfile } from '../features/profile/services';
import type { TUser } from '../types/user';
import { updateAvatar } from '../features/profile/UpdateAvatar';
import Modal from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { createVenue } from '../features/venues/services';
import VenueForm from '../components/common/VenueForm';

export function ProfilePage() {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarAlt, setAvatarAlt] = useState('');

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

  const handleSaveAvatar = async () => {
    if (!user) return;
    try {
      const updatedUser = await updateAvatar(user.name, {
        url: avatarUrl,
        alt: avatarAlt,
      });

      setUser(updatedUser);
      setIsAvatarModalOpen(false);
      setAvatarUrl('');
      setAvatarAlt('');
    } catch (err) {
      console.error('Failed to update avatar', err);
    }
  };

  const handleCreateVenue = async (data: Partial<TUser>) => {
    try {
      await createVenue(data);
      setIsVenueModalOpen(false);
    } catch (err) {
      console.error('Failed to create venue', err);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Profile not found</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-auto mt-10">
      <div className="grid grid-cols-2 items-center">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar.url}
            alt={user.avatar.alt}
            className="w-46 h-46 rounded-full object-cover mb-2"
          />
          <Button onClick={() => setIsAvatarModalOpen(true)}>
            Change avatar
          </Button>
        </div>
        <div>
          <ul>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
          </ul>
        </div>
      </div>

      {user.venueManager && (
        <div className="mt-6">
          <Button onClick={() => setIsVenueModalOpen(true)}>
            Create Venue
          </Button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-headings font-semibold mb-2 uppercase">
          Your bookings
        </h2>
        {user && <Bookings userName={user.name} />}
      </div>
      <Modal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
      >
        <h2 className="text-lg font-headings font-semibold uppercase mb-4">
          Update Avatar
        </h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Image URL"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="border rounded-lg p-2 font-body"
          />
          <input
            type="text"
            placeholder="Alt text"
            value={avatarAlt}
            onChange={(e) => setAvatarAlt(e.target.value)}
            className="border rounded-lg p-2 font-body"
          />
          <div className="flex justify-center gap-2 mt-4">
            <Button onClick={() => setIsAvatarModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAvatar}>Save</Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isVenueModalOpen}
        onClose={() => setIsVenueModalOpen(false)}
      >
        <h2 className="text-lg font-headings font-semibold uppercase mb-4">
          Create Venue
        </h2>
        <VenueForm onSubmit={handleCreateVenue} />
      </Modal>
    </div>
  );
}
