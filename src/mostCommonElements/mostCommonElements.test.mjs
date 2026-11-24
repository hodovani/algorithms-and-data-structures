import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mostCommonElements from "./mostCommonElements.ts";

const cases = [
  ["the first example", [4, 4, 4, 6, 6, 5, 5, 5], 2, [4, 5]],
  [
    "all unique results when k equals three",
    [7, 7, 7, 8, 8, 9, 9, 9],
    3,
    [7, 8, 9],
  ],
  ["one unique number", [10, 10, 10, 10, 10], 1, [10]],
  ["negative values", [-1, -1, -2, -2, -2, 0], 2, [-2, -1]],
  ["k equal to the number of unique values", [3, -2, 7], 3, [-2, 3, 7]],
];
describe("mostCommonElements", () => {
  for (const [scenario, numbers, k, expected] of cases) {
    it(`returns the k most frequent values for ${scenario}`, () => {
      assert.deepEqual(
        mostCommonElements(numbers, k).sort((a, b) => a - b),
        expected.sort((a, b) => a - b),
      );
    });
  }
  it("handles the maximum input size", () => {
    const numbers = Array.from({ length: 1_000 }, (_, index) => index % 100);
    const expected = Array.from({ length: 100 }, (_, index) => index);
    assert.deepEqual(
      mostCommonElements(numbers, 100).sort((a, b) => a - b),
      expected,
    );
  });
});
