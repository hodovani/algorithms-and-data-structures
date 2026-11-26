declare function setTimeout<TArgs extends unknown[]>(
  callback: (...args: TArgs) => unknown,
  delay?: number,
  ...args: TArgs
): unknown;
declare function clearTimeout(id: unknown): void;

/**
 * Schedules a one-shot callback and returns a function that cancels it.
 * Time: O(1); space: O(1).
 * @param callback Function to execute after `delay` milliseconds.
 * @param delay Delay in milliseconds before invoking `callback`.
 * @param args Additional arguments passed to `callback`.
 * @returns A function that cancels the pending timeout when called.
 */
export default function setCancellableTimeout<TArgs extends unknown[]>(
  callback: (...args: TArgs) => unknown,
  delay?: number,
  ...args: TArgs
): () => void {
  const timerId = setTimeout(callback, delay, ...args);
  return () => {
    clearTimeout(timerId);
  };
}
