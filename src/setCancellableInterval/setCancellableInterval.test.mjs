import assert from "node:assert/strict";
import { describe, it } from "node:test";
import setCancellableInterval from "./setCancellableInterval.ts";

describe("setCancellableInterval", () => {
  it("runs repeatedly and stops after cancel is called", (t) => {
    t.mock.timers.enable({ apis: ["setInterval"] });
    let count = 0;

    const cancel = setCancellableInterval(() => {
      count++;
    }, 10);

    t.mock.timers.tick(10);
    assert.equal(count, 1);

    t.mock.timers.tick(10);
    assert.equal(count, 2);

    t.mock.timers.tick(5);
    cancel();

    t.mock.timers.tick(20);
    assert.equal(count, 2);
  });

  it("prevents execution when cancelled before the first tick", (t) => {
    t.mock.timers.enable({ apis: ["setInterval"] });
    let count = 0;

    const cancel = setCancellableInterval(() => {
      count++;
    }, 10);

    t.mock.timers.tick(5);
    cancel();

    t.mock.timers.tick(30);
    assert.equal(count, 0);
  });

  it("is idempotent when cancel is called multiple times", (t) => {
    t.mock.timers.enable({ apis: ["setInterval"] });
    let count = 0;

    const cancel = setCancellableInterval(() => {
      count++;
    }, 10);

    t.mock.timers.tick(10);
    cancel();
    cancel();

    t.mock.timers.tick(20);
    assert.equal(count, 1);
  });

  it("forwards extra arguments to the callback", (t) => {
    t.mock.timers.enable({ apis: ["setInterval"] });
    const calls = [];

    const cancel = setCancellableInterval(
      (a, b, c) => {
        calls.push([a, b, c]);
      },
      10,
      1,
      "two",
      true,
    );

    t.mock.timers.tick(20);
    cancel();

    assert.deepEqual(calls, [
      [1, "two", true],
      [1, "two", true],
    ]);
  });

  it("supports omitting the delay parameter", (t) => {
    t.mock.timers.enable({ apis: ["setInterval"] });
    let count = 0;

    const cancel = setCancellableInterval(() => {
      count++;
    });

    t.mock.timers.tick(5);
    cancel();
    assert.ok(count >= 1);
  });

  it("cancels only the targeted interval", (t) => {
    t.mock.timers.enable({ apis: ["setInterval"] });
    let first = 0;
    let second = 0;

    const cancelFirst = setCancellableInterval(() => {
      first++;
    }, 10);
    const cancelSecond = setCancellableInterval(() => {
      second++;
    }, 10);

    t.mock.timers.tick(10);
    cancelFirst();
    t.mock.timers.tick(20);
    cancelSecond();

    assert.equal(first, 1);
    assert.equal(second, 3);
  });
});
