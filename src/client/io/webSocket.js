import * as types from "../../common/ActionTypes";

export function socketIO() {
  const webSocket = global.io();

  function recvState(callback) {
    webSocket.on(types.SET_STATE, (state) => {
      callback(state);
    });
  }

  function sendAction(action) {
    webSocket.emit(types.SEND_ACTION, action);
  }

  return { recvState, sendAction };
}
