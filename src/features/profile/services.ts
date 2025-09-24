import { fetchApi } from '../../lib/api';
import type { ProfileCredentials, TUser } from '../../types/user';

export async function getProfile(name: string): Promise<TUser> {
  const response = await fetchApi<ProfileCredentials>(
    `/holidaze/profiles/${name}`,
    {
      method: 'GET',
    }
  );
  return response.data;
}
