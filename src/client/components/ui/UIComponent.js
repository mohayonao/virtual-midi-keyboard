import React, { PropTypes } from "react";

const events = [ "onMouseDown", "onMouseUp", "onMouseMove", "onMouseOut", "onTouchStart", "onTouchEnd", "onTouchMove" ];

export default function UIComponent() {
  return (Component) => {
    return class UIComponent extends React.Component {
      static propTypes = {
        data: PropTypes.number.isRequired,
      };

      constructor(...args)  {
        super(...args);

        this._events = {};
        events.forEach((eventName) => {
          if (Component.prototype[eventName]) {
            this._events[eventName] = (e) => {
              this.refs.child[eventName](e);
            };
          }
        });
      }

      shouldComponentUpdate(nextProps) {
        return nextProps.data !== this.props.data;
      }

      render() {
        return (
          <g { ...this._events }>
            <Component { ...this.props } ref="child"/>
          </g>
        );
      }
    };
  };
}
