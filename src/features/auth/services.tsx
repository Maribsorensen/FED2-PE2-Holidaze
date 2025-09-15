import { fetchApi } from '../../lib/api';
import { clearToken, setToken } from '../../lib/auth';
import type {
  AuthCredentials,
  RegisterCredentials,
  TUser,
} from '../../types/user';

export async function login(
  email: string,
  password: string
): Promise<{ user: TUser; accessToken: string }> {
  const response = await fetchApi<AuthCredentials>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const { accessToken, ...user } = response.data;

  setToken(accessToken, user.name);

  return { user, accessToken };
}

export async function register(
  name: string,
  email: string,
  password: string,
  venueManager: boolean
): Promise<TUser> {
  const response = await fetchApi<RegisterCredentials>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, venueManager }),
  });

  await login(email, password);
  return response.data;
}

export function logout() {
  clearToken();
}
