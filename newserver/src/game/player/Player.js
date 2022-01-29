"use strict";
exports.__esModule = true;
exports.Player = void 0;
var uuid_1 = require("uuid");
var InChangeNamePacket_1 = require("../network/packets/in/InChangeNamePacket");
var InDrawCardPacket_1 = require("../network/packets/in/InDrawCardPacket");
var InPlayCardPacket_1 = require("../network/packets/in/InPlayCardPacket");
var InStartRound_1 = require("../network/packets/in/InStartRound");
var InWishColorPacket_1 = require("../network/packets/in/InWishColorPacket");
var OutInvalidMessagePacket_1 = require("../network/packets/out/OutInvalidMessagePacket");
var OutPlayerChangedNamePacket_1 = require("../network/packets/out/room/OutPlayerChangedNamePacket");
var OutPlayerLeftRoomPacket_1 = require("../network/packets/out/room/OutPlayerLeftRoomPacket");
var OutPlayerLeftRoundPacket_1 = require("../network/packets/out/round/OutPlayerLeftRoundPacket");
var unique_names_generator_1 = require("unique-names-generator");
var Room_1 = require("../Room");
var InJoinRoomPacket_1 = require("../network/packets/in/InJoinRoomPacket");
var RoomManager_1 = require("../RoomManager");
var Player = /** @class */ (function () {
    function Player() {
        this.uuid = (0, uuid_1.v4)();
        this.name = (0, unique_names_generator_1.uniqueNamesGenerator)({ "dictionaries": [unique_names_generator_1.adjectives, unique_names_generator_1.colors, unique_names_generator_1.animals], "separator": ' ' });
    }
    ;
    Player.prototype.getUUID = function () {
        return this.uuid;
    };
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.asJSON = function () {
        return { "name": this.name, "uuid": this.uuid };
    };
    Player.prototype.getCurrentRoom = function () {
        return this.currentroom;
    };
    Player.prototype.setCurrentRoom = function (newroom) {
        this.currentroom = newroom;
    };
    Player.prototype.setName = function (newname) {
        this.name = newname;
    };
    Player.prototype.receive = function (action, data) {
        switch (action) {
            case "createRoom":
                if (this.currentroom != undefined) {
                    this.currentroom.removePlayer(this);
                }
                this.currentroom = new Room_1.Room(this);
                RoomManager_1.RoomManager.registerRoom(this.currentroom);
                break;
            case "joinRoom":
                var inJoinRoomPacket = InJoinRoomPacket_1.InJoinRoomPacket.getFromJSON(this, data);
                if (inJoinRoomPacket == null)
                    return;
                var room = RoomManager_1.RoomManager.getRoom(inJoinRoomPacket.getUUID());
                if (room == null)
                    return;
                if (this.currentroom != undefined) {
                    this.currentroom.removePlayer(this);
                }
                room.addPlayer(this);
            case "quitRoom":
                if (this.currentroom == undefined)
                    return;
                this.currentroom.removePlayer(this);
                this.send(new OutPlayerLeftRoomPacket_1.OutPlayerLeftRoomPacket(this));
                break;
            case "quitRound":
                if (this.currentroom == undefined)
                    return;
                if (this.currentroom.getCurrentRound() == undefined)
                    return;
                this.currentroom.getCurrentRound().removePlayer(this);
                this.send(new OutPlayerLeftRoundPacket_1.OutPlayerLeftRoundPacket(this));
                break;
            case "setName":
                var inChangeNamePacket = InChangeNamePacket_1.InChangeNamePacket.getFromJSON(this, data);
                if (inChangeNamePacket == null)
                    return;
                this.name = inChangeNamePacket.getName();
                if (this.currentroom == undefined)
                    return;
                this.currentroom.sendToAllPlayers(new OutPlayerChangedNamePacket_1.OutPlayerChangedNamePacket(this, inChangeNamePacket.getName()), [this]);
                break;
            case "drawCard":
                var inDrawCardPacket = InDrawCardPacket_1.InDrawCardPacket.getFromJSON(this, data);
                if (inDrawCardPacket == null)
                    return;
                if (this.currentroom == undefined)
                    return;
                if (this.currentroom.getCurrentRound() == undefined)
                    return;
                this.currentroom.getCurrentRound().receiveDrawCard(inDrawCardPacket);
                break;
            case "wishColor":
                var inWishColorPacket = InWishColorPacket_1.InWishColorPacket.getFromJSON(this, data);
                if (inWishColorPacket == null)
                    return;
                if (this.currentroom == undefined)
                    return;
                if (this.currentroom.getCurrentRound() == undefined)
                    return;
                this.currentroom.getCurrentRound().receiveWishColor(inWishColorPacket);
                break;
            case "playCard":
                var inPlayCardPacket = InPlayCardPacket_1.InPlayCardPacket.getFromJSON(this, data);
                if (inPlayCardPacket == null)
                    return;
                if (this.currentroom == undefined)
                    return;
                if (this.currentroom.getCurrentRound() == undefined)
                    return;
                this.currentroom.getCurrentRound().receivePlayCard(inPlayCardPacket);
                break;
            case "startRound":
                var inStartRoundPacket = InStartRound_1.InStartRoundPacket.getFromJSON(this, data);
                if (inStartRoundPacket == null)
                    return;
                if (this.currentroom == undefined)
                    return;
                if (this.currentroom.getCurrentRound() == undefined)
                    return;
                this.currentroom.receiveStartRound(inStartRoundPacket);
                break;
            default:
                this.send(new OutInvalidMessagePacket_1.OutInvalidMessagePacket("Invalid Message", { "action": action, "data": data }));
                break;
        }
    };
    Player.prototype.clearUpPlayer = function () {
        if (this.currentroom != undefined) {
            this.currentroom.removePlayer(this);
        }
    };
    return Player;
}());
exports.Player = Player;