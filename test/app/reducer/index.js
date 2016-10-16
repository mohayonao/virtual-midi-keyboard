import "run-with-mocha";
import assert from "assert";
import clone from "clone";
import * as actionCreators from "../../../src/client/actions";
import reducer from "../../../src/app/reducer";

describe("reducer", () => {
  it("init state", () => {
    const initState = clone(reducer(undefined, {}));

    assert(initState.data.length === 128);
    assert(initState.data.every(x => x === 0));
    assert(typeof initState.octave === "number");
    assert(typeof initState.velocity === "number");
    assert(typeof initState.midiChannel === "number");
  });

  it("noteOn", () => {
    const action = actionCreators.noteOn(69, 80);
    const initState = clone(reducer(undefined, {}));
    const expected = clone(initState); {
      expected.data[69] = 80;
    }
    const actual = reducer(initState, action);

    assert(actual !== initState);
    assert.deepEqual(actual, expected);
  });

  it("noteOn / skip", () => {
    const action = actionCreators.noteOn(255);
    const initState = clone(reducer(undefined, {}));
    const expected = clone(initState);
    const actual = reducer(initState, action);

    assert(actual === initState);
    assert.deepEqual(actual, expected);
  });

  it("noteOff", () => {
    const action = actionCreators.noteOff(69);
    const initState = clone(reducer(undefined, {})); {
      initState.data[69] = 100;
    }
    const expected = clone(initState); {
      expected.data[69] = 0;
    }
    const actual = reducer(initState, action);

    assert(actual !== initState);
    assert.deepEqual(actual, expected);
  });

  it("noteOff / skip", () => {
    const action = actionCreators.noteOff(255);
    const initState = clone(reducer(undefined, {})); {
      initState.data[69] = 100;
    }
    const expected = clone(initState);
    const actual = reducer(initState, action);

    assert(actual === initState);
    assert.deepEqual(actual, expected);
  });

  it("octaveSet", () => {
    const action = actionCreators.octaveSet(6);
    const initState = clone(reducer(undefined, {}));
    const expected = clone(initState); {
      expected.octave = 6;
    }
    const actual = reducer(initState, action);

    assert(actual !== initState);
    assert.deepEqual(actual, expected);
  });

  it("octaveSfhit", () => {
    const action = actionCreators.octaveShift(+1);
    const initState = clone(reducer(undefined, {}));
    const expected = clone(initState); {
      expected.octave = initState.octave + 1;
    }
    const actual = reducer(initState, action);

    assert(actual !== initState);
    assert.deepEqual(actual, expected);
  });

  it("velocitySet", () => {
    const action = actionCreators.velocitySet(50);
    const initState = clone(reducer(undefined, {}));
    const expected = clone(initState); {
      expected.velocity = 50;
    }
    const actual = reducer(initState, action);

    assert(actual !== initState);
    assert.deepEqual(actual, expected);
  });

  it("velocitySfhit", () => {
    const action = actionCreators.velocityShift(+1);
    const initState = clone(reducer(undefined, {}));
    const expected = clone(initState); {
      expected.velocity = initState.velocity + 20;
    }
    const actual = reducer(initState, action);

    assert(actual !== initState);
    assert.deepEqual(actual, expected);
  });

  it("midiChannelSet", () => {
    const action = actionCreators.midiChannelSet(8);
    const initState = clone(reducer(undefined, {}));
    const expected = clone(initState); {
      expected.midiChannel = 8;
    }
    const actual = reducer(initState, action);

    assert(actual !== initState);
    assert.deepEqual(actual, expected);
  });

  it("midiChannelSfhit", () => {
    const action = actionCreators.midiChannelShift(+1);
    const initState = clone(reducer(undefined, {}));
    const expected = clone(initState); {
      expected.midiChannel = initState.midiChannel + 1;
    }
    const actual = reducer(initState, action);

    assert(actual !== initState);
    assert.deepEqual(actual, expected);
  });
});
