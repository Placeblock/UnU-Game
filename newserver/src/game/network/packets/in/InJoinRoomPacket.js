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
exports.InJoinRoomPacket = void 0;
var InPacket_1 = require("./InPacket");
var InJoinRoomPacket = /** @class */ (function (_super) {
    __extends(InJoinRoomPacket, _super);
    function InJoinRoomPacket(player, uuid) {
        var _this = _super.call(this) || this;
        _this.player = player;
        _this.uuid = uuid;
        return _this;
    }
    InJoinRoomPacket.prototype.getPlayer = function () {
        return this.player;
    };
    InJoinRoomPacket.prototype.getUUID = function () {
        return this.uuid;
    };
    InJoinRoomPacket.getFromJSON = function (player, json) {
        if (!("uuid" in json))
            return null;
        return new InJoinRoomPacket(player, json["uuid"]);
    };
    return InJoinRoomPacket;
}(InPacket_1.InPacket));
exports.InJoinRoomPacket = InJoinRoomPacket;
