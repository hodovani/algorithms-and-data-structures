import assert from "node:assert/strict";
import { describe, it } from "node:test";
import optimalStockTrading from "./optimalStockTrading.ts";

describe("optimalStockTrading", () => {
  for (const [scenario, prices, expected] of [
    ["an increasing market", [1, 2, 3, 4], 3],
    ["a declining market", [4, 3, 2, 1], 0],
    ["the lowest price before the best sale", [6, 8, 1, 2, 30, 19], 29],
    ["a single day", [10_000], 0],
    ["zero prices", [0, 0, 0], 0],
    ["maximum price values", [10_000, 0, 10_000], 10_000],
  ]) {
    it(`returns the expected profit for ${scenario}`, () => {
      assert.equal(optimalStockTrading(prices), expected);
    });
  }
  it("handles the maximum input size", () => {
    const prices = Array.from({ length: 10_000 }, (_, index) => index);
    assert.equal(optimalStockTrading(prices), 9_999);
  });
});
