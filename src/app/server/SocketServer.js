import { EventEmitter } from "events";
import http from "http";
import express from "express";
import socketIO from "socket.io";
import ip from "ip";
import * as types from "../../common/ActionTypes";

export default class SocketServer extends EventEmitter {
  constructor(hostName, port, publicPath) {
    super();

    this.hostName = hostName;
    this.port = port;
    this.state = {};

    this.initServer(publicPath);
  }

  initServer(publicPath) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.webSocket = socketIO(this.server);

    this.app.use(express.static(publicPath));
    this.server.listen(this.port, this.hostName, () => {
      global.console.log(`http://${ ip.address() }:${ this.server.address().port }`);
    });

    this.webSocket.on("connection", (socket) => {
      socket.emit(types.SET_STATE, this.state);
      socket.on(types.SEND_ACTION, (action) => {
        this.emit("action", action);
      });
    });
  }

  setState(state) {
    this.state = state;
  }

  sendState(state) {
    this.state = { ...this.state, ...state };
    this.webSocket.emit(types.SET_STATE, state);
  }
}
