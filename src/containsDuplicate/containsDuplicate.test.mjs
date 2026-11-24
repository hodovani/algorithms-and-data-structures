import assert from "node:assert/strict";
import { describe, it } from "node:test";
import containsDuplicate from "./containsDuplicate.ts";

describe("containsDuplicate", () => {
  for (const [scenario, numbers, expected] of [
    ["unique values", [5, 7, 1, 0xff, 0.01], false],
    ["a repeated value", [10, 7, 0, 0, 0.255e3, 0.01, 0.01], true],
    ["multiple repeated values", [3, 2, 6, 5, 0, 3, 10, 3, 10, 5], true],
    ["empty array", [], false],
    ["single value", [42], false],
  ]) {
    it(`returns the expected result for ${scenario}`, () => {
      assert.equal(containsDuplicate(numbers), expected);
    });
  }
});
