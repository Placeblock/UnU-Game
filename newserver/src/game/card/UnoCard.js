"use strict";
exports.__esModule = true;
exports.UnoCard = void 0;
var uuidv4_1 = require("uuidv4");
var UnoCard = /** @class */ (function () {
    function UnoCard() {
        this.uuid = (0, uuidv4_1.uuid)();
    }
    UnoCard.prototype.getUUID = function () {
        return this.uuid;
    };
    return UnoCard;
}());
exports.UnoCard = UnoCard;
