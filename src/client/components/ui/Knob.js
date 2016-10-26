import React, { Component, PropTypes } from "react";
import UIComponent from "./UIComponent";

const shapes = {};

export default function Knob(shape, styles) {
  const delegate = shapes[shape];

  return @UIComponent() class KnobComponent extends Component {
    static propTypes = {
      data         : PropTypes.number.isRequired,
      onValueChange: PropTypes.func  .isRequired,
    };
    static defaultProps = {
      onValueChange: () => {},
    };

    constructor(...args) {
      super(...args);
      this.state = { focus: false };
      this._styles = this::delegate.computeStyles(this.props, styles);
    }

    onMouseDown(e) {
      const value = this.computeValue(e.nativeEvent);

      this.props.onValueChange(value);
      this.setState({ focus: true });
    }

    onMouseMove(e) {
      if (this.state.focus) {
        const value = this.computeValue(e.nativeEvent);

        if (Math.abs(value - this.props.data) < 16) {
          this.props.onValueChange(value);
        }
      }
    }

    onMouseUp() {
      this.setState({ focus: false });
    }

    onMouseOut() {
      this.onMouseUp();
    }

    onTouchStart(e) {
      this.onMouseDown(e);
    }

    onTouchMove(e) {
      this.onMouseMove(e);
    }

    onTouchEnd() {
      this.onMouseUp();
    }

    computeValue(e) {
      const svg = e.target.ownerSVGElement;
      const pt  = svg.createSVGPoint();

      pt.x = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
      pt.y = e.targetTouches ? e.targetTouches[0].clientY : e.clientY;

      const { x, y } = pt.matrixTransform(svg.getScreenCTM().inverse());
      const val = this::delegate.computeValue({ x, y }, this._styles);

      return clamp(val, 0, 127)|0;
    }

    render() {
      return this::delegate.render(this.props.data, this._styles, this.state.focus);
    }
  };
}

shapes["knob"] = {
  computeStyles(props, styles) {
    const r    = typeof styles.r    === "number" ? styles.r    : styles.size;
    const size = typeof styles.size === "number" ? styles.size : styles.r;
    const cx = typeof props.cx === "number" ? props.cx : props.x + size / 2;
    const cy = typeof props.cy === "number" ? props.cy : props.y + size / 2;
    const x = cx - size / 2;
    const y = cy - size / 2;

    return {
      x, y, cx, cy, r, size
    };
  },
  computeValue({ x, y }, styles) {
    const { cx, cy } = styles;
    const x1 = x - cx;
    const y1 = y - cy;
    const rad = Math.atan2(y1, x1);
    const deg = rad * 180 / Math.PI;
    const ang = (deg - 90 + 360) % 360;

    return linlin(ang, 30, 330, 0, 127);
  },
  render(data, styles, focus) {
    const { x, y, cx, cy, r, size } = styles;
    const ang  = linlin(data, 0, 128, 0, 300);
    const rad0 = ((  0 + 120) / 360) * 2 * Math.PI;
    const rad1 = ((ang + 120) / 360) * 2 * Math.PI;
    const rad2 = ((300 + 120) / 360) * 2 * Math.PI;
    const x0 = Math.cos(rad0) * r + cx;
    const y0 = Math.sin(rad0) * r + cy;
    const x1 = Math.cos(rad1) * (r + 5) + cx;
    const y1 = Math.sin(rad1) * (r + 5) + cy;
    const x2 = Math.cos(rad2) * r + cx;
    const y2 = Math.sin(rad2) * r + cy;
    const d0 = `M${ cx },${ cy } M${ x0 },${ y0 } A${ r },${ r } 0 1,1 ${ x2 },${ y2 }`;
    const d1 = `M${ cx },${ cy } L${ x1 },${ y1 }`;
    const color = focus ? "#b5b1a2" : "#77756b";

    return (
      <g>
        <path stroke={ color } fill="transparent" strokeWidth={ 10 } d={ d0 }/>
        <path stroke="#f7f7f6" fill="transparent" strokeWidth={  5 } d={ d1 }/>
        <rect x={ x } y={ y } width={ size } height={ size } fill="transparent"/>
      </g>
    );
  }
};

function clamp(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(value, maxValue));
}

function linlin(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}
