import initState from "../../common/initState";
import * as types from "../../common/ActionTypes";

const _initState = { ...initState, ...{} };

export default (state = _initState, action) => {
  switch (action.type) {
  case types.SET_STATE:
    return { ...state, ...action.state };
  }
  return state;
};
