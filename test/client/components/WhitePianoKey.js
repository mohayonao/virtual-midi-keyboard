import "run-with-mocha";
import assert from "assert";
import React from "react";
import { shallow } from "enzyme";
import noop from "lodash.noop";
import { WhitePianoKey } from "../../../src/client/components/PianoKey";

function setup(props = {}) {
  props = { x: 0, y: 0, keyState: false, onNoteOn: noop, onNoteOff: noop, ...props };

  const component = shallow(
    <WhitePianoKey { ...props }/>
  );

  return { component, props };
}

describe("components/PianoKey", () => {
  it("root is <g>", () => {
    const { component } = setup();

    assert(component.root.type() === "g");
    assert(component.root.hasClass("piano-key"));
  });

  it("has <rect>", () => {
    const { component } = setup();
    const elems = component.find("rect");

    assert(elems.length === 1);
  });
});
