const BASE_URL = 'https://v2.api.noroff.dev';
const API_KEY = '6bc5ec58-a1ee-41c7-885f-b4a1c70b0044';

/**
 * Generic function to make API requests to the Noroff API.
 *
 * Automatically includes:
 *  - X-Noroff-API-Key header
 *  - Authorization bearer token if present in localStorage
 *
 * Throws an error if the response status is not ok.
 * Returns undefined if the response status is 204 (No Content).
 *
 * @template T - The expected response type.
 * @param {string} endpoint - The API endpoint to call (relative to BASE_URL).
 * @param {RequestInit} [options={}] - Fetch options (method, headers, body, etc.).
 * @returns {Promise<T>} The parsed JSON response or undefined for 204 responses.
 * @throws {Error} If the response status is not ok.
 */

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API request failed');
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return response.json();
}
