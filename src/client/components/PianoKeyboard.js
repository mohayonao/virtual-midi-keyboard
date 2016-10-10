import React, { Component, PropTypes } from "react";
import { WhitePianoKey, BlackPianoKey } from "./PianoKey";
import { KEYBOARD_LAYOUT } from "../designer";

const Layout = KEYBOARD_LAYOUT.slice().sort((a, b) => a[0] - b[0]); // sort by key type

export default class PianoKeyboard extends Component {
  static propTypes = {
    x          : PropTypes.number.isRequired,
    y          : PropTypes.number.isRequired,
    data       : PropTypes.arrayOf(PropTypes.number).isRequired,
    cNoteNumber: PropTypes.number.isRequired,
    onNoteOn   : PropTypes.func.isRequired,
    onNoteOff  : PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProp) {
    return nextProp.data !== this.props.data;
  }

  onNoteOn(noteOffset) {
    const { cNoteNumber, onNoteOn } = this.props;

    onNoteOn(cNoteNumber + noteOffset);
  }

  onNoteOff(noteOffset) {
    const { cNoteNumber, onNoteOff } = this.props;

    onNoteOff(cNoteNumber + noteOffset);
  }

  render() {
    const { x, y, data, cNoteNumber } = this.props;
    const elems = Layout.map(([ type, pos, noteOffset ], i) => {
      const PianoKey = [ WhitePianoKey, BlackPianoKey ][type];
      const noteNumber = cNoteNumber + noteOffset;
      const keyState = !!data[noteNumber];
      const onNoteOn = this.onNoteOn.bind(this, noteOffset);
      const onNoteOff = this.onNoteOff.bind(this, noteOffset);

      return (
        <PianoKey key={ i } x={ pos + x } y={ y } keyState={ keyState } onNoteOn={ onNoteOn } onNoteOff={ onNoteOff }/>
      );
    });

    return (
      <g className="piano-keyboard">{ elems }</g>
    );
  }
}
