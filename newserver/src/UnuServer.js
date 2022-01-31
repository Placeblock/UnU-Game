"use strict";
exports.__esModule = true;
exports.UnUServer = void 0;
var WebSocketManager_1 = require("./game/player/websocket/WebSocketManager");
var UnUServer = /** @class */ (function () {
    function UnUServer() {
        this.websocketManager = new WebSocketManager_1.WebSocketManager(this);
    }
    return UnUServer;
}());
exports.UnUServer = UnUServer;
