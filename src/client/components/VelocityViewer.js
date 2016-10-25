import React, { Component, PropTypes } from "react";
import nmap from "nmap";
import LEDButton from "./LEDButton";

export default class VelocityViewer extends Component {
  static propTypes = {
    x       : PropTypes.number.isRequired,
    y       : PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProp) {
    return nextProp.velocity !== this.props.velocity;
  }

  render() {
    const { x, y, velocity, onSelect } = this.props;
    const velocityIndex = 125 <= velocity ? 7 : Math.floor(velocity / 20);
    const elems = nmap(8, (_, i) => {
      const data = velocityIndex === i ? 2 : 0;
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
