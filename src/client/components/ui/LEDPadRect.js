import React from "react";
import LEDPad from "./LEDPad";

export default class LEDPadRect extends LEDPad {
  computeStyles(props, styles) {
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

  renderChild() {
    const fill = `url(#led${ this.props.data })`;

    return (
      <rect { ...this._styles } fill={ fill }/>
    );
  }
}
