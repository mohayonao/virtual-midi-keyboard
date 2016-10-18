import "run-with-mocha";
import assert from "assert";
import reducer from "../../../src/app/reducers";
import { midiChannel, velocity } from "../../../src/app/reducers";
import * as types from "../../../src/common/ActionTypes";

describe("reducer", () => {
  it("init state", () => {
    const initState = reducer(undefined, {});

    assert(typeof initState === "object");
  });

  it("MIDI_CHANNEL_SET", () => {
    const state = { midiChannel: 8 };
    const action = { type: types.MIDI_CHANNEL_SET, value: 4 };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert(nextState.midiChannel === 4);
  });

  it("MIDI_CHANNEL_SHIFT", () => {
    const state = { midiChannel: 8 };
    const action = { type: types.MIDI_CHANNEL_SHIFT, value: -1 };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert(nextState.midiChannel === 7);
  });

  it("DATA_SET", () => {
    const state = { data: [ 0, 0, 0, 0 ] };
    const action = { type: types.DATA_SET, noteNumber: 1, velocity: 10 };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert(nextState.data[1] === 10);
  });

  it("NOTE_ON", () => {
    const state = { data: [ 0, 0, 0, 0 ] };
    const action = { type: types.NOTE_ON, noteNumber: 1, velocity: 10 };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert(nextState.data[1] === 10);
  });

  it("NOTE_OFF", () => {
    const state = { data: [ 0, 10, 0, 0 ] };
    const action = { type: types.NOTE_OFF, noteNumber: 1 };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert(nextState.data[1] === 0);
  });

  it("ALL_NOTE_OFF", () => {
    const state = { data: [ 10, 10, 10, 0 ] };
    const action = { type: types.ALL_NOTE_OFF };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert(nextState.data[0] === 0);
    assert(nextState.data[1] === 0);
    assert(nextState.data[2] === 0);
    assert(nextState.data[3] === 0);
  });

  it("OCTAVE_SET", () => {
    const state = { octave: 8 };
    const action = { type: types.OCTAVE_SET, value: 4 };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert(nextState.octave === 4);
  });

  it("OCTAVE_SHIFT", () => {
    const state = { octave: 4 };
    const action = { type: types.OCTAVE_SHIFT, value: -1 };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert(nextState.octave === 3);
  });

  it("VELOCITY_SET", () => {
    const state = { velocity: 64 };
    const action = { type: types.VELOCITY_SET, value: 100 };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert(nextState.velocity === 100);
  });

  it("VELOCITY_SHIFT", () => {
    const state = { velocity: 100 };
    const action = { type: types.VELOCITY_SHIFT, value: -1 };
    const nextState = reducer(state, action);

    assert(state !== nextState);
    assert(nextState.velocity === 80);
  });

  describe("midiChannel", () => {
    it("range", () => {
      assert(midiChannel(-1) ===  0);
      assert(midiChannel( 0) ===  0);
      assert(midiChannel(15) === 15);
      assert(midiChannel(16) === 15);
    });
  });

  describe("velocity", () => {
    it("range", () => {
      assert(velocity( -1) ===   0);
      assert(velocity(  0) ===   0);
      assert(velocity(127) === 127);
      assert(velocity(128) === 127);
    });
  });
});
