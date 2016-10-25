import React from "react";

export default function Panel() {
  return (Component) => {
    return class Panel extends React.Component {
      shouldComponentUpdate() {
        return false;
      }

      render() {
        return (<Component { ...this.props }/>);
      }
    }
  };
}
