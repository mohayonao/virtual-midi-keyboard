import "run-with-mocha";
import assert from "assert";
import React from "react";
import { shallow } from "enzyme";
import ColorDefs from "../../../src/client/components/ColorDefs";

function setup({ props, actions = {} } = {}) {
  props = { ...props };

  const component = shallow(
    <ColorDefs { ...props } actions={ actions }/>
  );

  return { component, props, actions };
}

describe("components/ColorDefs", () => {
  it("wrap <defs>", () => {
    const { component } = setup();

    assert(component.root.type() === "defs")
  });

  it("has radialGradient", () => {
    const { component } = setup();
    const elems = component.find("radialGradient");

    assert(elems.length !== 0);
  });
});
