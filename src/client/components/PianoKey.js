import React, { Component, PropTypes } from "react";

export default class PianoKey extends Component {
  static propTypes = {
    x        : PropTypes.number.isRequired,
    y        : PropTypes.number.isRequired,
    keyState : PropTypes.bool.isRequired,
    onNoteOn : PropTypes.func.isRequired,
    onNoteOff: PropTypes.func.isRequired,
  };

  static styleProps = {
    rx: 2,
    ry: 2,
    stroke: "#000",
    strokeWidth: 2,
  };

  constructor(...args) {
    super(...args);

    this._focus = false;
    this._events = {
      "onMouseDown" : ::this.onMouseDown,
      "onMouseUp"   : ::this.onMouseUp,
      "onMouseOut"  : ::this.onMouseOut,
      "onTouchStart": ::this.onTouchStart,
      "onTouchEnd"  : ::this.onTouchEnd,
    };
  }

  shouldComponentUpdate(nextProp) {
    return nextProp.keyState !== this.props.keyState;
  }
  onMouseDown() {
    this._focus = true;
    this.props.onNoteOn();
  }

  onMouseUp() {
    this._focus = false;
    this.props.onNoteOff();
  }

  onMouseOut() {
    if (this._focus) {
      this.onMouseUp();
    }
  }

  onTouchStart() {
    this.onMouseDown();
  }

  onTouchEnd() {
    this.onMouseUp();
  }

  render() {
    return (
      <g className="piano-key" { ...this._events }>
        { this.renderChildren() }
      </g>
    );
  }

  renderChildren() {
    return null;
  }
}

export class WhitePianoKey extends PianoKey {
  renderChildren() {
    const { x, y, keyState } = this.props;
    const width  = 60;
    const height = width * 3.5;
    const color  = keyState ? "#ec9e96" : "#f0f0f0";

    return (
      <rect x={ x } y={ y } width={ width } height={ height } fill={ color } { ...PianoKey.styleProps }/>
    );
  }
}

export class BlackPianoKey extends PianoKey {
  renderChildren() {
    const { x, y, keyState } = this.props;
    const width = 36;
    const height = width * 3.5;
    const color  = keyState ? "#8c3e36" : "#303030";

    return (
      <rect x={ x } y={ y } width={ width } height={ height } fill={ color } { ...PianoKey.styleProps }/>
    );
  }
}
