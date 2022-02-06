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
exports.SuspendUnUCard = void 0;
var UnoCard_1 = require("../UnoCard");
var SpecialUnoCard_1 = require("./SpecialUnoCard");
var SuspendUnUCard = /** @class */ (function (_super) {
    __extends(SuspendUnUCard, _super);
    function SuspendUnUCard(color) {
        var _this = _super.call(this) || this;
        _this.color = color;
        return _this;
    }
    SuspendUnUCard.prototype.getRandom = function () {
        return new SuspendUnUCard(UnoCard_1.UnoCard.randomColor());
    };
    SuspendUnUCard.prototype.isValidNextCard = function (round, card) {
        if (card instanceof SuspendUnUCard)
            return true;
        if ("color" in card && card["color"] != this.color)
            return false;
        return true;
    };
    SuspendUnUCard.prototype.getColor = function () {
        return this.color;
    };
    SuspendUnUCard.prototype.asJson = function () {
        return { "uuid": this.uuid, "type": "suspend", "color": this.color };
    };
    return SuspendUnUCard;
}(SpecialUnoCard_1.SpecialUnoCard));
exports.SuspendUnUCard = SuspendUnUCard;
