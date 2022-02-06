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
exports.OutCurrentPlayerPacket = void 0;
var OutPacket_1 = require("../OutPacket");
var OutCurrentPlayerPacket = /** @class */ (function (_super) {
    __extends(OutCurrentPlayerPacket, _super);
    function OutCurrentPlayerPacket(player) {
        var _this = _super.call(this) || this;
        _this.action = "currentPlayer";
        _this.player = player;
        return _this;
    }
    OutCurrentPlayerPacket.prototype.asJSON = function () {
        return { "action": this.action, "player": this.player.asJSON(), "timestamp": Date.now() };
    };
    OutCurrentPlayerPacket.prototype.getPlayer = function () {
        return this.player;
    };
    return OutCurrentPlayerPacket;
}(OutPacket_1.OutPacket));
exports.OutCurrentPlayerPacket = OutCurrentPlayerPacket;
