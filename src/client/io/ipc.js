import * as types from "../../common/ActionTypes";

export function ipcIO() {
  const { ipcRenderer } = global.require("electron");

  function recvState(callback) {
    ipcRenderer.on(types.SET_STATE, (_, state) => {
      callback(state);
    });
  }

  function sendAction(action) {
    ipcRenderer.send(types.SEND_ACTION, action);
  }

  return { recvState, sendAction };
}
