import "run-with-mocha";
import assert from "assert";
import clone from "clone";
import * as actionCreators from "../../../src/client/actions";
import reducer from "../../../src/client/reducer";

describe("reducer", () => {
  it("init state", () => {
    const initState = clone(reducer(undefined, {}));

    assert(initState.data.length === 128);
    assert(initState.data.every(x => x === 0));
    assert(typeof initState.octave === "number");
    assert(typeof initState.velocity === "number");
    assert(typeof initState.midiChannel === "number");
  });

  it("set state", () => {
    const action = actionCreators.setState({ octave: 6 });
    const initState = clone(reducer(undefined, {}));
    const expected = clone(initState); {
      expected.octave = 6;
    }
    const actual = reducer(initState, action);

    assert(actual !== initState);
    assert.deepEqual(actual, expected);
    assert(actual.data === initState.data);
  });
});
