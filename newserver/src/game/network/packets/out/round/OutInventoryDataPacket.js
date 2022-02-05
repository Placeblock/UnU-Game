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
exports.OutInventoryDataPacket = void 0;
var OutPacket_1 = require("../OutPacket");
var OutInventoryDataPacket = /** @class */ (function (_super) {
    __extends(OutInventoryDataPacket, _super);
    function OutInventoryDataPacket(player, inventory) {
        var _this = _super.call(this) || this;
        _this.action = "inventoryData";
        _this.player = player;
        _this.inventory = inventory;
        return _this;
    }
    OutInventoryDataPacket.prototype.getInventory = function () {
        return this.inventory;
    };
    OutInventoryDataPacket.prototype.getPlayer = function () {
        return this.player;
    };
    OutInventoryDataPacket.prototype.asJSON = function () {
        return { "action": this.action, "inventory": this.inventory.asJSON(), "player": this.player.asJSON() };
    };
    return OutInventoryDataPacket;
}(OutPacket_1.OutPacket));
exports.OutInventoryDataPacket = OutInventoryDataPacket;
