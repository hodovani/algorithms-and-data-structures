import assert from "node:assert/strict";
import { describe, it } from "node:test";
import isBalancedBrackets from "./isBalancedBrackets.ts";

describe("isBalancedBrackets", () => {
  for (const [scenario, input, expected] of [
    ["a round bracket pair", "()", true],
    ["a square bracket pair", "[]", true],
    ["a curly bracket pair", "{}", true],
    ["nested pairs", "([])", true],
    ["adjacent balanced groups", "([]){}", true],
    ["brackets closed in the wrong order", "([)]", false],
    ["a closer with no opener", ")", false],
    ["a closer that does not match the latest opener", "(]", false],
    ["an opener left unclosed", "(", false],
  ]) {
    it(`returns the expected result for ${scenario}`, () => {
      assert.equal(isBalancedBrackets(input), expected);
    });
  }
});
