"use strict";
exports.__esModule = true;
exports.CardStack = void 0;
var CardStack = /** @class */ (function () {
    function CardStack() {
    }
    CardStack.registerCard = function (cardType, chance) {
        this.registeredCards.set(cardType, chance);
    };
    CardStack.unregisterCard = function (cardType) {
        if (!this.registeredCards.has(cardType)) {
            console.warn("Tried to unregister non existing Card");
            return;
        }
        this.registeredCards["delete"](cardType);
    };
    CardStack.getRandom = function () {
        var cardarray = [];
        this.registeredCards.forEach(function (value, key) {
            for (var i = 0; i < value; i++) {
                cardarray.push(key);
            }
        });
        return new cardarray[Math.random() * cardarray.length];
    };
    CardStack.registeredCards = new Map;
    return CardStack;
}());
exports.CardStack = CardStack;
