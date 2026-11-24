import assert from "node:assert/strict";
import { describe, it } from "node:test";
import binaryTreeFlip, { binaryTreeFlipIterative } from "./binaryTreeFlip.ts";

const makeLeaf = (val) => ({ val, left: null, right: null });
const solutions = [
  ["recursive", binaryTreeFlip],
  ["iterative", binaryTreeFlipIterative],
];
for (const [name, flip] of solutions) {
  describe(`binaryTreeFlip (${name})`, () => {
    it("swaps every node's children and returns the original root", () => {
      const root = {
        val: 12,
        left: { val: 8, left: makeLeaf(6), right: null },
        right: { val: 18, left: null, right: makeLeaf(20) },
      };
      assert.equal(flip(root), root);
      assert.deepEqual(root, {
        val: 12,
        left: { val: 18, left: makeLeaf(20), right: null },
        right: { val: 8, left: null, right: makeLeaf(6) },
      });
    });
    it("moves a right-only child to the left", () => {
      const root = { val: 43, left: null, right: makeLeaf(-55) };
      assert.equal(flip(root), root);
      assert.deepEqual(root, { val: 43, left: makeLeaf(-55), right: null });
    });
    it("returns null for an empty tree", () => {
      assert.equal(flip(null), null);
    });
    it("handles the maximum node count", () => {
      const root = makeLeaf(0);
      let node = root;
      for (let i = 1; i < 100; i++) {
        node.left = makeLeaf(i);
        node = node.left;
      }
      assert.equal(flip(root), root);
      assert.equal(root.right?.val, 1);
      assert.equal(root.right?.right?.val, 2);
    });
  });
}
