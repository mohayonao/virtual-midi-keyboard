import * as types from "../../common/ActionTypes";

export function socketIO() {
  const webSocket = global.io();

  function on(type, callback) {
    webSocket.on(type, (state) => {
      callback(state);
    });
  }

  function sendAction(action) {
    if (action.type !== types.SET_STATE && action.type !== types.APPLY_PATCH) {
      webSocket.emit(types.SEND_ACTION, action);
    }
  }

  return { on, sendAction };
}
