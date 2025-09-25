import { fetchApi } from '../../lib/api';
import type { TUser } from '../../types/user';

/** Avatar object for updating user profile. */

type TAvatar = {
  url: string;
  alt: string;
};

/**
 * Updates the avatar of a user profile.
 *
 * Requires an access token stored in localStorage under the key 'token'.
 *
 * @param {string} name - The username of the profile to update.
 * @param {TAvatar} avatar - The new avatar object containing:
 *   - `url`: URL of the new avatar image.
 *   - `alt`: Alternative text for the avatar image.
 * @returns {Promise<TUser>} - Resolves to the updated user profile data.
 */

export async function updateAvatar(
  name: string,
  avatar: TAvatar
): Promise<TUser> {
  const response = await fetchApi<{ data: TUser }>(
    `/holidaze/profiles/${name}`,
    {
      method: 'PUT',
      body: JSON.stringify({ avatar }),
    }
  );
  return response.data;
}
