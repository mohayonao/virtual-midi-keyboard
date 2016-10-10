import React, { Component } from "react";
import { FONT_PARAMS } from "../designer";

export default class Panel extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <g>
        <rect x={ 260 } y={ 80 } width={ 600 } height={ 5 } fill="#444e59"/>
        <text x={ 642 } y={ 28 } { ...FONT_PARAMS } textAnchor="start">Octave</text>
        <text x={ 792 } y={ 28 } { ...FONT_PARAMS } textAnchor="start">Velocity</text>
        <text x={ 942 } y={ 28 } { ...FONT_PARAMS } textAnchor="start">Ch</text>
        <rect x={ 940 } y={ 37 } width={ 40 } height={ 16 } fill="#444e59"/>
      </g>
    );
  }
}
