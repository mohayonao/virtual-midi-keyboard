import * as types from "../../common/ActionTypes";

const state = { midiChannel: 0 };

export function setState(nextState) {
  state.midiChannel = nextState.midiChannel;
}

export function doAction(action, send) {
  switch (action.type) {
  case types.NOTE_ON:
    send(noteOn(action.noteNumber, action.velocity));
    break;
  case types.NOTE_OFF:
    send(noteOff(action.noteNumber));
    break;
  case types.ALL_NOTE_OFF:
    send(allNoteOff());
    break;
  }
}

export function recvMessage([ st, d1, d2 ], actions) {
  if (st === 0x90 + state.midiChannel) {
    actions.noteOn(d1, d2);
  }
  if (st === 0x80 + state.midiChannel) {
    actions.noteOff(d1, 0);
  }
}

export function willMIDIPortOpen() {}

export function didMIDIPortOpen() {}

export function willMIDIPortClose() {
  this.sendMessage(allNoteOff());
}

export function didMIDIPortClose() {}

////////////////////////////////////////////////////////////////////////////////////////////////////
function noteOn(noteNumber, velocity) {
  return [ 0x90 + state.midiChannel, noteNumber, velocity ];
}

function noteOff(noteNumber) {
  return [ 0x80 + state.midiChannel, noteNumber, 0x00 ];
}

function allNoteOff() {
  return [ 0xb0 + state.midiChannel, 0x7b, 0x00 ];
}
