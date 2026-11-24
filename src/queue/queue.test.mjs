import assert from "node:assert/strict";
import { describe, it } from "node:test";
import Queue from "./queue.ts";

describe("Queue", () => {
  it("starts empty and updates its size as items are removed", () => {
    const queue = new Queue();
    assert.equal(queue.size, 0);
    queue.enqueue(1);
    assert.equal(queue.size, 1);
    assert.equal(queue.dequeue(), 1);
    assert.equal(queue.size, 0);
  });
  it("returns values in FIFO order after interleaved operations", () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    assert.equal(queue.dequeue(), 1);
    queue.enqueue(3);
    assert.equal(queue.dequeue(), 2);
    assert.equal(queue.dequeue(), 3);
  });
  it("throws when dequeuing an empty queue", () => {
    assert.throws(() => new Queue().dequeue(), /Queue is empty/);
  });
});
