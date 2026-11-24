import assert from "node:assert/strict";
import { describe, it } from "node:test";
import linkedListDetectCycle from "./linkedListDetectCycle.ts";

describe("linkedListDetectCycle", () => {
  it("returns false for an empty list", () => {
    assert.equal(linkedListDetectCycle(null), false);
  });
  it("returns false for a single node that ends at null", () => {
    assert.equal(linkedListDetectCycle({ val: 1, next: null }), false);
  });
  it("detects a self-cycle", () => {
    const node = { val: 1, next: null };
    node.next = node;
    assert.equal(linkedListDetectCycle(node), true);
  });
  it("detects a cycle back to the head", () => {
    const first = { val: 1, next: null };
    const second = { val: 2, next: null };
    const third = { val: 3, next: first };
    first.next = second;
    second.next = third;
    assert.equal(linkedListDetectCycle(first), true);
  });
  it("detects a cycle that begins in the middle", () => {
    const first = { val: 3, next: null };
    const second = { val: 2, next: null };
    const third = { val: 0, next: null };
    const fourth = { val: -4, next: second };
    first.next = second;
    second.next = third;
    third.next = fourth;
    assert.equal(linkedListDetectCycle(first), true);
  });
  it("does not mistake repeated values for a cycle", () => {
    const head = {
      val: 1,
      next: { val: 2, next: { val: 1, next: null } },
    };
    assert.equal(linkedListDetectCycle(head), false);
  });
  it("handles the maximum list size without a cycle", () => {
    const head = Array.from({ length: 1_000 }, (_, index) => index).reduceRight(
      (next, val) => ({ val, next }),
      null,
    );
    assert.equal(linkedListDetectCycle(head), false);
  });
});
