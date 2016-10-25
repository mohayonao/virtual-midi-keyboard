import React, { Component, PropTypes } from "react";

export default class Panel extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const elems = this.props.render();

    if (!Array.isArray(elems) || elems.length === 0) {
      return null;
    }

    return (<g className="panel">{ this.props.render() }</g>);
  }
}
