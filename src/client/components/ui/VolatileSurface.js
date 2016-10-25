import React, { Component } from "react";

export default class VolatileSurface extends Component {
  constructor(...args) {
    super(...args);

    this.state = { visible: false };

    this._timerId = 0;
    this._shouldComponentUpdate = this.shouldComponentUpdate;

    this.shouldComponentUpdate = (_, nextState) => {
      return nextState.visible || (nextState.visible !== this.state.visible);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (::this._shouldComponentUpdate(nextProps)) {
      this.setState({ visible: true });
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.setState({ visible: false });
      }, 1000);
    }
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    const elems = this.renderChild();

    if (!elems) {
      return null;
    }

    return (<g>{ elems }</g>);
  }

  renderChild() {}
}
