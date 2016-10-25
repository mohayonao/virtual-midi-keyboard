import React, { Component, PropTypes } from "react";
import LEDPad from "./LEDPad";

export default function LEDPadOval(styles = {}) {
  return @LEDPad(computeStyles, styles) class LEDPadOval extends Component {
    static propTypes = {
      data  : PropTypes.number.isRequired,
      styles: PropTypes.object.isRequired,
    };

    render() {
      const fill = `url(#led${ this.props.data })`;

      return (<circle { ...this.props.styles } fill={ fill }/>);
    }
  }

  function computeStyles(props, styles) {
    const r = styles.size / 2;
    const cx = typeof props.cx === "number" ? props.cx : props.x + r;
    const cy = typeof props.cy === "number" ? props.cy : props.y + r;

    return {
      stroke: "#050504",
      strokeWidth: 1,
      ...styles,
      cx, cy, r,
    };
  }
}
