import assert from "node:assert/strict";
import { describe, it } from "node:test";
import maxSumSubArray from "./maxSumSubArray.ts";

const cases = [
  ["the mixed-sign example", [-1, 5, -3, 9, -11], 11],
  ["a single positive value", [9], 9],
  ["a single negative value", [-9], -9],
  ["an all-negative array", [-10_000, -1, -10_000], -1],
  ["an all-positive array", [1, 2, 3, 4], 10],
  ["a best subarray at the start", [5, -1, -2], 5],
  ["a best subarray at the end", [-2, -1, 5], 5],
  ["zeros with negative values", [0, 0, -1, 0], 0],
];
describe("maxSumSubArray", () => {
  for (const [scenario, numbers, expected] of cases) {
    it(`returns the maximum contiguous sum for ${scenario}`, () => {
      assert.equal(maxSumSubArray(numbers), expected);
    });
  }
  it("handles the maximum input length and value", () => {
    const numbers = Array(10_000).fill(10_000);
    assert.equal(maxSumSubArray(numbers), 100_000_000);
  });
});
