import { fetchApi } from '../../lib/api';
import type { ProfileCredentials, TUser } from '../../types/user';

/**
 * Fetches a user profile by username.
 *
 * @param {string} name - The username of the profile to fetch.
 * @returns {Promise<TUser>} - A promise that resolves to the user profile data.
 */

export async function getProfile(name: string): Promise<TUser> {
  const response = await fetchApi<ProfileCredentials>(
    `/holidaze/profiles/${name}`,
    {
      method: 'GET',
    }
  );
  return response.data;
}
