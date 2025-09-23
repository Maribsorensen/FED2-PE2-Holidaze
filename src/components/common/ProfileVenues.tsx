import { useEffect, useState } from 'react';
import type { TVenue } from '../../types/venue';
import {
  deleteVenue,
  editVenue,
  getVenuesForUser,
} from '../../features/venues/services';
import { VenueCard } from './VenueCard';
import Modal from './Modal';
import VenueForm from './VenueForm';
import { safeAsync } from '../../lib/safeAsync';
import { SkeletonCardGrid } from './LoadingSkeleton';

type VenuesProps = {
  userName: string;
};

export function Venues({ userName }: VenuesProps) {
  const [venues, setVenues] = useState<TVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<TVenue | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<TVenue | null>(null);

  useEffect(() => {
    async function loadVenues() {
      const venuesData = await safeAsync(
        () => getVenuesForUser(userName),
        () => setError('Failed to fetch venues')
      );
      if (venuesData) setVenues(venuesData);
      setLoading(false);
    }
    loadVenues();
  }, [userName]);

  async function handleDeleteConfirm() {
    if (!selectedVenue) return;
    const deleted = await safeAsync(
      () => deleteVenue(selectedVenue.id),
      () => setError('Failed to delete venue')
    );
    if (deleted) {
      setVenues((prev) => prev.filter((v) => v.id !== selectedVenue.id));
    }

    setSelectedVenue(null);
    setIsDeleteOpen(false);
  }

  function handleEdit(venue: TVenue) {
    setEditingVenue(venue);
    setIsEditOpen(true);
  }

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
              <>
                <button
                  onClick={() => handleEdit(venue)}
                  className="bg-black text-white px-2 py-1 rounded-md text-xs shadow"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedVenue(venue);
                    setIsDeleteOpen(true);
                  }}
                  className="bg-black text-white px-2 py-1 rounded-md text-xs shadow"
                >
                  Delete
                </button>
              </>
            }
          />
        ))}
      </ul>

      {/* Edit Venue Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingVenue(null);
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Edit Venue</h2>
        {editingVenue && (
          <VenueForm
            initialData={editingVenue}
            onSubmit={async (data) => {
              if (!editingVenue) return;

              const updated = await safeAsync(
                () => editVenue(editingVenue.id, data),
                () => setError('Failed to update venue')
              );
              if (updated) {
                setVenues((prev) =>
                  prev.map((v) =>
                    v.id === editingVenue.id ? { ...v, ...data } : v
                  )
                );
                setIsEditOpen(false);
                setEditingVenue(null);
              }
            }}
          />
        )}
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
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
