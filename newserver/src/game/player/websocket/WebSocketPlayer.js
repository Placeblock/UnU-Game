"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.WebSocketPlayer = void 0;
var OutInvalidMessagePacket_1 = require("../../network/packets/out/OutInvalidMessagePacket");
var Player_1 = require("../Player");
var OutPlayerDataPacket_1 = require("../../network/packets/out/OutPlayerDataPacket");
var WebSocketPlayer = /** @class */ (function (_super) {
    __extends(WebSocketPlayer, _super);
    function WebSocketPlayer(ws) {
        var _this = _super.call(this) || this;
        _this.isAlive = true;
        _this.ws = ws;
        _this.send(new OutPlayerDataPacket_1.OutPlayerDataPacket(_this));
        _this.pingtimer = setInterval(function () {
            if (_this.isAlive === false) {
                _this.close();
                return;
            }
            _this.isAlive = false;
            _this.ws.ping();
        }, 15000);
        ws.on("message", function (data) {
            var json = JSON.parse(data.toString());
            if (!("action" in json) || !("data" in json)) {
                _this.send(new OutInvalidMessagePacket_1.OutInvalidMessagePacket("Provide Action and Data!", json));
                return;
            }
            if (typeof json["data"] != "object") {
                _this.send(new OutInvalidMessagePacket_1.OutInvalidMessagePacket("Data is a string!", json));
                return;
            }
            _this.receive(json["action"], json["data"]);
        });
        ws.on('pong', function () { _this.isAlive = true; });
        ws.on("close", function (data) {
            _this.close();
        });
        return _this;
    }
    WebSocketPlayer.prototype.send = function (packet) {
        this.ws.send(JSON.stringify(packet.asJSON()));
    };
    WebSocketPlayer.prototype.close = function () {
        this.clearUpPlayer();
        this.ws.removeAllListeners();
        clearInterval(this.pingtimer);
        this.pingtimer = undefined;
        this.ws = undefined;
    };
    return WebSocketPlayer;
}(Player_1.Player));
exports.WebSocketPlayer = WebSocketPlayer;
