import assert from "node:assert/strict";
import { describe, it } from "node:test";
import setCancellableTimeout from "./setCancellableTimeout.ts";

describe("setCancellableTimeout", () => {
  it("runs the callback once after the delay if not cancelled", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    let count = 0;

    setCancellableTimeout(() => {
      count++;
    }, 100);

    t.mock.timers.tick(99);
    assert.equal(count, 0);

    t.mock.timers.tick(1);
    assert.equal(count, 1);

    t.mock.timers.tick(200);
    assert.equal(count, 1);
  });

  it("prevents execution when cancelled before the delay elapses", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    let count = 0;

    const cancel = setCancellableTimeout(() => {
      count++;
    }, 100);

    t.mock.timers.tick(50);
    cancel();

    t.mock.timers.tick(100);
    assert.equal(count, 0);
  });

  it("is idempotent and harmless when cancel is called after firing", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    let count = 0;

    const cancel = setCancellableTimeout(() => {
      count++;
    }, 50);

    t.mock.timers.tick(50);
    assert.equal(count, 1);

    cancel();
    cancel();
    assert.equal(count, 1);
  });

  it("forwards extra arguments to the callback", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const calls = [];

    setCancellableTimeout(
      (a, b, c) => {
        calls.push([a, b, c]);
      },
      25,
      42,
      "hello",
      false,
    );

    t.mock.timers.tick(25);
    assert.deepEqual(calls, [[42, "hello", false]]);
  });

  it("supports omitting the delay parameter", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    let count = 0;

    setCancellableTimeout(() => {
      count++;
    });

    t.mock.timers.tick(1);
    assert.equal(count, 1);
  });

  it("cancels only the targeted timeout", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    let first = 0;
    let second = 0;

    const cancelFirst = setCancellableTimeout(() => {
      first++;
    }, 50);
    setCancellableTimeout(() => {
      second++;
    }, 50);

    t.mock.timers.tick(25);
    cancelFirst();

    t.mock.timers.tick(25);
    assert.equal(first, 0);
    assert.equal(second, 1);
  });
});
