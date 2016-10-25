import React from "react";
import LEDPad from "./LEDPad";

export default class LEDPadOval extends LEDPad {
  computeStyles(props, styles) {
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

  renderChild() {
    const fill = `url(#led${ this.props.data })`;

    return (
      <circle { ...this._styles } fill={ fill }/>
    );
  }
}
