import React, { Component, PropTypes } from "react";
import nmap from "nmap";
import LEDButton from "./LEDButton";

export default class OctaveViewer extends Component {
  static propTypes = {
    x       : PropTypes.number.isRequired,
    y       : PropTypes.number.isRequired,
    octave  : PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProp) {
    return nextProp.octave !== this.props.octave;
  }

  render() {
    const { x, y, octave, onSelect } = this.props;
    const octaveIndex = octave;
    const elems = nmap(8, (_, i) => {
      const data = octaveIndex === i ? 2 : 0;
      const onValueChange = (data) => {
        if (data) {
          onSelect(i)
        }
      };

      return (
        <LEDButton key={ i } cx={ i * 16 + x } cy={ y } data={ data } onValueChange={ onValueChange }/>
      );
    });

    return (
      <g>{ elems }</g>
    );
  }
}
