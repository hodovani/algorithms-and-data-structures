import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mergeOverlappingIntervals from "./mergeOverlappingIntervals.ts";

const cases = [
  ["a single interval", [[83, 99]], [[83, 99]]],
  [
    "non-overlapping intervals",
    [
      [83, 99],
      [100, 110],
    ],
    [
      [83, 99],
      [100, 110],
    ],
  ],
  [
    "intervals sharing an endpoint",
    [
      [1, 3],
      [3, 5],
    ],
    [[1, 5]],
  ],
  [
    "nested and chained overlaps",
    [
      [1, 5],
      [2, 4],
      [4, 6],
      [7, 8],
    ],
    [
      [1, 6],
      [7, 8],
    ],
  ],
  [
    "unsorted intervals with the same start",
    [
      [4, 8],
      [1, 3],
      [1, 2],
    ],
    [
      [1, 3],
      [4, 8],
    ],
  ],
  [
    "duplicate zero-length intervals",
    [
      [5, 5],
      [5, 5],
    ],
    [[5, 5]],
  ],
  [
    "intervals at the allowed value boundaries",
    [
      [10_000, 10_000],
      [0, 0],
      [0, 10_000],
    ],
    [[0, 10_000]],
  ],
];
describe("mergeOverlappingIntervals", () => {
  for (const [scenario, intervals, expected] of cases) {
    it(`merges ${scenario}`, () => {
      assert.deepEqual(mergeOverlappingIntervals(intervals), expected);
    });
  }
  it("does not mutate the input intervals", () => {
    const intervals = [
      [2, 4],
      [1, 3],
    ];
    const original = structuredClone(intervals);
    mergeOverlappingIntervals(intervals);
    assert.deepEqual(intervals, original);
  });
  it("handles the maximum number of intervals", () => {
    const intervals = Array.from({ length: 100 }, (_, index) => [
      index * 2,
      index * 2 + 1,
    ]);
    assert.deepEqual(mergeOverlappingIntervals(intervals), intervals);
  });
});
