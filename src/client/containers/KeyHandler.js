const KeyOn = new Set();

const KeyLayout = (
  "AWSEDFTGYHUJKOLP" + String.fromCharCode(186)
).split("").map(ch => ch.charCodeAt(0));

const state = { shift: false };

export function keyDown(keyCode, props) {
  if (KeyOn.has(keyCode)) {
    return;
  }
  KeyOn.add(keyCode);

  const { actions, octave, velocity } = props;
  const keyIndex = KeyLayout.indexOf(keyCode);

  if (keyIndex !== -1) {
    const noteNumber = keyIndex + octave * 12 + 24;

    actions.noteOn(noteNumber, velocity);
  } else {
    switch (keyCode) {
    case 90: // "Z"
      actions.octaveShift(-1);
      break;
    case 88: // "X"
      actions.octaveShift(+1);
      break;
    case 67: // "C"
      actions.velocityShift(-1);
      break;
    case 86: // "V"
      actions.velocityShift(+1);
      break;
    case 188: // "<"
      if (state.shift) {
        actions.midiChannelShift(-1);
      }
      break;
    case 190: // ">"
      if (state.shift) {
        actions.midiChannelShift(+1);
      }
      break;
    case 16: // shift
      state.shift = true;
      break;
    }
  }
}

export function keyUp(keyCode, props) {
  if (!KeyOn.has(keyCode)) {
    return;
  }
  KeyOn.delete(keyCode);

  const { actions, octave } = props;
  const keyIndex = KeyLayout.indexOf(keyCode);

  if (keyIndex !== -1) {
    const noteNumber = keyIndex + octave * 12 + 24;

    actions.noteOff(noteNumber);
  } else if (keyCode === 16) {
    state.shift = false;
  }
}
