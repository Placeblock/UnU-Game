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
exports.WishUnoCard = void 0;
var DrawFourUnoCard_1 = require("./DrawFourUnoCard");
var SpecialUnoCard_1 = require("./SpecialUnoCard");
var WishUnoCard = /** @class */ (function (_super) {
    __extends(WishUnoCard, _super);
    function WishUnoCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WishUnoCard.prototype.getRandom = function () {
        return new WishUnoCard();
    };
    WishUnoCard.prototype.isValidNextCard = function (round, card) {
        if ("color" in card && card["color"] != round.getForcedColor())
            return false;
        if (card instanceof WishUnoCard && !round.getSettings().allowwishonwish)
            return false;
        if (card instanceof DrawFourUnoCard_1.DrawFourUnoCard && !round.getSettings().allowdraw4onwish)
            return false;
        return true;
    };
    WishUnoCard.prototype.asJson = function () {
        return { "cardid": this.uuid, "type": "wish" };
    };
    return WishUnoCard;
}(SpecialUnoCard_1.SpecialUnoCard));
exports.WishUnoCard = WishUnoCard;
