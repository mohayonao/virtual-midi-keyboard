import "run-with-mocha";
import assert from "assert";
import reducer from "../../../src/client/reducers";
import * as types from "../../../src/common/ActionTypes";

describe("reducer", () => {
  it("init state", () => {
    const initState = reducer(undefined, {});

    assert(typeof initState === "object");
  });

  it("SET_STATE", () => {
    const state = { foo: 0, bar: 1 };
    const action = { type: types.SET_STATE, state: { foo: 1, baz: 3 } };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert.deepEqual(nextState, { foo: 1, bar: 1, baz: 3 });
  });

  it("APPLY_PATCH", () => {
    const state = { foo: 0, bar: 1 };
    const action = { type: types.APPLY_PATCH, patch: [
       { op: "replace", path: "/bar", value: 2 },
    ] };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert.deepEqual(nextState, { foo: 0, bar: 2 });
  });
});
