import assert from "node:assert/strict";
import { describe, it } from "node:test";
import sumWithoutAddition from "./sumWithoutAddition.ts";

describe("sumWithoutAddition", () => {
  for (const [scenario, a, b, expected] of [
    ["two positive integers", 1, 2, 3],
    ["two negative integers", -1, -2, -3],
    ["two zeros", 0, 0, 0],
    ["multi-bit carry propagation", 5, 3, 8],
    ["a negative and positive integer yielding negative", -5, 3, -2],
    ["a positive and negative integer yielding positive", 5, -3, 2],
    ["additive inverses", -7, 7, 0],
    ["minimum constraint bounds", -1000, -1000, -2000],
    ["maximum constraint bounds", 1000, 1000, 2000],
    ["opposite constraint bounds", -1000, 1000, 0],
  ]) {
    it(`adds ${scenario}`, () => {
      assert.equal(sumWithoutAddition(a, b), expected);
    });
  }
});
