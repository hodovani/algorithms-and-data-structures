/**
 * Finds the minimum element in a sorted, rotated array of unique integers.
 * Time: O(log n); space: O(1).
 * @param numbers Sorted and rotated array of unique integers.
 * @returns The smallest element in `numbers`.
 */
export default function smallestElementInRotatedSortedArray(
  numbers: number[],
): number {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    const midVal = numbers[mid];
    const rightVal = numbers[right];
    if (midVal === undefined || rightVal === undefined) break;

    if (midVal > rightVal) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  const min = numbers[left];
  if (min === undefined) {
    throw new RangeError("numbers must contain at least one element");
  }
  return min;
}
