import * as types from "../../common/ActionTypes";

export function noteOn(noteNumber, velocity) {
  return { type: types.DATA_SET, noteNumber, velocity };
}

export function noteOff(noteNumber) {
  return { type: types.DATA_SET, noteNumber, velocity: 0 };
}

export function allNoteOff() {
  return { type: types.ALL_NOTE_OFF };
}
