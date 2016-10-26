import React, { Component } from "react";

export default function Volatile(opts = { timeout: 1000 }) {
  return (BaseComponent) => {
    return class VolatileComponent extends Component {
      constructor(props) {
        super(props);

        this.state = { visible: false };

        this._timerId = 0;
      }

      componentWillReceiveProps(nextProps) {
        if (this::BaseComponent.prototype.shouldComponentUpdate(nextProps)) {
          this.setState({ visible: true });
          clearTimeout(this._timerId);
          this._timerId = setTimeout(() => {
            this.setState({ visible: false });
          }, opts.timeout);
        }
      }

      shouldComponentUpdate(_, nextState) {
        return nextState.visible || (nextState.visible !== this.state.visible);
      }

      render() {
        if (!this.state.visible) {
          return null;
        }
        return (<BaseComponent { ...this.props }/>);
      }
    };
  };
}
