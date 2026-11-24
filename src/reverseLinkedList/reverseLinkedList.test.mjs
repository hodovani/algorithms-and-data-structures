import assert from "node:assert/strict";
import { describe, it } from "node:test";
import reverseLinkedList from "./reverseLinkedList.ts";

const makeList = (values) =>
  values.reduceRight((next, val) => ({ val, next }), null);
describe("reverseLinkedList", () => {
  it("returns null for an empty list", () => {
    assert.equal(reverseLinkedList(null), null);
  });
  it("returns the same node for a single-node list", () => {
    const head = { val: -1_000, next: null };
    assert.equal(reverseLinkedList(head), head);
    assert.equal(head.next, null);
  });
  it("reverses links in place and returns the original tail", () => {
    const first = { val: 1, next: null };
    const second = { val: 2, next: null };
    const third = { val: 3, next: null };
    first.next = second;
    second.next = third;
    assert.equal(reverseLinkedList(first), third);
    assert.equal(third.next, second);
    assert.equal(second.next, first);
    assert.equal(first.next, null);
  });
  it("handles the maximum list size and value boundaries", () => {
    const values = Array.from({ length: 1_000 }, (_, index) => index - 500);
    values[0] = -1_000;
    values[999] = 1_000;
    let current = reverseLinkedList(makeList(values));
    const reversedValues = [];
    for (let i = 0; i <= values.length && current !== null; i++) {
      reversedValues.push(current.val);
      current = current.next;
    }
    assert.deepEqual(reversedValues, [...values].reverse());
    assert.equal(current, null);
  });
});
