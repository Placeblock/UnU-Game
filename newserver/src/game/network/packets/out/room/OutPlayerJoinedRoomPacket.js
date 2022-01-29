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
exports.OutPlayerJoinedRoomPacket = void 0;
var OutPacket_1 = require("../OutPacket");
var OutPlayerJoinedRoomPacket = /** @class */ (function (_super) {
    __extends(OutPlayerJoinedRoomPacket, _super);
    function OutPlayerJoinedRoomPacket(player) {
        var _this = _super.call(this) || this;
        _this.action = "playerJoinedRoom";
        _this.player = player;
        return _this;
    }
    OutPlayerJoinedRoomPacket.prototype.asJSON = function () {
        return { "action": this.action, "player": this.player.asJSON() };
    };
    OutPlayerJoinedRoomPacket.prototype.getPlayer = function () {
        return this.player;
    };
    return OutPlayerJoinedRoomPacket;
}(OutPacket_1.OutPacket));
exports.OutPlayerJoinedRoomPacket = OutPlayerJoinedRoomPacket;
