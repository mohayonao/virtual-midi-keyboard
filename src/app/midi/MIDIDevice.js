import midi from "midi";
import * as operations from "./operations";

export default class MIDIDevice {
  constructor(deviceName, actions) {
    this.deviceName = deviceName;
    this.actions = actions;
    this.midiInput = null;
    this.midiOutput = null;
  }

  open() {
    operations.willMIDIPortOpen();
    if (this.midiInput === null) {
      this.midiInput = new midi.input();
      this.midiInput.openVirtualPort(this.deviceName);
      this.midiInput.on("message", (_, data) => {
        this::operations.recvMessage(data, this.actions);
      });
    }
    if (this.midiOutput === null) {
      this.midiOutput = new midi.output();
      this.midiOutput.openVirtualPort(this.deviceName);
    }
    this::operations.didMIDIPortOpen();
  }

  close() {
    operations.willMIDIPortClose();
    if (this.midiInput !== null) {
      this.midiInput.closePort();
      this.midiInput = null;
    }
    if (this.midiOutput !== null) {
      this.midiOutput.closePort();
      this.midiOutput = null;
    }
    this::operations.didMIDIPortClose();
  }

  setState(nextState) {
    this::operations.setState(nextState);
  }

  doAction(action) {
    this::operations.doAction(action, ::this.sendMessage);
  }

  sendMessage(data) {
    if (this.midiOutput !== null) {
      this.midiOutput.sendMessage(data);
    }
  }
}
