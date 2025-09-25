import { useFieldArray, useForm } from 'react-hook-form';
import type { TVenue } from '../../types/venue';
import { Button } from '../common/Button';

/**
 * VenueForm component for creating or editing a venue.
 * Uses react-hook-form for managing form state, validation, and dynamic fields (media images).
 *
 * Features:
 * - Inputs for venue name, description, price, max guests, and amenities (wifi, parking, pets, breakfast).
 * - Dynamic media fields with at least one required image.
 * - Location fields: address, city, country.
 * - Validation errors displayed inline.
 *
 * @param {Object} props - Component props.
 * @param {Partial<TVenueFormData>} [props.initialData] - Optional initial data to populate the form for editing.
 * @param {(data: Partial<TVenueFormData>) => void} props.onSubmit - Callback function called with form data on submit.
 *
 * @example
 * <VenueForm initialData={venue} onSubmit={handleVenueSubmit} />
 */

type TVenueFormData = Omit<TVenue, 'media'> & {
  media: { url: string; alt: string }[];
};

type VenueFormProps = {
  initialData?: Partial<TVenueFormData>;
  onSubmit: (data: Partial<TVenueFormData>) => void;
};

export default function VenueForm({
  initialData = {},
  onSubmit,
}: VenueFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<TVenueFormData>>({
    defaultValues: {
      ...initialData,
      media: initialData.media
        ? Array.isArray(initialData.media)
          ? initialData.media
          : [initialData.media]
        : [{ url: '', alt: '' }],
      location: initialData.location || { address: '', city: '', country: '' },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'media',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto"
    >
      <input
        type="text"
        placeholder="Venue name"
        {...register('name', { required: 'Venue name is required' })}
        className="border rounded-lg p-2"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <textarea
        placeholder="Description"
        {...register('description', { required: 'Description is required' })}
        rows={4}
        className="border rounded-lg p-2 resize-y min-h-[100px]"
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <input
        type="number"
        placeholder="Price per night"
        {...register('price', {
          required: 'Price is required',
          valueAsNumber: true,
        })}
        className="border rounded-lg p-2"
      />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}

      <input
        type="number"
        placeholder="Max guests"
        {...register('maxGuests', {
          required: 'Max guests is required',
          valueAsNumber: true,
        })}
        className="border rounded-lg p-2"
      />
      {errors.maxGuests && (
        <p className="text-red-500">{errors.maxGuests.message}</p>
      )}

      <label>
        <input type="checkbox" {...register('meta.wifi')} /> Wifi
      </label>
      <label>
        <input type="checkbox" {...register('meta.parking')} /> Parking
      </label>
      <label>
        <input type="checkbox" {...register('meta.pets')} /> Pets
      </label>
      <label>
        <input type="checkbox" {...register('meta.breakfast')} /> Breakfast
        included
      </label>

      {/* Media */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Media</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <input
              placeholder="Image URL"
              {...register(`media.${index}.url`, {
                required:
                  index === 0 ? 'At least one image URL is required' : false,
              })}
              className="border rounded-lg p-2"
            />
            {errors.media?.[index]?.url && (
              <p className="text-red-500">{errors.media[index].url?.message}</p>
            )}
            <input
              placeholder="Alt text"
              {...register(`media.${index}.alt`)}
              className="border rounded-lg p-2"
            />
            {index > 0 && (
              <Button type="button" onClick={() => remove(index)}>
                -
              </Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={() => append({ url: '', alt: '' })}>
          + Add Image
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Location</h3>
        <input
          type="text"
          placeholder="Address"
          {...register('location.address', { required: 'Address is required' })}
          className="border rounded-lg p-2"
        />
        {errors.location?.address && (
          <p className="text-red-500">{errors.location.address.message}</p>
        )}

        <input
          type="text"
          placeholder="City"
          {...register('location.city', { required: 'City is required' })}
          className="border rounded-lg p-2"
        />
        {errors.location?.city && (
          <p className="text-red-500">{errors.location.city.message}</p>
        )}

        <input
          type="text"
          placeholder="Country"
          {...register('location.country', { required: 'Country is required' })}
          className="border rounded-lg p-2"
        />
        {errors.location?.country && (
          <p className="text-red-500">{errors.location.country.message}</p>
        )}
      </div>

      <Button type="submit">Save Venue</Button>
    </form>
  );
}
