import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, bindActionCreators } from "redux";
import { Provider } from "react-redux";
import isElectron from "is-electron";
import inject from "../common/middlewares/inject";
import App from "./containers/App";
import reducer from "./reducer";
import * as actionCreators from "./actions";
import * as types from "../common/ActionTypes";
import { ipcIO } from "./io/ipc";
import { socketIO } from "./io/webSocket";

window.addEventListener("DOMContentLoaded", () => {
  const store = createStore(reducer, applyMiddleware(inject(stateHandler)));
  const actions = bindActionCreators(actionCreators, store.dispatch);
  const io = isElectron() ? ipcIO() : socketIO();

  io.recvState((state) => {
    actions.setState(state);
  });

  function stateHandler(action) {
    if (action.type !== types.SET_STATE) {
      io.sendAction(action);
    }
  }

  ReactDOM.render(
    <Provider store={ store }>
      <App actions={ actions }/>
    </Provider>
    , document.getElementById("app")
  );
});
