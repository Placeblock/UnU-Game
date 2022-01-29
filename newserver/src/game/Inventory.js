"use strict";
exports.__esModule = true;
exports.Inventory = void 0;
var Inventory = /** @class */ (function () {
    function Inventory() {
        this.cards = [];
    }
    Inventory.prototype.getCards = function () {
        return this.cards;
    };
    Inventory.prototype.getCardByID = function (uuid) {
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            if (card.getUUID() == uuid)
                return card;
        }
        return null;
    };
    Inventory.prototype.addCard = function (unoCard) {
        this.cards.push(unoCard);
    };
    Inventory.prototype.removeCard = function (unoCard) {
        this.cards.splice(this.cards.indexOf(unoCard), 1);
    };
    Inventory.prototype.hasCard = function (unoCard) {
        return this.cards.includes(unoCard);
    };
    Inventory.prototype.hasCardID = function (cardid) {
        return this.cards.filter(function (card) { return card.getUUID() == cardid; }).length > 0;
    };
    Inventory.prototype.size = function () {
        return this.cards.length;
    };
    Inventory.prototype.asJSON = function () {
        var jsoncards = [];
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            jsoncards.push(card.asJson());
        }
        return jsoncards;
    };
    return Inventory;
}());
exports.Inventory = Inventory;
