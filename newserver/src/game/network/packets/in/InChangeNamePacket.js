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
exports.InChangeNamePacket = void 0;
var InPacket_1 = require("./InPacket");
var InChangeNamePacket = /** @class */ (function (_super) {
    __extends(InChangeNamePacket, _super);
    function InChangeNamePacket(player, name) {
        var _this = _super.call(this) || this;
        _this.player = player;
        _this.name = name;
        return _this;
    }
    InChangeNamePacket.prototype.getPlayer = function () {
        return this.player;
    };
    InChangeNamePacket.prototype.getName = function () {
        return this.name;
    };
    InChangeNamePacket.getFromJSON = function (player, json) {
        if (!("name" in json))
            return null;
        var name = json["name"].substring(0, 16);
        return new InChangeNamePacket(player, name);
    };
    return InChangeNamePacket;
}(InPacket_1.InPacket));
exports.InChangeNamePacket = InChangeNamePacket;
