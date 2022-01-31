"use strict";
exports.__esModule = true;
exports.Room = void 0;
var random_word_slugs_1 = require("random-word-slugs");
var OutJoinedRoomPacket_1 = require("./network/packets/out/room/OutJoinedRoomPacket");
var OutNewOwnerPacket_1 = require("./network/packets/out/room/OutNewOwnerPacket");
var OutPlayerJoinedRoomPacket_1 = require("./network/packets/out/room/OutPlayerJoinedRoomPacket");
var OutPlayerLeftRoomPacket_1 = require("./network/packets/out/room/OutPlayerLeftRoomPacket");
var RoomManager_1 = require("./RoomManager");
var Round_1 = require("./Round");
var Room = /** @class */ (function () {
    function Room(owner) {
        this.players = [];
        this.owner = owner;
        this.name = (0, random_word_slugs_1.generateSlug)();
        this.addPlayer(this.owner);
    }
    Room.prototype.getName = function () {
        return this.name;
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
        this.sendToAllPlayers(new OutPlayerJoinedRoomPacket_1.OutPlayerJoinedRoomPacket(player), [player]);
        player.send(new OutJoinedRoomPacket_1.OutJoinedRoomPacket(this));
    };
    Room.prototype.removePlayer = function (player) {
        if (!this.players.includes(player)) {
            console.warn("Tried to remove non existing player from Room!");
            return;
        }
        this.players.splice(this.players.indexOf(player), 1);
        if (this.currentround != undefined) {
            this.currentround.removePlayer(player);
        }
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
    Room.prototype.asJSON = function () {
        var _a;
        var jsonplayers = [];
        for (var _i = 0, _b = this.players; _i < _b.length; _i++) {
            var player = _b[_i];
            jsonplayers.push(player.asJSON());
        }
        return { "name": this.name, "owner": this.owner.asJSON(), "players": jsonplayers, "round": (_a = this.currentround) === null || _a === void 0 ? void 0 : _a.asJSON() };
    };
    return Room;
}());
exports.Room = Room;
