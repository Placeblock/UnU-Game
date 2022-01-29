"use strict";
exports.__esModule = true;
exports.Room = void 0;
var OutNewOwnerPacket_1 = require("./network/packets/out/room/OutNewOwnerPacket");
var OutPlayerJoinedRoomPacket_1 = require("./network/packets/out/room/OutPlayerJoinedRoomPacket");
var OutPlayerLeftRoomPacket_1 = require("./network/packets/out/room/OutPlayerLeftRoomPacket");
var RoomManager_1 = require("./RoomManager");
var Round_1 = require("./Round");
var Room = /** @class */ (function () {
    function Room(owner) {
        this.players = [];
        this.owner = owner;
        console.log("new room");
        this.addPlayer(this.owner);
    }
    Room.prototype.getUUID = function () {
        return this.uuid;
    };
    Room.prototype.getPlayers = function () {
        return this.players;
    };
    Room.prototype.addPlayer = function (player) {
        if (this.players.includes(player)) {
            console.warn("Player is already in this Room");
            return;
        }
        this.players.push(player);
        this.sendToAllPlayers(new OutPlayerJoinedRoomPacket_1.OutPlayerJoinedRoomPacket(player), []);
    };
    Room.prototype.removePlayer = function (player) {
        if (!this.players.includes(player)) {
            console.warn("Tried to remove non existing player from Room!");
            return;
        }
        this.players.splice(this.players.indexOf(player));
        this.currentround.removePlayer(player);
        this.sendToAllPlayers(new OutPlayerLeftRoomPacket_1.OutPlayerLeftRoomPacket(player), []);
        if (player == this.owner) {
            this.owner = this.players[0];
            this.sendToAllPlayers(new OutNewOwnerPacket_1.OutNewOwnerPacket(this.owner), []);
        }
        if (this.players.length == 0) {
            RoomManager_1.RoomManager.unregisterRoom(this);
        }
    };
    Room.prototype.getCurrentRound = function () {
        return this.currentround;
    };
    Room.prototype.startNewRound = function (settings) {
        var round = new Round_1.Round(this.players, settings, this);
        return round;
    };
    Room.prototype.sendToAllPlayers = function (packet, filterplayers) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (filterplayers.includes(player))
                continue;
            player.send(packet);
        }
    };
    Room.prototype.receiveStartRound = function (packet) {
        if (this.currentround != undefined)
            return;
        this.currentround = new Round_1.Round(this.players, packet.getRoundSettings(), this);
    };
    return Room;
}());
exports.Room = Room;
