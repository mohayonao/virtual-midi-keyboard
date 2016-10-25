import UIComponent from "./UIComponent";

export default class LEDPad extends UIComponent {
  constructor(props, styles = {}) {
    super(props);
    this._styles = this.computeStyles(this.props, styles);
    this._onmouse = false;
  }

  onMouseDown() {
    this._onmouse = true;
    this.props.onValueChange(0x7f);
  }

  onMouseUp() {
    this._onmouse = false;
    this.props.onValueChange(0x00);
  }

  onMouseOut() {
    if (this._onmouse) {
      this.onMouseUp();
    }
  }

  onTouchStart() {
    this.onMouseDown();
  }

  onTouchEnd() {
    this.onMouseUp();
  }
}
