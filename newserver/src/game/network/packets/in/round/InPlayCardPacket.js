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
exports.InPlayCardPacket = void 0;
var InPacket_1 = require("../InPacket");
var InPlayCardPacket = /** @class */ (function (_super) {
    __extends(InPlayCardPacket, _super);
    function InPlayCardPacket(player, cardid) {
        var _this = _super.call(this) || this;
        _this.cardid = cardid;
        _this.player = player;
        return _this;
    }
    InPlayCardPacket.prototype.getCardID = function () {
        return this.cardid;
    };
    InPlayCardPacket.prototype.getPlayer = function () {
        return this.player;
    };
    InPlayCardPacket.getFromJSON = function (player, json) {
        if (!("cardid" in json))
            return null;
        return new InPlayCardPacket(player, json["cardid"]);
    };
    return InPlayCardPacket;
}(InPacket_1.InPacket));
exports.InPlayCardPacket = InPlayCardPacket;
