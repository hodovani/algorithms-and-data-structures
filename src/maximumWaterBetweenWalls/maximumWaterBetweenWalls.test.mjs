import assert from "node:assert/strict";
import { describe, it } from "node:test";
import maximumWaterBetweenWalls from "./maximumWaterBetweenWalls.ts";

const cases = [
  ["the first example", [1, 4, 2, 3], 6],
  ["two equal-height walls", [1, 1], 1],
  ["a zero-height wall", [1, 0], 0],
  ["two walls at the maximum height", [10_000, 10_000], 10_000],
  ["zero-height walls around a tall wall", [0, 10_000, 0], 0],
  ["the best container between inner walls", [1, 8, 6, 2, 5, 4, 8, 3, 7], 49],
];
describe("maximumWaterBetweenWalls", () => {
  for (const [scenario, walls, expected] of cases) {
    it(`returns the maximum area for ${scenario}`, () => {
      assert.equal(maximumWaterBetweenWalls(walls), expected);
    });
  }
  it("handles the maximum number of walls", () => {
    const walls = Array(1_000).fill(10_000);
    assert.equal(maximumWaterBetweenWalls(walls), 9_990_000);
  });
});
