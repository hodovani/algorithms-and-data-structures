import assert from "node:assert/strict";
import { describe, it } from "node:test";
import binaryTreeEqual, {
  binaryTreeEqualIterative,
} from "./binaryTreeEqual.ts";

const makeLeaf = (val) => ({ val, left: null, right: null });
const solutions = [
  ["recursive", binaryTreeEqual],
  ["iterative", binaryTreeEqualIterative],
];
for (const [name, equal] of solutions) {
  describe(`binaryTreeEqual (${name})`, () => {
    it("considers two empty trees equal", () => {
      assert.equal(equal(null, null), true);
    });
    it("considers an empty and a non-empty tree different", () => {
      assert.equal(equal(null, makeLeaf(1)), false);
    });
    it("compares node values and structure", () => {
      const a = {
        val: 1,
        left: makeLeaf(2),
        right: makeLeaf(3),
      };
      const equalTree = {
        val: 1,
        left: makeLeaf(2),
        right: makeLeaf(3),
      };
      const differentStructure = {
        val: 1,
        left: null,
        right: { val: 2, left: null, right: makeLeaf(3) },
      };
      assert.equal(equal(a, equalTree), true);
      assert.equal(equal(a, differentStructure), false);
      assert.equal(equal(a, { ...equalTree, val: -1 }), false);
    });
    it("supports the value limits and maximum node count", () => {
      const a = makeLeaf(-10_000);
      const b = makeLeaf(-10_000);
      let left = a;
      let right = b;
      for (let i = 1; i < 100; i++) {
        const val = 9_900 + i;
        left.right = makeLeaf(val);
        right.right = makeLeaf(val);
        left = left.right;
        right = right.right;
      }
      assert.equal(equal(a, b), true);
      right.val = 0;
      assert.equal(equal(a, b), false);
    });
  });
}
