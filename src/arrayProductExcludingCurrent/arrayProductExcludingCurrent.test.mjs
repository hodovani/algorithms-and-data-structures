import assert from "node:assert/strict";
import { describe, it } from "node:test";
import arrayProductExcludingCurrent from "./arrayProductExcludingCurrent.ts";

const cases = [
  ["the first example", [1, 2, 3], [6, 3, 2]],
  ["one zero", [2, 0, 3], [0, 6, 0]],
  ["multiple zeros", [0, 0, -1, 1], [0, 0, 0, 0]],
  ["negative values", [-1, 2, -3], [-6, 3, -2]],
  ["the minimum input length", [-2, 4], [4, -2]],
  ["a zero at the first index", [0, 1], [1, 0]],
];
describe("arrayProductExcludingCurrent", () => {
  for (const [scenario, numbers, expected] of cases) {
    it(`returns expected products for ${scenario}`, () => {
      assert.deepEqual(arrayProductExcludingCurrent(numbers), expected);
    });
  }
  it("returns a new array without changing the input", () => {
    const numbers = [1, 2, 3];
    const result = arrayProductExcludingCurrent(numbers);
    assert.notEqual(result, numbers);
    assert.deepEqual(numbers, [1, 2, 3]);
  });
  it("handles the maximum input length with products within the constraint", () => {
    const numbers = [0, ...Array(999).fill(1)];
    const expected = [1, ...Array(999).fill(0)];
    assert.deepEqual(arrayProductExcludingCurrent(numbers), expected);
  });
});
