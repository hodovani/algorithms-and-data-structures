import assert from "node:assert/strict";
import { describe, it } from "node:test";
import isStringPalindrome from "./isStringPalindrome.ts";

describe("isStringPalindrome", () => {
  for (const [scenario, str, expected] of [
    ["the Nixon example", "No 'x' in Nixon", true],
    ["the phrase example", "Was it a car or a cat I saw?", true],
    ["a non-palindrome after filtering", "tab a cat", false],
    ["mixed letters and digits", "1a2A1", true],
    ["a non-palindrome containing digits", "1a2", false],
    ["one alphanumeric character", "Z", true],
    ["no alphanumeric characters", "., !", true],
  ]) {
    it(`checks ${scenario}`, () => {
      assert.equal(isStringPalindrome(str), expected);
    });
  }
  it("handles strings at the maximum input length", () => {
    assert.equal(isStringPalindrome(`A${"b".repeat(1_998)}a`), true);
    assert.equal(isStringPalindrome(`b${"a".repeat(1_998)}c`), false);
  });
});
