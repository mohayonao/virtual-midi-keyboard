import React, { Component, PropTypes } from "react";

export default class LEDButton extends Component {
  static propTypes = {
    cx     : PropTypes.number.isRequired,
    cy     : PropTypes.number.isRequired,
    color  : PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static styleProps = {
    rx: 4,
    ry: 4,
    stroke: "#050504",
    strokeWidth: 1
  };

  constructor(...args) {
    super(...args);

    this._events = {
      onClick: ::this.onClick,
      onTouchStart: ::this.onClick,
    };
  }

  shouldComponentUpdate(nextProp) {
    return nextProp.color !== this.props.color;
  }

  onClick() {
    this.props.onClick();
  }

  render() {
    const { cx, cy, color } = this.props;
    const x = cx - 8;
    const y = cy - 8;
    const width  = 16;
    const height = 16;
    const fill = `url(#led${ color })`;

    return (
      <rect className="led-button" x={ x } y={ y } width={ width } height={ height } fill={ fill } { ...LEDButton.styleProps } { ...this._events }/>
    );
  }
}
