import midi from "midi";
import * as types from "../../common/ActionTypes";

export default class MIDIDevice {
  constructor(deviceName, actions) {
    this.deviceName = deviceName;
    this.actions = actions;
    this.midiInput = null;
    this.midiOutput = null;
    this.state = {};
  }

  open() {
    if (this.midiInput === null) {
      this.midiInput = new midi.input();
      this.midiInput.openVirtualPort(this.deviceName);
      this.midiInput.on("message", (_, data) => {
        this.recvMessage(data);
      });
    }
    if (this.midiOutput === null) {
      this.midiOutput = new midi.output();
      this.midiOutput.openVirtualPort(this.deviceName);
    }
  }

  close() {
    if (this.midiInput !== null) {
      this.midiInput.closePort();
      this.midiInput = null;
    }
    if (this.midiOutput !== null) {
      this.midiOutput.closePort();
      this.midiOutput = null;
    }
  }

  setState(state) {
    this.state.midiChannel = state.midiChannel;
  }

  doAction(action) {
    switch (action.type) {
    case types.NOTE_ON:
      this.noteOn(action.noteNumber, action.velocity);
      break;
    case types.NOTE_OFF:
      this.noteOff(action.noteNumber);
      break;
    case types.ALL_NOTE_OFF:
      this.allNoteOff();
      break;
    }
  }

  noteOn(noteNumber, velocity) {
    this.sendMessage(0x90 + this.state.midiChannel, noteNumber, velocity);
  }

  noteOff(noteNumber) {
    this.sendMessage(0x80 + this.state.midiChannel, noteNumber, 0x00);
  }

  allNoteOff() {
    this.sendMessage(0xb0 + this.state.midiChannel, 0x7b, 0x00);
  }

  recvMessage([ st, d1, d2 ]) {
    if (st === 0x90 + this.state.midiChannel) {
      this.actions.noteOn(d1, d2);
    }
    if (st === 0x80 + this.state.midiChannel) {
      this.actions.noteOff(d1, 0);
    }
  }

  sendMessage(st, d1, d2) {
    if (this.midiOutput !== null) {
      this.midiOutput.sendMessage([ st, d1, d2 ]);
    }
  }
}
