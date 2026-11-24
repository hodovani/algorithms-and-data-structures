import assert from "node:assert/strict";
import { describe, it } from "node:test";
import maxProductSubArray from "./maxProductSubArray.ts";

const cases = [
  ["the first example", [1, 2, -3, 5, 1], 5],
  ["a single positive value", [9], 9],
  ["a single negative value", [-9], -9],
  ["the example with two negative values", [1, 2, 0, -1, 8, -4], 32],
  ["a negative product becoming positive", [-2, 3, -4], 24],
  ["an all-negative array", [-2, -3, -4], 12],
  ["zeros separating products", [2, 3, 0, -2, 4, -1], 8],
  ["multiple zeros and negative values", [0, -2, 0, -3], 0],
];
describe("maxProductSubArray", () => {
  for (const [scenario, numbers, expected] of cases) {
    it(`returns the maximum contiguous product for ${scenario}`, () => {
      assert.equal(maxProductSubArray(numbers), expected);
    });
  }
  it("handles the maximum input length", () => {
    assert.equal(maxProductSubArray(Array(1_000).fill(-1)), 1);
  });
});
