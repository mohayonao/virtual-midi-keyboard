import "run-with-mocha";
import assert from "assert";
import sinon from "sinon";
import React from "react";
import { shallow } from "enzyme";
import noop from "lodash.noop";
import PianoKey from "../../../src/client/components/PianoKey";

function setup(props = {}) {
  props = { x: 0, y: 0, keyState: false, onNoteOn: noop, onNoteOff: noop, ...props };

  const component = shallow(
    <PianoKey { ...props }/>
  );

  return { component, props };
}

describe("components/PianoKey", () => {
  it("root is <g>", () => {
    const { component } = setup();

    assert(component.root.type() === "g");
    assert(component.root.hasClass("piano-key"));
  });

  it("call onNoteOn() when 'mousedown'", () => {
    const props = { onNoteOn: sinon.spy() };
    const { component } = setup(props);
    const elem = component.root;

    elem.simulate("mousedown");
    assert(props.onNoteOn.callCount === 1);
  });

  it("call onNoteOff() when 'mouseup'", () => {
    const props = { onNoteOff: sinon.spy() };
    const { component } = setup(props);
    const elem = component.root;

    elem.simulate("mouseup");
    assert(props.onNoteOff.callCount === 1);
  });

  it("call onNoteOff() when 'mouseout'", () => {
    const props = { onNoteOff: sinon.spy() };
    const { component } = setup(props);
    const elem = component.root;

    elem.simulate("mousedown");
    elem.simulate("mouseout");
    assert(props.onNoteOff.callCount === 1);
  });

  it("call onNoteOn() when 'touchstart'", () => {
    const props = { onNoteOn: sinon.spy() };
    const { component } = setup(props);
    const elem = component.root;

    elem.simulate("touchstart");
    assert(props.onNoteOn.callCount === 1);
  });

  it("call onNoteOff() when 'touchend'", () => {
    const props = { onNoteOff: sinon.spy() };
    const { component } = setup(props);
    const elem = component.root;

    elem.simulate("touchend");
    assert(props.onNoteOff.callCount === 1);
  });
});
