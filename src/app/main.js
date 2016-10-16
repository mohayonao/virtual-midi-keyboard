import path from "path";
import { app, ipcMain, BrowserWindow  } from "electron";
import { createStore, applyMiddleware, bindActionCreators } from "redux";
import { compare as diff } from "fast-json-patch";
import inject from "../common/middlewares/inject";
import reducer from "./reducer";
import MIDIDevice from "./midi/MIDIDevice";
import SocketServer from "./server/SocketServer";
import * as actionCreators from "./actions";
import * as types from "../common/ActionTypes";
import { DEVICE_NAME } from "../common/constants";

const PUBLIC_PATH = path.join(__dirname, "..", "..", "public");

const store = createStore(reducer, applyMiddleware(inject(midiHandler)));
const actions = bindActionCreators(actionCreators, store.dispatch);

let mainWindow = null;
let server = null;
let state = store.getState();

const midiDevice = new MIDIDevice(DEVICE_NAME, actions);

app.on("window-all-closed", () => {
  actions.allNoteOff();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 480, height: 160 });
  mainWindow.loadURL(`file://${ PUBLIC_PATH }/index.html`);
  mainWindow.setTitle(DEVICE_NAME);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

store.subscribe(() => {
  const nextState = store.getState();

  updateState(nextState);
  midiDevice.setState(nextState);
});

ipcMain.on(types.SEND_ACTION, (_, action) => {
  recvAction(action);
});

function midiHandler(action) {
  midiDevice.doAction(action);
}

function recvAction(action) {
  store.dispatch(action);
}

function updateState(nextState) {
  if (nextState === state) {
    return;
  }
  const patch = diff(state, nextState);

  if (patch.length) {
    if (mainWindow) {
      mainWindow.webContents.send(types.APPLY_PATCH, patch);
    }
    if (server) {
      server.applyPatch(patch);
    }
  }

  state = nextState;
}

// WebServer
const HOSTNAME = "0.0.0.0";
const PORT = process.env.PORT || 0;

if (PORT !== 0) {
  server = new SocketServer(HOSTNAME, PORT, PUBLIC_PATH);
  server.setState(state);
  server.on("action", (action) => {
    recvAction(action);
  });
}
