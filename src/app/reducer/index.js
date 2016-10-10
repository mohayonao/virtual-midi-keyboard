import initState from "../../common/initState";
import * as types from "../../common/ActionTypes";
import { clamp } from "../../common/utils";

export default (state = initState, action) => {
  switch (action.type) {
  case types.DATA_SET:
  case types.NOTE_ON:
    if (0 <= action.noteNumber && action.noteNumber < state.data.length) {
      if (state.data[action.noteNumber] !== action.velocity) {
        return { ...state, data: [].concat(state.data.slice(0, action.noteNumber), action.velocity, state.data.slice(action.noteNumber + 1)) };
      }
    }
    break;
  case types.NOTE_OFF:
    if (0 <= action.noteNumber && action.noteNumber < state.data.length) {
      if (state.data[action.noteNumber] !== 0) {
        return { ...state, data: [].concat(state.data.slice(0, action.noteNumber), 0, state.data.slice(action.noteNumber + 1)) };
      }
    }
    break;
  case types.ALL_NOTE_OFF:
    return { ...state, data: state.data.map(() => 0) };
  case types.OCTAVE_SET:
    if (action.value !== state.octave && 0 <= action.value && action.value < 8) {
      return { ...state, octave: action.value };
    }
    break;
  case types.OCTAVE_SHIFT:
    {
      const octave = octaveShift(state.octave, action.shift);

      if (Number.isFinite(octave) && octave !== state.octave) {
        return { ...state, octave };
      }
    }
    break;
  case types.VELOCITY_SET:
    if (action.value !== state.velocity && 1 <= action.value && action.value < 128) {
      return { ...state, velocity: action.value };
    }
    break;
  case types.VELOCITY_SHIFT:
    {
      const velocity = velocityShift(state.velocity, action.shift);

      if (Number.isFinite(velocity) && velocity !== state.velocity) {
        return { ...state, velocity };
      }
    }
    break;
  case types.MIDI_CHANNEL_SET:
    if (action.value !== state.midiChannel && 0 <= action.value && action.value < 16) {
      return { ...state, midiChannel: action.value };
    }
    break;
  case types.MIDI_CHANNEL_SHIFT:
    {
      const midiChannel = clamp(state.midiChannel + action.shift, 0, 15);

      if (Number.isFinite(midiChannel) && midiChannel !== state.midiChannel) {
        return { ...state, midiChannel };
      }
    }
    break;
  }
  return state;
};

export function octaveShift(octave, shift) {
  octave += shift;
  return clamp(octave, 0, 7);
}

export function velocityShift(velocity, shift) {
  if (shift === -1 && 125 <= velocity) {
    velocity = 120;
  } else {
    velocity += shift * 20;
  }
  return clamp(velocity, 1, 127);
}
