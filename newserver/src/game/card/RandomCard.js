"use strict";
exports.__esModule = true;
exports.randomCard = void 0;
var NumberUnoCard_1 = require("./number/NumberUnoCard");
var UnoCard_1 = require("./UnoCard");
function randomCard() {
    return new NumberUnoCard_1.NumberUnoCard(UnoCard_1.UnoCard.randomColor(), Math.floor(Math.random() * 9));
}
exports.randomCard = randomCard;
