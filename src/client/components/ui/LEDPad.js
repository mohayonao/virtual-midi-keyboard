import React, { PropTypes } from "react";
import UIComponent from "./UIComponent";

export default function LEDPad(computeStyles, styles) {
  return (Component) => {
    return @UIComponent() class LEDPad extends React.Component {
      static propTypes = {
        onValueChange: PropTypes.func.isRequired,
      };
      static defaultProps = {
        onValueChange: () => {},
      };

      constructor(...args) {
        super(...args);
        this._styles = computeStyles(this.props, styles);
        this._onmouse = false;
      }

      onMouseDown() {
        this._onmouse = true;
        this.props.onValueChange(0x7f);
      }

      onMouseUp() {
        this._onmouse = false;
        this.props.onValueChange(0x00);
      }

      onMouseOut() {
        if (this._onmouse) {
          this.onMouseUp();
        }
      }

      onTouchStart() {
        this.onMouseDown();
      }

      onTouchEnd() {
        this.onMouseUp();
      }

      render() {
        return (<Component { ...this.props } styles={ this._styles }/>);
      }
    }
  };
}
