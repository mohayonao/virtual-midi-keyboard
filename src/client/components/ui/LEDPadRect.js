import React, { Component, PropTypes } from "react";
import LEDPad from "./LEDPad";

export default function LEDPadRect(styles = {}) {
  return @LEDPad(computeStyles, styles) class LEDPadRect extends Component {
    static propTypes = {
      data  : PropTypes.number.isRequired,
      styles: PropTypes.object.isRequired,
    };

    render() {
      const fill = `url(#led${ this.props.data })`;

      return (<rect { ...this.props.styles } fill={ fill }/>);
    }
  }

  function computeStyles(props, styles) {
    const size = styles.size;
    const x = typeof props.x === "number" ? props.x : props.cx - size / 2;
    const y = typeof props.y === "number" ? props.y : props.cy - size / 2;
    const width  = size;
    const height = size;

    return {
      rx: 10,
      ry: 10,
      stroke: "#050504",
      strokeWidth: 1,
      ...styles,
      x, y, width, height,
    };
  }
}
