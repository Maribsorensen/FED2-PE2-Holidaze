import { useEffect, useState } from 'react';
import { Bookings } from '../components/profile/ProfileBookings';
import { getProfile } from '../features/profile/services';
import type { TUser } from '../types/user';
import { updateAvatar } from '../features/profile/UpdateAvatar';
import Modal from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { createVenue } from '../features/venues/services';
import VenueForm from '../components/venue/VenueForm';
import { Venues } from '../components/profile/ProfileVenues';
import { safeAsync } from '../lib/safeAsync';
import { SkeletonProfile } from '../components/common/LoadingSkeleton';
import toast from 'react-hot-toast';
import { usePageMeta } from '../hooks/usePageMeta';
import { ManagerBookings } from '../components/profile/ProfileManagerBookings';

/**
 * Profile page component.
 *
 * Displays user profile information, including avatar, name, and email.
 * Shows different tabs for:
 *  - User's bookings
 *  - User's venues (if they are a venue manager)
 *  - Bookings for user's managed venues (if applicable)
 *
 * Users can:
 *  - Update their avatar
 *  - Create new venues (venue managers only)
 *
 * Handles async API calls for fetching profile data, updating avatars, and creating venues.
 * Displays loading state and errors when relevant.
 *
 * @returns {JSX.Element} The rendered profile page component.
 */

export function ProfilePage() {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarAlt, setAvatarAlt] = useState('');

  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'bookings' | 'venues' | 'managerBookings'
  >('bookings');
  usePageMeta();
  useEffect(() => {
    async function fetchProfile() {
      const name = localStorage.getItem('name');
      if (!name) {
        setError('No username found');
        setLoading(false);
        return;
      }

      const fetchedUser = await safeAsync(
        () => getProfile(name),
        () => setError('Failed to fetch profile')
      );
      if (fetchedUser) setUser(fetchedUser);
      setLoading(false);
    }

    fetchProfile();
  }, []);

  const handleSaveAvatar = async () => {
    if (!user) return;
    const updatedUser = await safeAsync(
      () => updateAvatar(user.name, { url: avatarUrl, alt: avatarAlt }),
      () => setError('Failed to update avatar')
    );
    if (!updatedUser) return;

    setUser(updatedUser);
    setIsAvatarModalOpen(false);
    setAvatarUrl('');
    setAvatarAlt('');
  };

  const handleCreateVenue = async (data: Partial<TUser>) => {
    const created = await safeAsync(
      () => createVenue(data),
      () => setError('Failed to create venue')
    );
    if (!created) return;

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-fade-in' : 'animate-fade-out'
        } bg-cta text-white px-6 py-3 rounded shadow-lg z-50`}
      >
        Venue "{created.name}" created successfully
      </div>
    ));
    window.dispatchEvent(new CustomEvent('venueCreated', { detail: created }));

    setIsVenueModalOpen(false);
  };

  if (loading) return <SkeletonProfile />;
  if (!user) return <p>{error || 'Profile not found'}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-auto mt-10">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-center md:gap-6 mb-8">
        <div className="flex flex-col items-center text-center sm:text-left">
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
        {user.venueManager && (
          <button
            className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
              activeTab === 'managerBookings'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-gray-500 hover:text-primary'
            }`}
            onClick={() => setActiveTab('managerBookings')}
          >
            Bookings for My Venues
          </button>
        )}
      </div>

      {/* Content */}
      {activeTab === 'bookings' && <Bookings userName={user.name} />}
      {activeTab === 'venues' && user.venueManager && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <Button onClick={() => setIsVenueModalOpen(true)}>
              Create Venue
            </Button>
          </div>
          <Venues userName={user.name} />
        </div>
      )}
      {activeTab === 'managerBookings' && user.venueManager && (
        <ManagerBookings userName={user.name} />
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
