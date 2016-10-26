import React, { Component, PropTypes } from "react";
import UIComponent from "./UIComponent";

const shapes = {};

export default function Slider(shape, styles) {
  const delegate = shapes[shape];

  return @UIComponent() class SliderComponent extends Component {
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

shapes["horizontal"] = {
  computeStyles(props, styles) {
    const width = typeof styles.width === "number" ? styles.width : styles.size;
    const height = typeof styles.height === "number" ? styles.height : 64;
    const cx = typeof props.cx === "number" ? props.cx : props.x + width / 2;
    const cy = typeof props.cy === "number" ? props.cy : props.y + height / 2;
    const x = cx - width / 2;
    const y = cy - height / 2;

    return { x, y, cx, cy, width, height };
  },
  computeValue({ x }, styles) {
    return linlin(x - styles.x, 0, styles.width, 0, 127);
  },
  render(data, styles, focus) {
    const color = focus ? "#b5b1a2" : "#77756b";
    const { x, y, cy, width, height } = styles;
    const cx = linlin(data, 0, 127, x, x + width);
    const d0 = `M${ x },${ cy } L${ x + width },${ cy }`;
    const d1 = `M${ cx },${ y } L${ cx },${ y + height }`;

    return (
      <g>
        <path stroke={ color } fill="transparent" strokeWidth={ 10 } d={ d0 }/>
        <path stroke="#f7f7f6" fill="transparent" strokeWidth={  5 } d={ d1 }/>
        <rect x={ x } y={ y } width={ width } height={ height } fill="transparent"/>
      </g>
    );
  }
};

shapes["vertical"] = {
  computeStyles(props, styles) {
    const width = typeof styles.width === "number" ? styles.width : 64;
    const height = typeof styles.height === "number" ? styles.height : styles.size;
    const cx = typeof props.cx === "number" ? props.cx : props.x + width / 2;
    const cy = typeof props.cy === "number" ? props.cy : props.y + height / 2;
    const x = cx - width / 2;
    const y = cy - height / 2;

    return { x, y, cx, cy, width, height };
  },
  computeValue({ y }, styles) {
    return linlin(y - styles.y, 0, styles.height, 127, 0);
  },
  render(data, styles, focus) {
    const color = focus ? "#b5b1a2" : "#77756b";
    const { x, y, cx, width, height } = styles;
    const cy = linlin(data, 0, 127, y + height, y);
    const d0 = `M${ cx },${ y } L${ cx },${ y + height }`;
    const d1 = `M${ x },${ cy } L${ x + width },${ cy }`;

    return (
      <g>
        <path stroke={ color } fill="transparent" strokeWidth={ 10 } d={ d0 }/>
        <path stroke="#f7f7f6" fill="transparent" strokeWidth={  5 } d={ d1 }/>
        <rect x={ x } y={ y } width={ width } height={ height } fill="transparent"/>
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
