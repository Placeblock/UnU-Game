"use strict";
exports.__esModule = true;
exports.WebSocketManager = void 0;
var ws_1 = require("ws");
var https_1 = require("https");
var fs_1 = require("fs");
var WebSocketPlayer_1 = require("./WebSocketPlayer");
var WebSocketManager = /** @class */ (function () {
    function WebSocketManager(unuServer) {
        this.unuServer = unuServer;
        var privateKey = (0, fs_1.readFileSync)('/etc/letsencrypt/live/placeblock.undo.it/privkey.pem');
        var certificate = (0, fs_1.readFileSync)('/etc/letsencrypt/live/placeblock.undo.it/cert.pem');
        this.httpserver = (0, https_1.createServer)({
            cert: certificate,
            key: privateKey
        });
        this.wss = new ws_1.WebSocketServer({ "server": this.httpserver });
        this.wss.on("connection", function (ws) {
            var player = new WebSocketPlayer_1.WebSocketPlayer(ws);
        });
        this.httpserver.listen(8009);
    }
    return WebSocketManager;
}());
exports.WebSocketManager = WebSocketManager;
