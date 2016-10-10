import React, { Component } from "react";
import Color from "color";

const ColorMap = [
  "#000000", "#6b0b00", "#d11500", "#ff5542",
];

export default class ColorDefs extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const elems = ColorMap.map((color, i) => {
      const id = `led${ i }`;
      const color1 = Color(color).mix(Color("#fafaf9")).darken(0.25).hexString();
      const color2 = i !== 0 ? Color(color1).lighten(0.5).hexString() : color1;

      return (
        <radialGradient key={ i } gradientUnits="objectBoundingBox" id={ id } spreadMethod="pad">
          <stop offset=  "0%" stopColor={ color2 }/>
          <stop offset="100%" stopColor={ color1 }/>
        </radialGradient>
      );
    });

    return (
      <defs>{ elems }</defs>
    );
  }
}
