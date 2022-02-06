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
exports.DrawTwoUnoCard = void 0;
var UnoCard_1 = require("../UnoCard");
var DrawFourUnoCard_1 = require("./DrawFourUnoCard");
var SpecialUnoCard_1 = require("./SpecialUnoCard");
var DrawTwoUnoCard = /** @class */ (function (_super) {
    __extends(DrawTwoUnoCard, _super);
    function DrawTwoUnoCard(color) {
        var _this = _super.call(this) || this;
        _this.color = color;
        return _this;
    }
    DrawTwoUnoCard.prototype.getRandom = function () {
        return new DrawTwoUnoCard(UnoCard_1.UnoCard.randomColor());
    };
    DrawTwoUnoCard.prototype.isValidNextCard = function (round, card) {
        if (card instanceof DrawFourUnoCard_1.DrawFourUnoCard && !round.getSettings().allowdraw4ondraw2)
            return false;
        if (card instanceof DrawTwoUnoCard)
            return true;
        if ("color" in card && card["color"] != this.color)
            return false;
        return true;
    };
    DrawTwoUnoCard.prototype.getColor = function () {
        return this.color;
    };
    DrawTwoUnoCard.prototype.asJson = function () {
        return { "uuid": this.uuid, "type": "draw2", "color": this.color };
    };
    return DrawTwoUnoCard;
}(SpecialUnoCard_1.SpecialUnoCard));
exports.DrawTwoUnoCard = DrawTwoUnoCard;
