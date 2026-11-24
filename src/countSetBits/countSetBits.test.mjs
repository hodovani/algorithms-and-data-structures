import assert from "node:assert/strict";
import { describe, it } from "node:test";
import countSetBits from "./countSetBits.ts";

describe("countSetBits", () => {
  for (const [scenario, num, expected] of [
    ["the minimum positive input", 1, 1],
    ["a power of two", 8, 1],
    ["the example with two set bits", 9, 2],
    ["the example with several set bits", 123, 6],
    ["all bits set in a small binary number", 15, 4],
    ["the largest allowed input", 2 ** 31 - 1, 31],
  ]) {
    it(`counts set bits for ${scenario}`, () => {
      assert.equal(countSetBits(num), expected);
    });
  }
});
