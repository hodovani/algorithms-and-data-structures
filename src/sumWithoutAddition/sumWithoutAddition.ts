/**
 * Computes the sum of two integers without using `+` or `-` operators.
 * Time: O(1) (at most 32 bit-carry iterations); space: O(1).
 * @param a First integer (-1,000 <= a <= 1,000).
 * @param b Second integer (-1,000 <= b <= 1,000).
 * @returns The sum of `a` and `b`.
 */
export default function sumWithoutAddition(a: number, b: number): number {
  let x = a;
  let y = b;

  while (y !== 0) {
    const carry = (x & y) << 1;
    x = x ^ y;
    y = carry;
  }

  return x;
}
