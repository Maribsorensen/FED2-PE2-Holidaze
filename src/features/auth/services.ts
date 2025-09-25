import { fetchApi } from '../../lib/api';
import { clearToken, setToken } from '../../lib/auth';
import type {
  AuthCredentials,
  RegisterCredentials,
  TUser,
} from '../../types/user';

/**
 * Logs in a user with email and password.
 *
 * Sends a POST request to the authentication endpoint and stores the access token and username in localStorage.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The user's password.
 * @returns {Promise<{ user: TUser; accessToken: string }>} - Resolves to an object containing the user data and access token.
 * @throws {Error} - Throws if the login request fails.
 */

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

/**
 * Registers a new user account.
 *
 * Sends a POST request to the registration endpoint, then automatically logs in the user.
 *
 * @param {string} name - The desired username for the new account.
 * @param {string} email - The email address for the new account.
 * @param {string} password - The password for the new account.
 * @param {boolean} venueManager - Whether the user is registering as a venue manager.
 * @returns {Promise<TUser>} - Resolves to the newly registered user data.
 * @throws {Error} - Throws if the registration request fails.
 */

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

/**
 * Logs out the current user.
 *
 * Clears the access token and username from localStorage.
 */

export function logout() {
  clearToken();
}
