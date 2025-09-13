import { fetchApi } from '../../lib/api';
import type { TVenue } from '../../types/venue';

export async function getVenues(limit = 40, page = 1): Promise<TVenue[]> {
  const response = await fetchApi<{ data: TVenue[] }>(
    `/holidaze/venues?limit=${limit}&page=${page}`
  );
  return response.data;
}
