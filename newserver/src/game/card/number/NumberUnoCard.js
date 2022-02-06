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
exports.NumberUnoCard = void 0;
var UnoCard_1 = require("../UnoCard");
var NumberUnoCard = /** @class */ (function (_super) {
    __extends(NumberUnoCard, _super);
    function NumberUnoCard(color, number) {
        var _this = _super.call(this) || this;
        _this.color = color;
        _this.number = number;
        return _this;
    }
    NumberUnoCard.prototype.getColor = function () {
        return this.color;
    };
    NumberUnoCard.prototype.getNumber = function () {
        return this.number;
    };
    NumberUnoCard.prototype.getRandom = function () {
        return new NumberUnoCard(UnoCard_1.UnoCard.randomColor(), Math.floor(Math.random() * 9) + 0);
    };
    NumberUnoCard.prototype.isValidNextCard = function (round, card) {
        if ("color" in card && this.color != card["color"]) {
            if (card instanceof NumberUnoCard && card.number == this.number) {
                return true;
            }
            return false;
        }
        return true;
    };
    NumberUnoCard.prototype.asJson = function () {
        return { "uuid": this.uuid, "type": "number", "color": this.color, "number": this.number };
    };
    return NumberUnoCard;
}(UnoCard_1.UnoCard));
exports.NumberUnoCard = NumberUnoCard;
