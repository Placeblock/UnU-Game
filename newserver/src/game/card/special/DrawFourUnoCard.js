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
exports.DrawFourUnoCard = void 0;
var DrawTwoUnoCard_1 = require("./DrawTwoUnoCard");
var SpecialUnoCard_1 = require("./SpecialUnoCard");
var WishUnoCard_1 = require("./WishUnoCard");
var DrawFourUnoCard = /** @class */ (function (_super) {
    __extends(DrawFourUnoCard, _super);
    function DrawFourUnoCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrawFourUnoCard.prototype.getRandom = function () {
        return new DrawFourUnoCard();
    };
    DrawFourUnoCard.prototype.isValidNextCard = function (round, card) {
        if ("color" in card && card["color"] != round.getForcedColor())
            return false;
        if (card instanceof DrawTwoUnoCard_1.DrawTwoUnoCard && !round.getSettings().allowdraw2ondraw4)
            return false;
        if (card instanceof DrawFourUnoCard && !round.getSettings().allowdraw4ondraw4)
            return false;
        if (card instanceof WishUnoCard_1.WishUnoCard && !round.getSettings().allowwishondraw4)
            return false;
        return true;
    };
    DrawFourUnoCard.prototype.asJson = function () {
        return { "uuid": this.uuid, "type": "draw4" };
    };
    return DrawFourUnoCard;
}(SpecialUnoCard_1.SpecialUnoCard));
exports.DrawFourUnoCard = DrawFourUnoCard;
