import "run-with-mocha";
import assert from "assert";
import sinon from "sinon";
import React from "react";
import { shallow } from "enzyme";
import noop from "lodash.noop";
import LEDButton from "../../../src/client/components/LEDButton";

function setup(props = {}) {
  props = { cx: 0, cy: 0, color: 0, onClick: noop, ...props };

  const component = shallow(
    <LEDButton { ...props }/>
  );

  return { component, props };
}

describe("components/LEDButton", () => {
  it("root is <rect>", () => {
    const { component } = setup();

    assert(component.root.type() === "rect");
    assert(component.root.hasClass("led-button"));
  });

  it("call onClick() when 'onClick'", () => {
    const props = { dataIndex: 1, onClick: sinon.spy() };
    const { component } = setup(props);
    const elem = component.root;

    elem.simulate("click");
    assert(props.onClick.callCount === 1);
  });
});
