import assert from "node:assert/strict";
import { describe, it } from "node:test";
import smallestElementInRotatedSortedArray from "./smallestElementInRotatedSortedArray.ts";

const maxSorted = Array.from({ length: 1000 }, (_, i) =>
  i === 0 ? -10000 : i === 999 ? 10000 : i - 500,
);
const maxRotated = [...maxSorted.slice(373), ...maxSorted.slice(0, 373)];

describe("smallestElementInRotatedSortedArray", () => {
  for (const [scenario, numbers, expected] of [
    ["unrotated sorted array", [1, 2, 3, 4], 1],
    ["even-length array rotated twice", [3, 4, 1, 2], 1],
    ["array with negative numbers rotated 3 times", [6, 7, 8, -5, -4, 2], -5],
    ["minimal single-element array", [42], 42],
    ["single-element array at minimum value bound", [-10000], -10000],
    ["two-element unrotated array", [1, 2], 1],
    ["two-element rotated array", [2, 1], 1],
    ["array rotated once (minimum at index 1)", [5, 1, 2, 3, 4], 1],
    ["array rotated n - 1 times (minimum at last index)", [2, 3, 4, 5, 1], 1],
    ["odd-length all-negative rotated array", [-3, -2, -1, -10, -5], -10],
    ["maximum-length unrotated array (1,000 elements)", maxSorted, -10000],
    ["maximum-length rotated array (1,000 elements)", maxRotated, -10000],
  ]) {
    it(`finds the minimum in ${scenario}`, () => {
      assert.equal(smallestElementInRotatedSortedArray(numbers), expected);
    });
  }
});
