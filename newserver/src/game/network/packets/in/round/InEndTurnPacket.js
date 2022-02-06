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
exports.InEndTurnPacket = void 0;
var InPacket_1 = require("../InPacket");
var InEndTurnPacket = /** @class */ (function (_super) {
    __extends(InEndTurnPacket, _super);
    function InEndTurnPacket(player) {
        var _this = _super.call(this) || this;
        _this.player = player;
        return _this;
    }
    InEndTurnPacket.prototype.getPlayer = function () {
        return this.player;
    };
    InEndTurnPacket.getFromJSON = function (player, json) {
        return new InEndTurnPacket(player);
    };
    return InEndTurnPacket;
}(InPacket_1.InPacket));
exports.InEndTurnPacket = InEndTurnPacket;
