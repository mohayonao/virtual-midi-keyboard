import * as types from "../../common/ActionTypes";

export function setState(state) {
  return { type: types.SET_STATE, state };
}

export function noteOn(noteNumber, velocity) {
  return { type: types.NOTE_ON, noteNumber, velocity };
}

export function noteOff(noteNumber) {
  return { type: types.NOTE_OFF, noteNumber, velocity: 0 };
}

export function octaveSet(value) {
  return { type: types.OCTAVE_SET, value };
}

export function octaveShift(value) {
  return { type: types.OCTAVE_SHIFT, shift: Math.sign(value) };
}

export function velocitySet(value) {
  return { type: types.VELOCITY_SET, value };
}

export function velocityShift(value) {
  return { type: types.VELOCITY_SHIFT, shift: Math.sign(value) };
}

export function midiChannelSet(value) {
  return { type: types.MIDI_CHANNEL_SET, value };
}

export function midiChannelShift(value) {
  return { type: types.MIDI_CHANNEL_SHIFT, shift: Math.sign(value) };
}
