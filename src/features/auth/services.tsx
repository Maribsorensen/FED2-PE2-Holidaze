import { fetchApi } from '../../lib/api';
import { clearToken, setToken } from '../../lib/auth';
import type { TUser } from '../../types/user';

type AuthCredentials = {
  data: {
    user: TUser;
    accessToken: string;
  };
};

export async function login(
  email: string,
  password: string
): Promise<{ user: TUser; accessToken: string }> {
  const response = await fetchApi<AuthCredentials>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(response.data.accessToken);
  return response.data;
}

export async function register(
  name: string,
  email: string,
  password: string,
  venueManager = false
): Promise<{ user: TUser; accessToken: string }> {
  await fetchApi('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, venueManager }),
  });
  return login(email, password);
}

export function logout() {
  clearToken();
}
