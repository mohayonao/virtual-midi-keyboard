import "run-with-mocha";
import assert from "assert";
import React from "react";
import { shallow } from "enzyme";
import noop from "lodash.noop";
import OctaveViewer from "../../../src/client/components/OctaveViewer";

function setup(props = {}) {
  props = { x: 0, y: 0, octave: 0, onSelect: noop, ...props };

  const component = shallow(
    <OctaveViewer { ...props }/>
  );

  return { component, props };
}

describe("components/OctaveViewer", () => {
  it("root is <g>", () => {
    const { component } = setup();

    assert(component.root.type() === "g");
  });

  it("has LEDButton", () => {
    const { component } = setup();
    const elems = component.find("LEDButton");

    assert(elems.length === 8);
  });
});
