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
exports.InRoundSettingsPacket = void 0;
var InPacket_1 = require("../InPacket");
var InRoundSettingsPacket = /** @class */ (function (_super) {
    __extends(InRoundSettingsPacket, _super);
    function InRoundSettingsPacket(player, settings) {
        var _this = _super.call(this) || this;
        _this.settings = settings;
        _this.player = player;
        return _this;
    }
    InRoundSettingsPacket.prototype.getPlayer = function () {
        return this.player;
    };
    InRoundSettingsPacket.prototype.getSettings = function () {
        return this.settings;
    };
    InRoundSettingsPacket.getFromJSON = function (player, json) {
        if (!("settings" in json))
            return undefined;
        if (!("startcardamount" in json["settings"]))
            return undefined;
        if (!("allowdraw2ondraw4" in json["settings"]))
            return undefined;
        if (!("allowdraw4ondraw2" in json["settings"]))
            return undefined;
        if (!("allowdraw4ondraw4" in json["settings"]))
            return undefined;
        if (!("allowwishondraw4" in json["settings"]))
            return undefined;
        if (!("allowdraw4onwish" in json["settings"]))
            return undefined;
        if (!("allowwishonwish" in json["settings"]))
            return undefined;
        return new InRoundSettingsPacket(player, {
            "startcardamount": json["settings"]["startcardamount"],
            "allowdraw2ondraw4": json["settings"]["allowdraw2ondraw4"],
            "allowdraw4ondraw2": json["settings"]["allowdraw4ondraw2"],
            "allowdraw4ondraw4": json["settings"]["allowdraw4ondraw4"],
            "allowwishondraw4": json["settings"]["allowwishondraw4"],
            "allowdraw4onwish": json["settings"]["allowdraw4onwish"],
            "allowwishonwish": json["settings"]["allowwishonwish"]
        });
    };
    return InRoundSettingsPacket;
}(InPacket_1.InPacket));
exports.InRoundSettingsPacket = InRoundSettingsPacket;
