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
exports.InCreateRoomPacket = void 0;
var InPacket_1 = require("./InPacket");
var InCreateRoomPacket = /** @class */ (function (_super) {
    __extends(InCreateRoomPacket, _super);
    function InCreateRoomPacket(player) {
        var _this = _super.call(this) || this;
        _this.player = player;
        return _this;
    }
    InCreateRoomPacket.prototype.getPlayer = function () {
        return this.player;
    };
    InCreateRoomPacket.getFromJSON = function (player, json) {
        return new InCreateRoomPacket(player);
    };
    return InCreateRoomPacket;
}(InPacket_1.InPacket));
exports.InCreateRoomPacket = InCreateRoomPacket;
