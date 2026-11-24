import assert from "node:assert/strict";
import { describe, it } from "node:test";
import binaryTreeSubtree from "./binaryTreeSubtree.ts";

const makeNode = (val, left = null, right = null) => ({ val, left, right });
const makeRightChain = (values) =>
  values.reduceRight((right, val) => makeNode(val, null, right), null);
describe("binaryTreeSubtree", () => {
  it("finds a matching subtree", () => {
    const root = makeNode(
      12,
      makeNode(8, makeNode(3), makeNode(5)),
      makeNode(6),
    );
    const subRoot = makeNode(8, makeNode(3), makeNode(5));
    assert.equal(binaryTreeSubtree(root, subRoot), true);
  });
  it("requires the candidate subtree to match in structure", () => {
    const root = makeNode(1, makeNode(2), makeNode(3));
    const subRoot = makeNode(1, makeNode(2));
    assert.equal(binaryTreeSubtree(root, subRoot), false);
  });
  it("continues searching after a same-value candidate fails", () => {
    const root = makeNode(
      0,
      makeNode(4, makeNode(8)),
      makeNode(4, null, makeNode(8)),
    );
    const subRoot = makeNode(4, null, makeNode(8));
    assert.equal(binaryTreeSubtree(root, subRoot), true);
  });
  it("considers a tree to be a subtree of itself", () => {
    const root = makeNode(1, makeNode(-2), makeNode(3));
    assert.equal(binaryTreeSubtree(root, root), true);
  });
  it("treats an empty subtree as contained and an empty root as containing no non-empty tree", () => {
    assert.equal(binaryTreeSubtree(null, null), true);
    assert.equal(binaryTreeSubtree(makeNode(1), null), true);
    assert.equal(binaryTreeSubtree(null, makeNode(1)), false);
  });
  it("handles the maximum node count and value boundaries", () => {
    const values = Array.from({ length: 100 }, (_, index) => index);
    values[0] = -10_000;
    values[99] = 10_000;
    assert.equal(
      binaryTreeSubtree(makeRightChain(values), makeNode(10_000)),
      true,
    );
  });
});
