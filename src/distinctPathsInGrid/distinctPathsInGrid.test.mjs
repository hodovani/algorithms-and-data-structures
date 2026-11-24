import assert from "node:assert/strict";
import { describe, it } from "node:test";
import distinctPathsInGrid from "./distinctPathsInGrid.ts";

describe("distinctPathsInGrid", () => {
  for (const [scenario, m, n, expected] of [
    ["a single cell", 1, 1, 1],
    ["a single row", 1, 100, 1],
    ["a single column", 100, 1, 1],
    ["the 3 by 2 example", 3, 2, 3],
    ["the 5 by 7 example", 5, 7, 210],
    ["the 10 by 4 example", 10, 4, 220],
    ["a larger grid", 17, 17, 601_080_390],
  ]) {
    it(`counts paths for ${scenario}`, () => {
      assert.equal(distinctPathsInGrid(m, n), expected);
    });
  }
});
