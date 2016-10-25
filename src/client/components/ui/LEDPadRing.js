import React, { Component, PropTypes } from "react";
import LEDPad from "./LEDPad";

export default function LEDPadRing(styles = {}) {
  return @LEDPad(computeStyles, styles) class LEDPadRing extends Component {
    static propTypes = {
      data  : PropTypes.number.isRequired,
      styles: PropTypes.object.isRequired,
    };

    render() {
      const stroke = `url(#led${ this.props.data })`;

      return (<circle { ...this.props.styles } stroke={ stroke }/>);
    }
  }

  function computeStyles(props, styles) {
    const r = styles.size / 2;
    const cx = typeof props.cx === "number" ? props.cx : props.x + r;
    const cy = typeof props.cy === "number" ? props.cy : props.y + r;

    return {
      fill: "transparent",
      strokeWidth: 8,
      ...styles,
      cx, cy, r,
    };
  }
}
