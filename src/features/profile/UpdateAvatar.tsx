import { fetchApi } from '../../lib/api';
import type { TUser } from '../../types/user';

type TAvatar = {
  url: string;
  alt: string;
};

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
