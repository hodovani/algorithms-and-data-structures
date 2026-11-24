import assert from "node:assert/strict";
import { describe, it } from "node:test";
import isMeetingCalendarValid from "./isMeetingCalendarValid.ts";

const cases = [
  ["no meetings", [], true],
  ["one meeting", [[83, 99]], true],
  [
    "back-to-back meetings",
    [
      [1, 5],
      [5, 10],
      [10, 15],
    ],
    true,
  ],
  [
    "unsorted back-to-back meetings",
    [
      [10, 15],
      [1, 5],
      [5, 10],
    ],
    true,
  ],
  [
    "overlapping meetings",
    [
      [8, 10],
      [1, 3],
      [2, 6],
      [15, 18],
    ],
    false,
  ],
  [
    "one meeting nested inside another",
    [
      [1, 10],
      [3, 4],
    ],
    false,
  ],
  [
    "meetings with the same start time",
    [
      [1, 4],
      [1, 3],
    ],
    false,
  ],
];
describe("isMeetingCalendarValid", () => {
  for (const [scenario, intervals, expected] of cases) {
    it(`returns ${scenario}`, () => {
      assert.equal(isMeetingCalendarValid(intervals), expected);
    });
  }
  it("handles the maximum number of non-overlapping meetings", () => {
    const intervals = Array.from({ length: 1_000 }, (_, index) => [
      index * 2,
      index * 2 + 1,
    ]);
    assert.equal(isMeetingCalendarValid(intervals), true);
  });
});
