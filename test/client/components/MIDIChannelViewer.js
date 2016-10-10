import "run-with-mocha";
import assert from "assert";
import React from "react";
import { shallow } from "enzyme";
import noop from "lodash.noop";
import MIDIChannelViewer from "../../../src/client/components/MIDIChannelViewer";

function setup(props = {}) {
  props = { x: 0, y: 0, midiChannel: 0, onSelect: noop, ...props };

  const component = shallow(
    <MIDIChannelViewer { ...props }/>
  );

  return { component, props };
}

describe("components/MIDIChannelViewer", () => {
  it("root is <text>", () => {
    const props = { midiChannel: 8 };
    const { component } = setup(props);

    assert(component.root.type() === "text");
    assert(component.root.text() === props.midiChannel.toString());
  });
});
