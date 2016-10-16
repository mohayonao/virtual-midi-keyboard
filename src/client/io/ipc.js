import * as types from "../../common/ActionTypes";

export function ipcIO() {
  const { ipcRenderer } = global.require("electron");

  function on(type, callback) {
    ipcRenderer.on(type, (_, state) => {
      callback(state);
    });
  }

  function sendAction(action) {
    if (action.type !== types.SET_STATE && action.type !== types.APPLY_PATCH) {
      ipcRenderer.send(types.SEND_ACTION, action);
    }
  }

  return { on, sendAction };
}
