import LEDPadRect from "./ui/LEDPadRect";

export default class LEDButton extends LEDPadRect {
  constructor(props) {
    super(props, { size: 16, rx: 4, ry: 4 });
  }
}
