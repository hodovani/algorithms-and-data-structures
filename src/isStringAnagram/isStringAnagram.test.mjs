import assert from "node:assert/strict";
import { describe, it } from "node:test";
import isStringAnagram from "./isStringAnagram.ts";

describe("isStringAnagram", () => {
  for (const [scenario, str1, str2, expected] of [
    ["one matching character", "a", "a", true],
    ["one different character", "a", "b", false],
    ["matching repeated characters", "aaa", "aaa", true],
    ["the same characters in a different order", "aza", "zaa", true],
    ["different character frequencies", "hello", "bello", false],
    ["different lengths", "ab", "aba", false],
  ]) {
    it(`returns the expected result for ${scenario}`, () => {
      assert.equal(isStringAnagram(str1, str2), expected);
    });
  }
  it("handles strings at the maximum input length", () => {
    const str1 = `${"a".repeat(999)}z`;
    const str2 = `z${"a".repeat(999)}`;
    assert.equal(isStringAnagram(str1, str2), true);
    assert.equal(isStringAnagram(str1, `${str1.slice(0, -1)}y`), false);
  });
});
