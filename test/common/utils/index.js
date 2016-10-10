import "run-with-mocha";
import assert from "assert";
import * as utils from "../../../src/common/utils";

describe("utils", () => {
  it("clamp", () => {
    assert(utils.clamp(100, 110, 120) === 110);
    assert(utils.clamp(115, 110, 120) === 115);
    assert(utils.clamp(130, 110, 120) === 120);
  });

  it("isEmpty", () => {
    assert(utils.isEmpty({}) === true);
    assert(utils.isEmpty({ value: 0 }) === false);
  });

  it("diff", () => {
    const a = { val1: 1, val2: 2 };
    const b = { val1: 1, val2: 3 };
    const actual = utils.diff(a, b);
    const expected = { val2: 3 };

    assert.deepEqual(actual, expected);
  });
});
