declare function setInterval<TArgs extends unknown[]>(
  callback: (...args: TArgs) => unknown,
  delay?: number,
  ...args: TArgs
): unknown;
declare function clearInterval(id: unknown): void;

/**
 * Schedules a recurring callback and returns a function that cancels it.
 * Time: O(1); space: O(1).
 * @param callback Function to execute on each interval.
 * @param delay Interval delay in milliseconds.
 * @param args Additional arguments passed to `callback`.
 * @returns A function that cancels the interval when called.
 */
export default function setCancellableInterval<TArgs extends unknown[]>(
  callback: (...args: TArgs) => unknown,
  delay?: number,
  ...args: TArgs
): () => void {
  const timerId = setInterval(callback, delay, ...args);
  return () => {
    clearInterval(timerId);
  };
}
