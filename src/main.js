import { app, ipcMain, BrowserWindow  } from "electron";
import path from "path";
import http from "http";
import express from "express";
import socketIO from "socket.io";
import ip from "ip";
import midi from "midi";
import { DEVICE_NAME } from "./client/constants";
import * as types from "./client/constants/ActionTypes";

const PUBLIC_PATH = path.join(__dirname, "..", "public");

let mainWindow = null;
let webSocket  = null;

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 480, height: 480, resizable: false });
  mainWindow.loadURL(`file://${ PUBLIC_PATH }/index.html`);
  mainWindow.setTitle(DEVICE_NAME);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

// WebServer
const PORT = process.env.PORT || 0;
const HOSTNAME = "0.0.0.0";

if (PORT !== 0) {
  const webApp = express();
  const webServer = http.createServer(webApp);

  webSocket = socketIO(webServer);
  webApp.use(express.static(PUBLIC_PATH));

  webServer.listen(PORT, HOSTNAME, () => {
    global.console.log(`http://${ ip.address() }:${ webServer.address().port }`);
  });

  webSocket.on("connection", (socket) => {
    socket.on(types.SEND_MIDI_MESSAGE, (data) => {
      output.sendMessage(data);
    });
  });
}

// MIDI
const input = new midi.input();

input.on("message", (_, data) => {
  if (mainWindow) {
    mainWindow.webContents.send(types.RECV_MIDI_MESSAGE, data);
  }
  if (webSocket) {
    webSocket.emit(types.RECV_MIDI_MESSAGE, data);
  }
});
input.openVirtualPort(DEVICE_NAME);

const output = new midi.output();

ipcMain.on(types.SEND_MIDI_MESSAGE, (_, data) => {
  output.sendMessage(data);
});
output.openVirtualPort(DEVICE_NAME);
