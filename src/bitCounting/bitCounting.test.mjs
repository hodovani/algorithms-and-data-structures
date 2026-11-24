import assert from "node:assert/strict";
import { describe, it } from "node:test";
import bitCounting from "./bitCounting.ts";

describe("bitCounting", () => {
  for (const [scenario, n, expected] of [
    ["zero", 0, [0]],
    ["the first two values", 1, [0, 1]],
    ["the example with three values", 2, [0, 1, 1]],
    ["the example with a value containing two set bits", 3, [0, 1, 1, 2]],
    ["values across a power of two", 8, [0, 1, 1, 2, 1, 2, 2, 3, 1]],
  ]) {
    it(`returns counts through ${scenario}`, () => {
      assert.deepEqual(bitCounting(n), expected);
    });
  }
  it("handles the maximum input", () => {
    const counts = bitCounting(10_000);
    assert.equal(counts.length, 10_001);
    assert.equal(counts[10_000], 5);
  });
});
