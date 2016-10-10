import "run-with-mocha";
import assert from "assert";
import * as actionCreators from "../../../src/client/actions";
import * as types from "../../../src/common/ActionTypes";

describe("actions", () => {
  it("setState should create SET_STATE action", () => {
    const actual = actionCreators.setState({ value: 100 });
    const expected = { type: types.SET_STATE, state: { value: 100 } };

    assert.deepEqual(actual, expected);
  });

  it("noteOn should create NOTE_ON action", () => {
    const actual = actionCreators.noteOn(69, 100);
    const expected = { type: types.NOTE_ON, noteNumber: 69, velocity: 100 };

    assert.deepEqual(actual, expected);
  });

  it("noteOff should create NOTE_OFF action", () => {
    const actual = actionCreators.noteOff(69);
    const expected = { type: types.NOTE_OFF, noteNumber: 69, velocity: 0 };

    assert.deepEqual(actual, expected);
  });

  it("octaveSet should create OCTAVE_SET action", () => {
    const actual = actionCreators.octaveSet(6);
    const expected = { type: types.OCTAVE_SET, value: 6 };

    assert.deepEqual(actual, expected);
  });

  it("octaveShift should create OCTAVE_SHIFT action", () => {
    const actual = actionCreators.octaveShift(+10);
    const expected = { type: types.OCTAVE_SHIFT, shift: 1 };

    assert.deepEqual(actual, expected);
  });

  it("velocitySet should create VELOCITY_SET action", () => {
    const actual = actionCreators.velocitySet(100);
    const expected = { type: types.VELOCITY_SET, value: 100 };

    assert.deepEqual(actual, expected);
  });

  it("velocityShift should create VELOCITY_SHIFT action", () => {
    const actual = actionCreators.velocityShift(0);
    const expected = { type: types.VELOCITY_SHIFT, shift: 0 };

    assert.deepEqual(actual, expected);
  });

  it("midiChannelSet should create MIDI_CHANNEL_SET action", () => {
    const actual = actionCreators.midiChannelSet(1);
    const expected = { type: types.MIDI_CHANNEL_SET, value: 1 };

    assert.deepEqual(actual, expected);
  });

  it("midiChannelShift should create MIDI_CHANNEL_SHIFT action", () => {
    const actual = actionCreators.midiChannelShift(-10);
    const expected = { type: types.MIDI_CHANNEL_SHIFT, shift: -1 };

    assert.deepEqual(actual, expected);
  });
});
