"use strict";
exports.__esModule = true;
exports.RoomManager = void 0;
var RoomManager = /** @class */ (function () {
    function RoomManager() {
    }
    RoomManager.registerRoom = function (room) {
        if (room.getName() in this.registeredRooms) {
            console.warn("Tried to register already registered Room!");
            return;
        }
        this.registeredRooms[room.getName()] = room;
        console.log("registered room:");
        console.log(room.getName());
    };
    RoomManager.unregisterRoom = function (room) {
        if (!(room.getName() in this.registeredRooms)) {
            console.warn("Tried to unregister non existing Room!");
            return;
        }
        console.log("unregistered Room");
        delete this.registeredRooms[room.getName()];
    };
    RoomManager.getRegisteredRooms = function () {
        return this.registeredRooms;
    };
    RoomManager.getRoom = function (name) {
        return this.registeredRooms[name];
    };
    RoomManager.registeredRooms = {};
    return RoomManager;
}());
exports.RoomManager = RoomManager;
