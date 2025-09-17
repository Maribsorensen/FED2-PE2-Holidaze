import { useState } from 'react';
import type { TVenue } from '../../types/venue';
import { Button } from './Button';

type VenueFormProps = {
  initialData?: Partial<TVenue>;
  onSubmit: (data: Partial<TVenue>) => void;
};

export default function VenueForm({
  initialData = {},
  onSubmit,
}: VenueFormProps) {
  const [formData, setFormData] = useState<Partial<TVenue>>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Venue name"
        value={formData.name || ''}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description || ''}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Price per night"
        value={formData.price || ''}
        onChange={handleChange}
      />

      <label>
        <input
          type="checkbox"
          name="wifi"
          checked={formData.meta?.wifi || false}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              meta: { ...prev.meta, wifi: e.target.checked },
            }))
          }
        />
        Wifi
      </label>

      <label>
        <input
          type="checkbox"
          name="parking"
          checked={formData.meta?.parking || false}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              meta: { ...prev.meta, parking: e.target.checked },
            }))
          }
        />
        Parking
      </label>

      <Button type="submit">Save Venue</Button>
    </form>
  );
}
