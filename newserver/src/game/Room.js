"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Room = void 0;
var random_word_slugs_1 = require("random-word-slugs");
var OutJoinedRoomPacket_1 = require("./network/packets/out/room/OutJoinedRoomPacket");
var OutNewOwnerPacket_1 = require("./network/packets/out/room/OutNewOwnerPacket");
var OutPlayerJoinedRoomPacket_1 = require("./network/packets/out/room/OutPlayerJoinedRoomPacket");
var OutPlayerLeftRoomPacket_1 = require("./network/packets/out/room/OutPlayerLeftRoomPacket");
var OutRoundSettingsPacket_1 = require("./network/packets/out/round/OutRoundSettingsPacket");
var OutStartRound_1 = require("./network/packets/out/round/OutStartRound");
var RoomManager_1 = require("./RoomManager");
var Round_1 = require("./Round");
var Room = /** @class */ (function () {
    function Room(owner) {
        this.players = [];
        this.roundsettings = {
            "startcardamount": 7,
            "allowwishonwish": true,
            "allowwishondraw4": true,
            "allowdraw4onwish": true,
            "allowdraw4ondraw4": true,
            "allowdraw4ondraw2": true,
            "allowdraw2ondraw4": false
        };
        this.leaderboard = new Map;
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
    Room.prototype.getLeaderboard = function () {
        return this.leaderboard;
    };
    Room.prototype.increaseLeaderboardPlayer = function (player) {
        if (this.leaderboard.has(player)) {
            this.leaderboard.set(player, this.leaderboard.get(player) + 1);
        }
        else {
            this.leaderboard.set(player, 1);
        }
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
        this.leaderboard["delete"](player);
        console.log("remove player");
        console.log(this.currentround);
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
    Room.prototype.startNewRound = function () {
        var round = new Round_1.Round(__spreadArray([], this.players, true), this.roundsettings, this);
        return round;
    };
    Room.prototype.deleteRound = function () {
        this.currentround = null;
    };
    Room.prototype.setRoundSettings = function (roundSettings) {
        this.roundsettings = roundSettings;
        this.sendToAllPlayers(new OutRoundSettingsPacket_1.OutRoundSettingsPacket(roundSettings), []);
    };
    Room.prototype.getRoundSettings = function () {
        return this.roundsettings;
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
        this.currentround = new Round_1.Round(this.players, this.roundsettings, this);
        this.sendToAllPlayers(new OutStartRound_1.OutStartRoundPacket(this.currentround), []);
    };
    Room.prototype.asJSON = function () {
        var _a;
        var jsonplayers = [];
        for (var _i = 0, _b = this.players; _i < _b.length; _i++) {
            var player = _b[_i];
            jsonplayers.push(player.asJSON());
        }
        return { "name": this.name,
            "owner": this.owner.asJSON(),
            "players": jsonplayers,
            "settings": this.roundsettings,
            "round": (_a = this.currentround) === null || _a === void 0 ? void 0 : _a.asJSON() };
    };
    return Room;
}());
exports.Room = Room;
