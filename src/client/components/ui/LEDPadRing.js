import React from "react";
import LEDPad from "./LEDPad";

export default class LEDPadRing extends LEDPad {
  computeStyles(props, styles) {
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

  renderChild() {
    const stroke = `url(#led${ this.props.data })`;

    return (
      <circle { ...this._styles } stroke={ stroke }/>
    );
  }
}
