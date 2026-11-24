import assert from "node:assert/strict";
import { describe, it } from "node:test";
import countGridIslands from "./countGridIslands.ts";

const cases = [
  [
    "the first example",
    [
      [1, 0],
      [0, 0],
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    2,
  ],
  [
    "the second example",
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    1,
  ],
  [
    "one horizontal island",
    [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    1,
  ],
  [
    "diagonal land cells as separate islands",
    [
      [1, 0],
      [0, 1],
    ],
    2,
  ],
  [
    "land connected along the grid edges",
    [
      [0, 1],
      [1, 1],
    ],
    1,
  ],
  [
    "a grid with no land",
    [
      [0, 0],
      [0, 0],
    ],
    0,
  ],
  ["an empty grid", [], 0],
];
describe("countGridIslands", () => {
  for (const [scenario, grid, expected] of cases) {
    it(`counts islands for ${scenario}`, () => {
      assert.equal(countGridIslands(grid), expected);
    });
  }
  it("handles a 100 by 100 island", () => {
    const grid = Array.from({ length: 100 }, () => Array(100).fill(1));
    assert.equal(countGridIslands(grid), 1);
  });
});
