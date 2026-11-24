import assert from "node:assert/strict";
import { describe, it } from "node:test";
import binaryTreeMaximumDepth, {
  binaryTreeMaximumDepthIterative,
} from "./binaryTreeMaximumDepth.ts";

const makeLeaf = (val) => ({ val, left: null, right: null });
const solutions = [
  ["recursive", binaryTreeMaximumDepth],
  ["iterative", binaryTreeMaximumDepthIterative],
];
for (const [name, maxDepth] of solutions) {
  describe(`binaryTreeMaximumDepth (${name})`, () => {
    it("returns zero for an empty tree", () => {
      assert.equal(maxDepth(null), 0);
    });
    it("counts a leaf as one node", () => {
      assert.equal(maxDepth(makeLeaf(-100)), 1);
    });
    it("counts a one-sided path", () => {
      const root = {
        val: 1,
        left: null,
        right: { val: 2, left: null, right: makeLeaf(3) },
      };
      assert.equal(maxDepth(root), 3);
    });
    it("uses the deeper of two uneven branches", () => {
      const root = {
        val: 1,
        left: { val: 2, left: makeLeaf(4), right: null },
        right: makeLeaf(3),
      };
      assert.equal(maxDepth(root), 3);
    });
    it("handles the maximum node count", () => {
      const nodes = Array.from({ length: 10_000 }, (_, val) => makeLeaf(val));
      nodes.forEach((node, i) => {
        node.left = nodes[2 * i + 1] ?? null;
        node.right = nodes[2 * i + 2] ?? null;
      });
      assert.equal(maxDepth(nodes[0] ?? null), 14);
    });
  });
}
it("iteratively handles a maximally skewed 10,000-node tree", () => {
  const root = makeLeaf(0);
  let node = root;
  for (let i = 1; i < 10_000; i++) {
    node.right = makeLeaf(i);
    node = node.right;
  }
  assert.equal(binaryTreeMaximumDepth(root), 10_000);
});
