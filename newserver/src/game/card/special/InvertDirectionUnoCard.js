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
exports.InvertDirectionUnoCard = void 0;
var UnoCard_1 = require("../UnoCard");
var SpecialUnoCard_1 = require("./SpecialUnoCard");
var InvertDirectionUnoCard = /** @class */ (function (_super) {
    __extends(InvertDirectionUnoCard, _super);
    function InvertDirectionUnoCard(color) {
        var _this = _super.call(this) || this;
        _this.color = color;
        return _this;
    }
    InvertDirectionUnoCard.prototype.getRandom = function () {
        return new InvertDirectionUnoCard(UnoCard_1.UnoCard.randomColor());
    };
    InvertDirectionUnoCard.prototype.isValidNextCard = function (round, card) {
        if (card instanceof InvertDirectionUnoCard)
            return true;
        if ("color" in card && card["color"] != this.color)
            return false;
        return true;
    };
    InvertDirectionUnoCard.prototype.getColor = function () {
        return this.color;
    };
    InvertDirectionUnoCard.prototype.asJson = function () {
        return { "uuid": this.uuid, "type": "invert", "color": this.color };
    };
    return InvertDirectionUnoCard;
}(SpecialUnoCard_1.SpecialUnoCard));
exports.InvertDirectionUnoCard = InvertDirectionUnoCard;
