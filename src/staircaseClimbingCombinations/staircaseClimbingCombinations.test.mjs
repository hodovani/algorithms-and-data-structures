import assert from "node:assert/strict";
import { describe, it } from "node:test";
import staircaseClimbingCombinations from "./staircaseClimbingCombinations.ts";

describe("staircaseClimbingCombinations", () => {
  for (const [scenario, steps, expected] of [
    ["the minimum staircase", 1, 1],
    ["the two-step example", 2, 2],
    ["the three-step example", 3, 3],
    ["a longer staircase", 5, 8],
    ["the maximum allowed staircase", 45, 1_836_311_903],
  ]) {
    it(`counts the combinations for ${scenario}`, () => {
      assert.equal(staircaseClimbingCombinations(steps), expected);
    });
  }
});
