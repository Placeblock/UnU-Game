"use strict";
exports.__esModule = true;
exports.randomCard = void 0;
var NumberUnoCard_1 = require("./number/NumberUnoCard");
var DrawFourUnoCard_1 = require("./special/DrawFourUnoCard");
var DrawTwoUnoCard_1 = require("./special/DrawTwoUnoCard");
var InvertDirectionUnoCard_1 = require("./special/InvertDirectionUnoCard");
var SuspendUnoCard_1 = require("./special/SuspendUnoCard");
var WishUnoCard_1 = require("./special/WishUnoCard");
var UnoCard_1 = require("./UnoCard");
function randomCard() {
    var random = Math.random() * 72;
    if (random < 4) {
        return new DrawFourUnoCard_1.DrawFourUnoCard();
    }
    else if (random < 8) {
        return new WishUnoCard_1.WishUnoCard();
    }
    else if (random < 16) {
        return new InvertDirectionUnoCard_1.InvertDirectionUnoCard(UnoCard_1.UnoCard.randomColor());
    }
    else if (random < 24) {
        return new DrawTwoUnoCard_1.DrawTwoUnoCard(UnoCard_1.UnoCard.randomColor());
    }
    else if (random < 32) {
        return new SuspendUnoCard_1.SuspendUnUCard(UnoCard_1.UnoCard.randomColor());
    }
    else {
        return new NumberUnoCard_1.NumberUnoCard(UnoCard_1.UnoCard.randomColor(), Math.floor(Math.random() * 9));
    }
}
exports.randomCard = randomCard;
