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
exports.OutInvalidJoinRoom = void 0;
var OutPacket_1 = require("../OutPacket");
var OutInvalidJoinRoom = /** @class */ (function (_super) {
    __extends(OutInvalidJoinRoom, _super);
    function OutInvalidJoinRoom(room, reason) {
        var _this = _super.call(this) || this;
        _this.action = "invalidJoinRoom";
        _this.room = room;
        _this.reason = reason;
        return _this;
    }
    OutInvalidJoinRoom.prototype.asJSON = function () {
        return { "action": this.action, "room": this.room, "reason": this.reason };
    };
    OutInvalidJoinRoom.prototype.getRoom = function () {
        return this.room;
    };
    OutInvalidJoinRoom.prototype.getReason = function () {
        return this.reason;
    };
    return OutInvalidJoinRoom;
}(OutPacket_1.OutPacket));
exports.OutInvalidJoinRoom = OutInvalidJoinRoom;
