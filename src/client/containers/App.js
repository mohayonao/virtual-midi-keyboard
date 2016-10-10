import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ColorDefs from "../components/ColorDefs";
import Panel from "../components/Panel";
import OctaveViewer from "../components/OctaveViewer";
import VelocityViewer from "../components/VelocityViewer";
import MIDIChannelViewer from "../components/MIDIChannelViewer";
import PianoKeyboard from "../components/PianoKeyboard";
import { keyDown, keyUp } from "./KeyHandler";

class App extends Component {
  static propTypes = {
    actions : PropTypes.objectOf(PropTypes.func).isRequired,
    data    : PropTypes.arrayOf(PropTypes.number).isRequired,
    octave  : PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.state = { width: window.innerWidth, height: window.innerHeight };

    this.onResize = ::this.onResize;
    this.onTouchStart = ::this.onTouchStart;
    this.onTouchEnd = ::this.onTouchEnd;
    this.onKeyDown = ::this.onKeyDown;
    this.onKeyUp = ::this.onKeyUp;
    this.onNoteOn = ::this.onNoteOn;
    this.onNoteOff = ::this.onNoteOff;
    this.onOctaveSelect = ::this.onOctaveSelect;
    this.onVelocitySelect = ::this.onVelocitySelect;
    this.onMIDIChannelSelect = ::this.onMIDIChannelSelect;
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("touchstart", this.onTouchStart);
    window.addEventListener("touchend", this.onTouchEnd);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("touchstart", this.onTouchStart);
    window.removeEventListener("touchend", this.onTouchEnd);
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }

  onResize() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onTouchStart(e) {
    e.preventDefault();
  }

  onTouchEnd(e) {
    e.preventDefault();
  }

  onKeyDown(e) {
    keyDown(e.keyCode, this.props);
  }

  onKeyUp(e) {
    keyUp(e.keyCode, this.props);
  }

  onNoteOn(noteNumber) {
    const { actions, velocity } = this.props;

    actions.noteOn(noteNumber, velocity);
  }

  onNoteOff(noteNumber) {
    const { actions, velocity } = this.props;

    actions.noteOff(noteNumber, velocity);
  }

  onOctaveSelect(index) {
    const { actions } = this.props;

    actions.octaveSet(index);
  }

  onVelocitySelect(index) {
    const { actions } = this.props;

    actions.velocitySet([ 1, 20, 40, 60, 80, 100, 120, 127 ][index]);
  }

  onMIDIChannelSelect(index) {
    const { actions } = this.props;

    actions.midiChannelSet(index);
  }

  render() {
    const width  = window.innerWidth;
    const height = window.innerHeight;
    const style  = {};

    if (width < height * 3.3333) {
      style.width  = width;
      style.height = width / 3.3333;
      style.margin = `${ (height - style.height) / 2 }px 0`;
    } else {
      style.width  = height * 3.3333;
      style.height = height;
      style.margin = `0 ${ (width - style.width) / 2 }px`;
    }

    const { octave } = this.props;
    const cNoteNumber = octave * 12 + 24;

    return (
      <svg className="app" style={ style } viewBox="0 0 1000 300">
        <ColorDefs />
        <Panel />
        <OctaveViewer { ...this.props } x={ 650 } y={ 45 } onSelect={ this.onOctaveSelect }/>
        <VelocityViewer { ...this.props } x={ 800 } y={ 45 } onSelect={ this.onVelocitySelect }/>
        <MIDIChannelViewer { ...this.props } x={ 960 } y={ 45 } onSelect={ this.onMIDIChannelSelect} />
        <PianoKeyboard { ...this.props } x={ 20 } y={ 90 } cNoteNumber={ cNoteNumber } onNoteOn={ this.onNoteOn } onNoteOff={ this.onNoteOff }/>
      </svg>
    );
  }
}

export default connect(state => state)(App);
