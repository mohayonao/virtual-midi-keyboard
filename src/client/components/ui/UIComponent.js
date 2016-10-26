import React, { Component, PropTypes } from "react";

export default function UIComponent() {
  return (BaseComponent) => {
    const events = Object.getOwnPropertyNames(
      BaseComponent.prototype
    ).filter(methodName => methodName.match(/^on[A-Z]/));

    return class UIComponent extends Component {
      static propTypes = {
        data: PropTypes.number.isRequired,
      };

      constructor(...args) {
        super(...args);

        this._events = {};
        events.forEach((eventName) => {
          this._events[eventName] = (e) => {
            this.refs.child[eventName](e);
          };
        });
      }

      shouldComponentUpdate(nextProps) {
        return nextProps.data !== this.props.data;
      }

      render() {
        return (
          <g { ...this._events }>
            <BaseComponent { ...this.props } ref="child"/>
          </g>
        );
      }
    };
  };
}
