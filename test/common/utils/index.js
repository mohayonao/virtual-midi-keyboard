import "run-with-mocha";
import assert from "assert";
import * as utils from "../../../src/common/utils";

describe("utils", () => {
  it("clamp", () => {
    assert(utils.clamp(100, 110, 120) === 110);
    assert(utils.clamp(115, 110, 120) === 115);
    assert(utils.clamp(130, 110, 120) === 120);
  });
});
