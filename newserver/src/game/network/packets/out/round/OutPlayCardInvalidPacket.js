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
exports.OutPlayCardInvalidPacket = void 0;
var OutPacket_1 = require("../OutPacket");
var OutPlayCardInvalidPacket = /** @class */ (function (_super) {
    __extends(OutPlayCardInvalidPacket, _super);
    function OutPlayCardInvalidPacket(reason) {
        var _this = _super.call(this) || this;
        _this.action = "playCardInvalid";
        _this.reason = reason;
        return _this;
    }
    OutPlayCardInvalidPacket.prototype.asJSON = function () {
        return { "action": this.action, "reason": this.reason };
    };
    OutPlayCardInvalidPacket.prototype.getReason = function () {
        return this.reason;
    };
    return OutPlayCardInvalidPacket;
}(OutPacket_1.OutPacket));
exports.OutPlayCardInvalidPacket = OutPlayCardInvalidPacket;
