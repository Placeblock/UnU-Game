"use strict";
exports.__esModule = true;
exports.RoomManager = void 0;
var RoomManager = /** @class */ (function () {
    function RoomManager() {
    }
    RoomManager.registerRoom = function (room) {
        if (room.getUUID() in this.registeredRooms) {
            console.warn("Tried to register already registered Room!");
            return;
        }
        this.registeredRooms[room.getUUID()] = room;
    };
    RoomManager.unregisterRoom = function (room) {
        if (!(room.getUUID() in this.registeredRooms)) {
            console.warn("Tried to unregister non existing Room!");
            return;
        }
        delete this.registeredRooms[room.getUUID()];
    };
    RoomManager.getRegisteredRooms = function () {
        return this.registeredRooms;
    };
    RoomManager.getRoom = function (uuid) {
        return this.registerRoom[uuid];
    };
    RoomManager.registeredRooms = {};
    return RoomManager;
}());
exports.RoomManager = RoomManager;
