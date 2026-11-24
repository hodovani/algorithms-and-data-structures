import assert from "node:assert/strict";
import { describe, it } from "node:test";
import missingNumber from "./missingNumber.ts";

describe("missingNumber", () => {
  for (const [scenario, numbers, expected] of [
    ["the only value is missing", [1], 0],
    ["the largest value is missing from a single-element array", [0], 1],
    ["a middle value is missing", [1, 3, 0], 2],
    ["the largest value is missing", [3, 0, 4, 2, 1], 5],
  ]) {
    it(`returns the expected result when ${scenario}`, () => {
      assert.equal(missingNumber(numbers), expected);
    });
  }
  it("handles the maximum input size", () => {
    const numbers = Array.from({ length: 10_000 }, (_, index) => index);
    assert.equal(missingNumber(numbers), 10_000);
  });
});
