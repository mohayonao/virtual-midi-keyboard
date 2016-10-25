import React from "react";

export default function VolatileSurface(timeout) {
  return (Component) => {
    return class VolatileSurfaceComponent extends React.Component {
      constructor(props) {
        super(...props);

        this.state = { visible: false };

        this._timerId = 0;
      }

      componentWillReceiveProps(nextProps) {
        if (this::Component.prototype.shouldComponentUpdate(nextProps)) {
          this.setState({ visible: true });
          clearTimeout(this._timerId);
          this._timerId = setTimeout(() => {
            this.setState({ visible: false });
          }, timeout);
        }
      }

      shouldComponentUpdate(_, nextState) {
        return nextState.visible || (nextState.visible !== this.state.visible);
      }

      render() {
        if (!this.state.visible) {
          return null;
        }
        return (<Component { ...this.props }/>);
      }
    };
  };
}
