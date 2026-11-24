import assert from "node:assert/strict";
import { describe, it } from "node:test";
import binaryTreeLevelOrderTraversal from "./binaryTreeLevelOrderTraversal.ts";

const makeLeaf = (val) => ({ val, left: null, right: null });
const makeCompleteTree = (values) => {
  const nodes = values.map(makeLeaf);
  nodes.forEach((node, index) => {
    node.left = nodes[2 * index + 1] ?? null;
    node.right = nodes[2 * index + 2] ?? null;
  });
  return nodes[0] ?? null;
};
describe("binaryTreeLevelOrderTraversal", () => {
  it("returns no levels for an empty tree", () => {
    assert.deepEqual(binaryTreeLevelOrderTraversal(null), []);
  });
  it("returns one level for a single node", () => {
    assert.deepEqual(binaryTreeLevelOrderTraversal(makeLeaf(-100)), [[-100]]);
  });
  it("includes a right child when the left child is missing", () => {
    assert.deepEqual(
      binaryTreeLevelOrderTraversal({
        val: 13,
        left: null,
        right: makeLeaf(-55),
      }),
      [[13], [-55]],
    );
  });
  it("returns values left to right at each level", () => {
    assert.deepEqual(
      binaryTreeLevelOrderTraversal(makeCompleteTree([1, 2, 3, 4, 5, 6, 7])),
      [[1], [2, 3], [4, 5, 6, 7]],
    );
  });
  it("handles gaps in a sparse tree", () => {
    const root = {
      val: 5,
      left: { val: 3, left: null, right: makeLeaf(4) },
      right: { val: 8, left: makeLeaf(7), right: makeLeaf(9) },
    };
    assert.deepEqual(binaryTreeLevelOrderTraversal(root), [
      [5],
      [3, 8],
      [4, 7, 9],
    ]);
  });
  it("handles the maximum number of nodes", () => {
    const values = Array.from(
      { length: 10_000 },
      (_, index) => (index % 201) - 100,
    );
    const levels = binaryTreeLevelOrderTraversal(makeCompleteTree(values));
    assert.deepEqual(levels.flat(), values);
    assert.equal(levels.length, 14);
  });
});
