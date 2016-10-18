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

  if (state.shift) {
    if (keyCode === 188) {
      actions.midiChannelShift(-1);
    } else if (keyCode === 190) {
      actions.midiChannelShift(+1);
    }
  } else {
    const keyIndex = KeyLayout.indexOf(keyCode);

    if (keyIndex !== -1) {
      actions.noteOn(keyIndex + octave * 12 + 24, velocity);
    } else if (keyCode === 90) { // "Z"
      actions.octaveShift(-1);
    } else if (keyCode === 88) { // "X"
      actions.octaveShift(+1);
    } else if (keyCode === 67) { // "C"
      actions.velocityShift(-1);
    } else if (keyCode === 86) { // "V"
      actions.velocityShift(+1);
    }
  }

  if (keyCode === 16) {
    state.shift = true;
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
    actions.noteOff(keyIndex + octave * 12 + 24);
  } else if (keyCode === 16) {
    state.shift = false;
  }
}
