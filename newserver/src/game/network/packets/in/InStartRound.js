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
exports.InStartRoundPacket = void 0;
var InPacket_1 = require("./InPacket");
var InStartRoundPacket = /** @class */ (function (_super) {
    __extends(InStartRoundPacket, _super);
    function InStartRoundPacket(player, startcardamount, allowdraw2ondraw4, allowdraw4ondraw2, allowdraw4ondraw4, allowwishondraw4, allowdraw4onwish, allowwishonwish) {
        var _this = _super.call(this) || this;
        _this.player = player;
        _this.roundSettings = { "startcardamount": startcardamount,
            "allowdraw2ondraw4": allowdraw2ondraw4,
            "allowdraw4ondraw2": allowdraw4ondraw2,
            "allowdraw4ondraw4": allowdraw4ondraw4,
            "allowwishondraw4": allowwishondraw4,
            "allowdraw4onwish": allowdraw4onwish,
            "allowwishonwish": allowwishonwish };
        return _this;
    }
    InStartRoundPacket.prototype.getRoundSettings = function () {
        return this.roundSettings;
    };
    InStartRoundPacket.prototype.getPlayer = function () {
        return this.player;
    };
    InStartRoundPacket.getFromJSON = function (player, json) {
        if (!("startcardamount" in json) ||
            !("allowdraw2ondraw4" in json) ||
            !("allowdraw4ondraw2" in json) ||
            !("allowdraw4ondraw4" in json) ||
            !("allowwishondraw4" in json) ||
            !("allowdraw4onwish" in json) ||
            !("allowwishonwish" in json))
            return null;
        return new InStartRoundPacket(player, json["startcardamount"], json["allowdraw2ondraw4"], json["allowdraw4ondraw2"], json["allowdraw4ondraw4"], json["allowwishondraw4"], json["allowdraw4onwish"], json["allowwishonwish"]);
    };
    return InStartRoundPacket;
}(InPacket_1.InPacket));
exports.InStartRoundPacket = InStartRoundPacket;
