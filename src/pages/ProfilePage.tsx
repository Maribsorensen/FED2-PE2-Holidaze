import { useEffect, useState } from 'react';
import { Bookings } from '../components/common/Bookings';
import { getProfile } from '../features/profile/services';
import type { TUser } from '../types/user';
import { updateAvatar } from '../features/profile/UpdateAvatar';
import Modal from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { createVenue } from '../features/venues/services';
import VenueForm from '../components/common/VenueForm';
import { Venues } from '../components/common/Venues';

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
  type Tab = 'bookings' | 'venues';
  const [activeTab, setActiveTab] = useState<Tab>('bookings');
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
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-center md:gap-6 mb-8">
        <div className="flex flex-col items-center  text-center sm:text-left">
          <img
            src={user.avatar.url}
            alt={user.avatar.alt}
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-100 shadow"
          />
          <Button onClick={() => setIsAvatarModalOpen(true)}>
            Change Avatar
          </Button>
        </div>
        <div className="mt-6 sm:mt-0">
          <ul className="space-y-1 text-gray-700">
            <li>
              <span className="font-semibold">Name:</span> {user.name}
            </li>
            <li>
              <span className="font-semibold">Email:</span> {user.email}
            </li>
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
            activeTab === 'bookings'
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-gray-500 hover:text-primary'
          }`}
          onClick={() => setActiveTab('bookings')}
        >
          My Bookings
        </button>
        {user.venueManager && (
          <button
            className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
              activeTab === 'venues'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-gray-500 hover:text-primary'
            }`}
            onClick={() => setActiveTab('venues')}
          >
            My Venues
          </button>
        )}
      </div>

      {/* Content */}
      {activeTab === 'bookings' && (
        <div>{user && <Bookings userName={user.name} />}</div>
      )}

      {activeTab === 'venues' && user.venueManager && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <Button onClick={() => setIsVenueModalOpen(true)}>
              Create Venue
            </Button>
          </div>
          {user && <Venues userName={user.name} />}
        </div>
      )}

      {/* Avatar Modal */}
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
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setIsAvatarModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAvatar}>Save</Button>
          </div>
        </div>
      </Modal>

      {/* Venue Modal */}
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
