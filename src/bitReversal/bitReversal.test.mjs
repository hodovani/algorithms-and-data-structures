import assert from "node:assert/strict";
import { describe, it } from "node:test";
import bitReversal from "./bitReversal.ts";

describe("bitReversal", () => {
  for (const [scenario, n, expected] of [
    ["zero", 0, 0],
    ["the lowest set bit", 1, 2_147_483_648],
    ["two lowest set bits", 3, 3_221_225_472],
    ["a set bit in the middle", 8, 268_435_456],
    ["the maximum input", 1_000_000, 37_941_248],
  ]) {
    it(`reverses the bits of ${scenario}`, () => {
      assert.equal(bitReversal(n), expected);
    });
  }
});
