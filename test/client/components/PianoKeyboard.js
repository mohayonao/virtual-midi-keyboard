import "run-with-mocha";
import assert from "assert";
import React from "react";
import { shallow } from "enzyme";
import noop from "lodash.noop";
import PianoKeyboard from "../../../src/client/components/PianoKeyboard";

function setup(props = {}) {
  props = { x: 0, y: 0, data: [], cNoteNumber: 0, onNoteOn: noop, onNoteOff: noop, ...props };

  const component = shallow(
    <PianoKeyboard { ...props }/>
  );

  return { component, props };
}

describe("components/PianoKeyboard", () => {
  it("root is <g>", () => {
    const { component } = setup();

    assert(component.root.type() === "g");
    assert(component.root.hasClass("piano-keyboard"));
  });
});
