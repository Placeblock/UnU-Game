"use strict";
exports.__esModule = true;
exports.Player = void 0;
var uuid_1 = require("uuid");
var InChangeNamePacket_1 = require("../network/packets/in/room/InChangeNamePacket");
var InDrawCardPacket_1 = require("../network/packets/in/round/InDrawCardPacket");
var InPlayCardPacket_1 = require("../network/packets/in/round/InPlayCardPacket");
var InStartRound_1 = require("../network/packets/in/round/InStartRound");
var InWishColorPacket_1 = require("../network/packets/in/round/InWishColorPacket");
var OutInvalidMessagePacket_1 = require("../network/packets/out/OutInvalidMessagePacket");
var OutPlayerChangedNamePacket_1 = require("../network/packets/out/room/OutPlayerChangedNamePacket");
var OutPlayerLeftRoomPacket_1 = require("../network/packets/out/room/OutPlayerLeftRoomPacket");
var OutPlayerLeftRoundPacket_1 = require("../network/packets/out/round/OutPlayerLeftRoundPacket");
var random_word_slugs_1 = require("random-word-slugs");
var Room_1 = require("../Room");
var InJoinRoomPacket_1 = require("../network/packets/in/room/InJoinRoomPacket");
var RoomManager_1 = require("../RoomManager");
var OutInvalidJoinRoom_1 = require("../network/packets/out/room/OutInvalidJoinRoom");
var InRoundSettingsPacket_1 = require("../network/packets/in/round/InRoundSettingsPacket");
var Player = /** @class */ (function () {
    function Player() {
        this.uuid = (0, uuid_1.v4)();
        this.name = (0, random_word_slugs_1.generateSlug)(2, { "format": "title",
            "partsOfSpeech": ["adjective", "noun"],
            "categories": {
                adjective: ["color", "appearance"],
                noun: ["animals"]
            } });
    }
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
                if (inJoinRoomPacket == null) {
                    this.send(new OutInvalidMessagePacket_1.OutInvalidMessagePacket("Invalid Message!", data));
                }
                var room = RoomManager_1.RoomManager.getRoom(inJoinRoomPacket.getName());
                if (room == undefined) {
                    this.send(new OutInvalidJoinRoom_1.OutInvalidJoinRoom(inJoinRoomPacket.getName(), "This room doesn't Exist"));
                }
                if (room.getPlayers().includes(this)) {
                    this.send(new OutInvalidJoinRoom_1.OutInvalidJoinRoom(room.getName(), "You are already in this Room!"));
                    return;
                }
                if (this.currentroom != undefined) {
                    this.currentroom.removePlayer(this);
                }
                this.currentroom = room;
                room.addPlayer(this);
                break;
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
            case "roundSettings":
                var inRoundSettingsPacket = InRoundSettingsPacket_1.InRoundSettingsPacket.getFromJSON(this, data);
                if (inRoundSettingsPacket == undefined)
                    return;
                this.currentroom.setRoundSettings(inRoundSettingsPacket.getSettings());
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
            case "setName":
                var inChangeNamePacket = InChangeNamePacket_1.InChangeNamePacket.getFromJSON(this, data);
                if (inChangeNamePacket == null)
                    return;
                this.name = inChangeNamePacket.getName();
                if (this.currentroom == undefined)
                    return;
                this.currentroom.sendToAllPlayers(new OutPlayerChangedNamePacket_1.OutPlayerChangedNamePacket(this), []);
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
            default:
                this.send(new OutInvalidMessagePacket_1.OutInvalidMessagePacket("Invalid Message", { "action": action, "data": data }));
                break;
        }
    };
    Player.prototype.clearUpPlayer = function () {
        if (this.currentroom != undefined) {
            this.currentroom.removePlayer(this);
        }
        this.currentroom == undefined;
    };
    return Player;
}());
exports.Player = Player;
