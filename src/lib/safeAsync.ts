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
