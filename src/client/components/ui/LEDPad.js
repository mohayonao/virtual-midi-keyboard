import React, { Component, PropTypes } from "react";
import UIComponent from "./UIComponent";

const shapes = {};

export default function LEDPad(shape, styles) {
  const delegate = shapes[shape];

  return @UIComponent() class LEDPadComponent extends Component {
    static propTypes = {
      data         : PropTypes.number.isRequired,
      onValueChange: PropTypes.func  .isRequired,
    };
    static defaultProps = {
      onValueChange: () => {},
    };

    constructor(...args) {
      super(...args);
      this._styles = this::delegate.computeStyles(this.props, styles);
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
      return this::delegate.render(this.props.data, this._styles);
    }
  };
}

shapes["rect"] = {
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
  },
  render(data, styles) {
    const fill = `url(#led${ data })`;

    return (<rect { ...styles } fill={ fill }/>);
  }
};

shapes["oval"] = {
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
  },
  render(data, styles) {
    const fill = `url(#led${ data })`;

    return (<circle { ...styles } fill={ fill }/>);
  }
};

shapes["ring"] = {
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
  },
  render(data, styles) {
    const stroke = `url(#led${ data })`;

    return (<circle { ...styles } stroke={ stroke }/>);
  }
};
