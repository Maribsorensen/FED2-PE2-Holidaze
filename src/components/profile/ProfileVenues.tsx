import { useEffect, useState } from 'react';
import type { TVenue } from '../../types/venue';
import {
  createVenue,
  deleteVenue,
  editVenue,
  getVenuesForUser,
} from '../../features/venues/services';
import { VenueCard } from '../venue/VenueCard';
import Modal from '../common/Modal';
import VenueForm from '../venue/VenueForm';
import { safeAsync } from '../../lib/safeAsync';
import { SkeletonCardGrid } from '../common/LoadingSkeleton';
import toast from 'react-hot-toast';
import { FaEllipsisV } from 'react-icons/fa';

/**
 * Venues component displays a list of venues created by a specific user.
 *
 * Features:
 * - Fetches venues for the given `userName` on mount.
 * - Shows loading state, error messages, or a message if no venues exist.
 * - Renders each venue using the `VenueCard` component.
 * - Provides options to edit or delete each venue via a dropdown menu:
 *   - Edit opens a modal with `VenueForm` pre-filled with venue data.
 *   - Delete opens a confirmation modal before removing the venue.
 * - Allows creating new venues via the same `VenueForm` in a modal.
 * - Uses toast notifications for success/error feedback.
 *
 * Props:
 * - `userName` (string): The username whose venues should be fetched.
 *
 * @param {Object} props - Component props.
 * @param {string} props.userName - The username to fetch venues for.
 *
 * @example
 * <Venues userName="john_doe" />
 */

type VenuesProps = {
  userName: string;
};

export function Venues({ userName }: VenuesProps) {
  const [venues, setVenues] = useState<TVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openVenueId, setOpenVenueId] = useState<string | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<TVenue | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<TVenue | null>(null);

  useEffect(() => {
    async function loadVenues() {
      const data = await safeAsync(
        () => getVenuesForUser(userName),
        () => setError('Failed to fetch venues')
      );
      if (data) setVenues(data);
      setLoading(false);
    }
    loadVenues();

    const handleVenueCreated = (e: Event) => {
      const customEvent = e as CustomEvent<TVenue>;
      setVenues((prev) => [...prev, customEvent.detail]);
    };

    window.addEventListener('venueCreated', handleVenueCreated);
    return () => window.removeEventListener('venueCreated', handleVenueCreated);
  }, [userName]);

  const handleDeleteConfirm = async () => {
    if (!selectedVenue) return;

    const venueToDelete = selectedVenue;
    try {
      await deleteVenue(venueToDelete.id);
      setVenues((prev) => prev.filter((v) => v.id !== venueToDelete.id));
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-fade-in' : 'animate-fade-out'
          } bg-cta text-white px-6 py-3 rounded shadow-lg z-50`}
        >
          Venue "{venueToDelete.name}" deleted successfully
        </div>
      ));
    } catch (err) {
      toast.error('Failed to delete venue');
      console.error(err);
    } finally {
      setSelectedVenue(null);
      setIsDeleteOpen(false);
    }
  };

  const handleSaveEdit = async (data: Partial<TVenue>) => {
    if (!editingVenue) return;

    if (editingVenue.id) {
      const updated = await safeAsync(
        () => editVenue(editingVenue.id, data),
        () => toast.error('Failed to update venue')
      );

      if (updated) {
        setVenues((prev) =>
          prev.map((v) => (v.id === editingVenue.id ? { ...v, ...data } : v))
        );

        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-fade-in' : 'animate-fade-out'
            } bg-cta text-white px-6 py-3 rounded shadow-lg z-50`}
          >
            Venue updated successfully
          </div>
        ));

        setIsEditOpen(false);
        setEditingVenue(null);
      }
    } else {
      const created = await safeAsync(
        () => createVenue(data),
        () => toast.error('Failed to create venue')
      );

      if (created) {
        setVenues((prev) => [...prev, created]);
        setIsEditOpen(false);
        setEditingVenue(null);
      }
    }
  };

  const handleEdit = (venue: TVenue) => {
    setEditingVenue(venue);
    setIsEditOpen(true);
  };

  if (loading) return <SkeletonCardGrid count={6} />;
  if (error) return <p>{error}</p>;
  if (!venues.length) return <p>You have not created any venues yet.</p>;

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            actions={
              <div className="relative inline-block text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // toggle open menu for this venue
                    setOpenVenueId(openVenueId === venue.id ? null : venue.id);
                  }}
                  className="p-1 bg-white/80 rounded-full hover:bg-white"
                >
                  <FaEllipsisV />
                </button>

                {openVenueId === venue.id && (
                  <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-md z-10">
                    <button
                      className="w-full px-3 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        handleEdit(venue);
                        setOpenVenueId(null);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="w-full px-3 py-2 text-left text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedVenue(venue);
                        setIsDeleteOpen(true);
                        setOpenVenueId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            }
          />
        ))}
      </ul>

      {/* Create/Edit Venue Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingVenue(null);
        }}
      >
        <h2 className="text-lg font-semibold mb-4">
          {editingVenue && editingVenue.id ? 'Edit Venue' : 'Create Venue'}
        </h2>
        <VenueForm
          initialData={editingVenue || undefined}
          onSubmit={handleSaveEdit}
        />
      </Modal>

      {/* Delete Venue Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedVenue(null);
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Delete Venue</h2>
        <p className="mb-6">
          Are you sure you want to delete{' '}
          <span className="font-bold">{selectedVenue?.name}</span>? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setIsDeleteOpen(false);
              setSelectedVenue(null);
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-headings text-transform uppercase"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="px-4 py-2 bg-cta hover:bg-cta-hover text-white rounded font-headings text-transform uppercase"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
