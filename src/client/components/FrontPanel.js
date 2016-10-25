import React, { Component } from "react";
import Panel from "./ui/Panel";
import { FONT_PARAMS } from "../designer";

@Panel()
export default class FrontPanel extends Component {
  render() {
    const elems = [
      <rect key={ 0 } x={ 260 } y={ 80 } width={ 600 } height={ 5 } fill="#444e59"/>,
      <text key={ 1 } x={ 642 } y={ 28 } { ...FONT_PARAMS } textAnchor="start">Octave</text>,
      <text key={ 2 } x={ 792 } y={ 28 } { ...FONT_PARAMS } textAnchor="start">Velocity</text>,
      <text key={ 3 } x={ 942 } y={ 28 } { ...FONT_PARAMS } textAnchor="start">Ch</text>,
      <rect key={ 4 } x={ 940 } y={ 37 } width={ 40 } height={ 16 } fill="#444e59"/>,
    ];

    return (<g>{ elems }</g>);
  }
}
