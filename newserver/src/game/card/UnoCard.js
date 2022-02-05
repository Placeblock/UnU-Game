"use strict";
exports.__esModule = true;
exports.UnoCard = void 0;
var uuid_1 = require("uuid");
var NumberUnoCard_1 = require("./number/NumberUnoCard");
var UnoCard = /** @class */ (function () {
    function UnoCard() {
        this.uuid = (0, uuid_1.v4)();
    }
    UnoCard.prototype.getUUID = function () {
        return this.uuid;
    };
    UnoCard.randomColor = function () {
        return UnoCard.colors[Math.floor(Math.random() * UnoCard.colors.length)];
    };
    UnoCard.getRandomCard = function () {
        return new NumberUnoCard_1.NumberUnoCard("BLUE", 0);
    };
    UnoCard.colors = [
        "RED",
        "BLUE",
        "GREEN",
        "YELLOW"
    ];
    return UnoCard;
}());
exports.UnoCard = UnoCard;
