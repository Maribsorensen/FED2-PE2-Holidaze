/**
 * Stores the authentication token and user name in localStorage.
 *
 * @param {string} token - The authentication token received from the server.
 * @param {string} name - The username of the authenticated user.
 */

export function setToken(token: string, name: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('name', name);
}

/**
 * Retrieves the authentication token from localStorage.
 *
 * @returns {string | null} The stored authentication token, or null if none is found.
 */

export function getToken(): string | null {
  return localStorage.getItem('token');
}

/**
 * Clears the authentication token and username from localStorage.
 */

export function clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
}
