import React, { Component, PropTypes } from "react";

const events = [ "onMouseDown", "onMouseUp", "onMouseOut", "onTouchStart", "onTouchEnd" ];

export default class UIComponent extends Component {
  static propTypes = {
    data         : PropTypes.number.isRequired,
    onValueChange: PropTypes.func  .isRequired,
  };
  static defaultProps = {
    onValueChange: () => {},
  };

  constructor(...args)  {
    super(...args);

    this._events = {};
    events.forEach((eventName) => {
      if (this[eventName]) {
        this._events[eventName] = ::this[eventName];
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  }

  render() {
    return (<g { ...this._events }>{ this.renderChild() }</g>);
  }

  renderChild() {}
}
