import React, { Component, PropTypes } from "react";
import { FONT_PARAMS } from "../designer";

export default class MIDIChannelViewer extends Component {
  static propTypes = {
    x          : PropTypes.number.isRequired,
    y          : PropTypes.number.isRequired,
    midiChannel: PropTypes.number.isRequired,
    onSelect   : PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProp) {
    return nextProp.midiChannel !== this.props.midiChannel;
  }

  render() {
    const { x, y, midiChannel } = this.props;

    return (
      <text x={ x } y={ y } { ...FONT_PARAMS }>{ midiChannel }</text>
    );
  }
}
