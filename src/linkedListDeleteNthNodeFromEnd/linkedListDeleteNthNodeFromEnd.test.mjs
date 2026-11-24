import assert from "node:assert/strict";
import { describe, it } from "node:test";
import linkedListDeleteNthNodeFromEnd from "./linkedListDeleteNthNodeFromEnd.ts";

const makeList = (values) =>
  values.reduceRight((next, val) => ({ val, next }), null);
const listValues = (head) => {
  const values = [];
  while (head !== null) {
    values.push(head.val);
    head = head.next;
  }
  return values;
};
describe("linkedListDeleteNthNodeFromEnd", () => {
  it("deletes a middle node", () => {
    const head = makeList([1, 2, 3, 4, 5, 6]);
    assert.deepEqual(
      listValues(linkedListDeleteNthNodeFromEnd(head, 3)),
      [1, 2, 3, 5, 6],
    );
  });
  it("deletes the only node", () => {
    assert.deepEqual(
      listValues(linkedListDeleteNthNodeFromEnd(makeList([8]), 1)),
      [],
    );
  });
  it("deletes the tail when n is one", () => {
    assert.deepEqual(
      listValues(linkedListDeleteNthNodeFromEnd(makeList([9, 7]), 1)),
      [9],
    );
  });
  it("deletes the head when n is the list length", () => {
    assert.deepEqual(
      listValues(linkedListDeleteNthNodeFromEnd(makeList([1, 2, 3]), 3)),
      [2, 3],
    );
  });
  it("handles the maximum list size", () => {
    const values = Array.from({ length: 1_000 }, (_, index) => index + 1);
    const result = linkedListDeleteNthNodeFromEnd(makeList(values), 500);
    assert.deepEqual(listValues(result), [
      ...values.slice(0, 500),
      ...values.slice(501),
    ]);
  });
});
