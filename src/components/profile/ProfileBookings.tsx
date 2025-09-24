import { useEffect, useState } from 'react';
import type { TBookings } from '../../types/bookings';
import {
  deleteBooking,
  getBookingsForUser,
  updateBooking,
} from '../../features/bookings/services';
import { BookingCard } from '../booking/BookingCard';
import { safeAsync } from '../../lib/safeAsync';
import { SkeletonCardGrid } from '../common/LoadingSkeleton';
import Modal from '../common/Modal';
import toast from 'react-hot-toast';

export function Bookings({ userName }: { userName: string }) {
  const [bookings, setBookings] = useState<TBookings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<TBookings | null>(null);

  // Delete modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<TBookings | null>(
    null
  );

  useEffect(() => {
    async function loadBookings() {
      const data = await safeAsync(
        () => getBookingsForUser(userName),
        () => setError('Failed to fetch bookings')
      );
      if (data) setBookings(data);
      setLoading(false);
    }
    loadBookings();
  }, [userName]);

  /** Delete booking */
  const handleDeleteConfirm = async () => {
    if (!selectedBooking || !selectedBooking.id) return;

    try {
      await deleteBooking(selectedBooking.id);

      setBookings((prev) => prev.filter((b) => b.id !== selectedBooking.id));

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-fade-in' : 'animate-fade-out'
          } bg-cta text-white px-6 py-3 rounded shadow-lg z-50`}
        >
          Booking at "{selectedBooking.venue.name}" deleted successfully
        </div>
      ));
    } catch (error) {
      toast.error('Failed to delete booking');
      console.error(error);
    } finally {
      setSelectedBooking(null);
      setIsDeleteOpen(false);
    }
  };

  /** Open edit modal */
  const handleEdit = (booking: TBookings) => {
    setEditingBooking(booking);
    setIsEditOpen(true);
  };

  /** Save edit */
  const handleSaveEdit = async (updatedData: {
    dateFrom: string;
    dateTo: string;
    guests: number;
  }) => {
    if (!editingBooking) return;

    const updated = await safeAsync(
      () => updateBooking(editingBooking.id!, updatedData),
      () => toast.error('Failed to update booking')
    );

    if (updated) {
      setBookings((prev) =>
        prev.map((b) =>
          b.venueId === editingBooking.venueId ? { ...b, ...updated.data } : b
        )
      );
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-fade-in' : 'animate-fade-out'
          } bg-cta text-white px-6 py-3 rounded shadow-lg z-50`}
        >
          Booking updated successfully
        </div>
      ));
      setIsEditOpen(false);
      setEditingBooking(null);
    }
  };

  if (loading) return <SkeletonCardGrid count={6} />;
  if (error) return <p>{error}</p>;
  if (!bookings.length) return <p>You have no bookings yet.</p>;

  const now = new Date();
  const upcoming = bookings.filter((b) => new Date(b.dateTo) >= now);
  const past = bookings.filter((b) => new Date(b.dateTo) < now);

  const renderList = (list: TBookings[]) => (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((b) => (
        <BookingCard
          key={b.venueId}
          booking={b}
          onUpdateBooking={() => handleEdit(b)}
          onDeleteBooking={() => {
            setSelectedBooking(b);
            setIsDeleteOpen(true);
          }}
        />
      ))}
    </ul>
  );

  return (
    <>
      {upcoming.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>
          {renderList(upcoming)}
        </section>
      )}
      {past.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Past Bookings</h2>
          {renderList(past)}
        </section>
      )}

      {/* Edit Booking Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingBooking(null);
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Edit Booking</h2>
        {editingBooking && (
          <div className="space-y-4">
            <label>
              Guests
              <input
                type="number"
                min={1}
                value={editingBooking.guests}
                className="border rounded px-2 py-1 w-full"
                onChange={(e) =>
                  setEditingBooking((prev) =>
                    prev ? { ...prev, guests: Number(e.target.value) } : prev
                  )
                }
              />
            </label>
            <label>
              From
              <input
                type="date"
                value={editingBooking.dateFrom.split('T')[0]}
                className="border rounded px-2 py-1 w-full"
                onChange={(e) =>
                  setEditingBooking((prev) =>
                    prev ? { ...prev, dateFrom: e.target.value } : prev
                  )
                }
              />
            </label>
            <label>
              To
              <input
                type="date"
                value={editingBooking.dateTo.split('T')[0]}
                className="border rounded px-2 py-1 w-full"
                onChange={(e) =>
                  setEditingBooking((prev) =>
                    prev ? { ...prev, dateTo: e.target.value } : prev
                  )
                }
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => {
                  setIsEditOpen(false);
                  setEditingBooking(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-cta text-white rounded"
                onClick={() =>
                  editingBooking &&
                  handleSaveEdit({
                    guests: editingBooking.guests,
                    dateFrom: editingBooking.dateFrom,
                    dateTo: editingBooking.dateTo,
                  })
                }
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Booking Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedBooking(null);
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Delete Booking</h2>
        <p className="mb-6">
          Are you sure you want to delete your booking at{' '}
          <span className="font-bold">{selectedBooking?.venue.name}</span>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setIsDeleteOpen(false);
              setSelectedBooking(null);
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
