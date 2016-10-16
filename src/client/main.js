import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, bindActionCreators } from "redux";
import { Provider } from "react-redux";
import isElectron from "is-electron";
import inject from "../common/middleware/inject";
import App from "./containers/App";
import reducers from "./reducers";
import * as actionCreators from "./actions";
import * as types from "../common/ActionTypes";
import { ipcIO } from "./io/ipc";
import { socketIO } from "./io/webSocket";

window.addEventListener("DOMContentLoaded", () => {
  const store = createStore(reducers, applyMiddleware(inject(stateHandler)));
  const actions = bindActionCreators(actionCreators, store.dispatch);
  const io = isElectron() ? ipcIO() : socketIO();

  io.on(types.SET_STATE, (state) => {
    actions.setState(state);
  });
  io.on(types.APPLY_PATCH, (patch) => {
    actions.applyPatch(patch);
  });

  function stateHandler(action) {
    io.sendAction(action);
  }

  ReactDOM.render(
    <Provider store={ store }>
      <App actions={ actions }/>
    </Provider>
    , document.getElementById("app")
  );
});
