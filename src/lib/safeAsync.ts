/**
 * Executes an asynchronous function safely, catching any errors that occur.
 *
 * This is useful for simplifying error handling in async calls without using try/catch everywhere.
 * If an error occurs, it calls the optional `onError` callback and returns `null`.
 * Otherwise, it returns the result of the function.
 *
 * @template T - The expected return type of the asynchronous function.
 * @param {() => Promise<T>} fn - The asynchronous function to execute.
 * @param {(err: unknown) => void} [onError] - Optional callback to handle errors.
 * @returns {Promise<T | null>} The result of the function or `null` if an error occurred.
 */

export async function safeAsync<T>(
  fn: () => Promise<T>,
  onError?: (err: unknown) => void
): Promise<T | null> {
  try {
    return await fn();
  } catch (err) {
    if (onError) onError(err);
    return null;
  }
}
