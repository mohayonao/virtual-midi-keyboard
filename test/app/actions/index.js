import "run-with-mocha";
import assert from "assert";
import * as actionCreators from "../../../src/app/actions";
import * as types from "../../../src/common/ActionTypes";

describe("actions", () => {
  it("noteOn should create DATA_SET action", () => {
    const actual = actionCreators.noteOn(69, 100);
    const expected = { type: types.DATA_SET, noteNumber: 69, velocity: 100 };

    assert.deepEqual(actual, expected);
  });

  it("noteOff should create DATA_SET action", () => {
    const actual = actionCreators.noteOff(69);
    const expected = { type: types.DATA_SET, noteNumber: 69, velocity: 0 };

    assert.deepEqual(actual, expected);
  });

  it("allNoteOff should create ALL_NOTE_OFF action", () => {
    const actual = actionCreators.allNoteOff();
    const expected = { type: types.ALL_NOTE_OFF };

    assert.deepEqual(actual, expected);
  });
});
