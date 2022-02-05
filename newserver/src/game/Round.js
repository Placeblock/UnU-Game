"use strict";
exports.__esModule = true;
exports.Round = void 0;
var NumberUnoCard_1 = require("./card/number/NumberUnoCard");
var DrawFourUnoCard_1 = require("./card/special/DrawFourUnoCard");
var WishUnoCard_1 = require("./card/special/WishUnoCard");
var UnoCard_1 = require("./card/UnoCard");
var Inventory_1 = require("./Inventory");
var OutCurrentPlayerPacket_1 = require("./network/packets/out/round/OutCurrentPlayerPacket");
var OutForcedColorPacket_1 = require("./network/packets/out/round/OutForcedColorPacket");
var OutInventoryDataPacket_1 = require("./network/packets/out/round/OutInventoryDataPacket");
var OutPlayCardInvalidPacket_1 = require("./network/packets/out/round/OutPlayCardInvalidPacket");
var OutPlayerDrawHiddenPacket_1 = require("./network/packets/out/round/OutPlayerDrawHiddenPacket");
var OutPlayerDrawPacket_1 = require("./network/packets/out/round/OutPlayerDrawPacket");
var OutPlayerLeftRoundPacket_1 = require("./network/packets/out/round/OutPlayerLeftRoundPacket");
var OutPlayerPlayCardPacket_1 = require("./network/packets/out/round/OutPlayerPlayCardPacket");
var OutWishCardInvalidPacket_1 = require("./network/packets/out/round/OutWishCardInvalidPacket");
var Round = /** @class */ (function () {
    function Round(players, settings, room) {
        this.players = [];
        this.currentplayerplayedcard = false;
        this.inventorys = new Map;
        this.leaderboard = [];
        this.room = room;
        this.players = players;
        this.currentplayer = players[Math.floor(Math.random() * players.length)];
        this.settings = settings;
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            var cardjsonlist = [];
            this.inventorys.set(player, new Inventory_1.Inventory());
            for (var i = 0; i < this.settings.startcardamount; i++) {
                var card = UnoCard_1.UnoCard.getRandomCard();
                cardjsonlist.push(card.asJson());
                this.inventorys.get(player).addCard(card);
            }
            player.send(new OutInventoryDataPacket_1.OutInventoryDataPacket(player, this.inventorys.get(player)));
        }
        this.currentcard = new NumberUnoCard_1.NumberUnoCard(UnoCard_1.UnoCard.randomColor(), 1);
    }
    Round.prototype.getForcedColor = function () {
        return this.forcedcolor;
    };
    Round.prototype.getPlayers = function () {
        return this.players;
    };
    Round.prototype.getPlayersWithCards = function () {
        var _this = this;
        return this.players.filter(function (element) {
            return _this.inventorys.get(element).getCards().length > 0;
        });
    };
    Round.prototype.getCurrentPlayer = function () {
        return this.currentplayer;
    };
    Round.prototype.getPlayerInventory = function (player) {
        return this.inventorys.get(player);
    };
    Round.prototype.getLeaderBoard = function () {
        return this.leaderboard;
    };
    Round.prototype.addLeaderboardPlayer = function (player) {
        this.leaderboard.push(player);
    };
    Round.prototype.setForcedColor = function (color, player) {
        this.forcedcolor = color;
        this.room.sendToAllPlayers(new OutForcedColorPacket_1.OutForcedColorPacket(player, color), []);
    };
    Round.prototype.playCard = function (unoCard) {
        this.currentcard = unoCard;
        this.getPlayerInventory(this.currentplayer).removeCard(unoCard);
        this.room.sendToAllPlayers(new OutPlayerPlayCardPacket_1.OutPlayerPlayCardPacket(this.currentplayer, unoCard), [this.currentplayer]);
        this.currentplayerplayedcard = true;
        if (this.isFinished()) {
            //TODO END ROUND (Add to Leaderboard)
        }
    };
    Round.prototype.drawCard = function () {
        var randomcard = UnoCard_1.UnoCard.getRandomCard();
        this.getPlayerInventory(this.currentplayer).addCard(randomcard);
        this.room.sendToAllPlayers(new OutPlayerDrawHiddenPacket_1.OutPlayerDrawHiddenPacket(this.currentplayer, randomcard), [this.currentplayer]);
        this.currentplayer.send(new OutPlayerDrawPacket_1.OutPlayerDrawPacket(this.currentplayer, randomcard));
    };
    Round.prototype.removePlayer = function (player) {
        this.inventorys["delete"](player);
        this.players.splice(this.players.indexOf(player), 1);
        if (this.isFinished()) {
            //TODO: Remove From Leaderboard
            //TODO: End Round
            return;
        }
        if (this.currentplayer == player) {
            this.nextPlayer();
        }
        this.room.sendToAllPlayers(new OutPlayerLeftRoundPacket_1.OutPlayerLeftRoundPacket(player), []);
    };
    Round.prototype.nextPlayer = function () {
        this.currentplayer = this.getNextPlayer(this.currentplayer, true);
        this.currentplayerplayedcard = false;
        this.room.sendToAllPlayers(new OutCurrentPlayerPacket_1.OutCurrentPlayerPacket(this.currentplayer), []);
    };
    Round.prototype.isFinished = function () {
        var playerwithcards = this.getPlayersWithCards();
        if (playerwithcards.length == 1) {
            return playerwithcards[0];
        }
        return null;
    };
    Round.prototype.getNextPlayer = function (player, hasCards) {
        if (hasCards) {
            var playerwithcards = this.getPlayersWithCards();
            if (playerwithcards.indexOf(player) == this.players.length) {
                return playerwithcards[0];
            }
            else {
                return playerwithcards[playerwithcards.indexOf(player) + 1];
            }
        }
        else {
            if (this.players.indexOf(player) == this.players.length) {
                return this.players[0];
            }
            else {
                return this.players[this.players.indexOf(player) + 1];
            }
        }
    };
    Round.prototype.getStartCardAmount = function () {
        return this.settings.startcardamount;
    };
    Round.prototype.getSettings = function () {
        return this.settings;
    };
    Round.prototype.getUnoCardFromListById = function (uuid, list) {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (item.getUUID() == uuid) {
                return item;
            }
        }
        return null;
    };
    Round.prototype.receivePlayCard = function (packet) {
        var unoCard = this.inventorys.get(packet.getPlayer()).getCardByID(packet.getCardID());
        var player = packet.getPlayer();
        if (unoCard == null) {
            player.send(new OutPlayCardInvalidPacket_1.OutPlayCardInvalidPacket("Tried to play card which doesnt exist"));
            return;
        }
        if (!(player == this.currentplayer)) {
            player.send(new OutPlayCardInvalidPacket_1.OutPlayCardInvalidPacket("Tried to play card of non current player"));
            return;
        }
        if (!this.currentcard.isValidNextCard(this, unoCard)) {
            player.send(new OutPlayCardInvalidPacket_1.OutPlayCardInvalidPacket("Card not maching with previus"));
            return;
        }
        if (this.currentplayerplayedcard) {
            player.send(new OutPlayCardInvalidPacket_1.OutPlayCardInvalidPacket("Already played card"));
            return;
        }
        this.playCard(unoCard);
    };
    Round.prototype.receiveWishColor = function (packet) {
        var player = packet.getPlayer();
        var color = packet.getColor();
        if (player != this.currentplayer) {
            player.send(new OutWishCardInvalidPacket_1.OutWishCardInvalidPacket("Its not your turn"));
            return;
        }
        if (!this.currentplayerplayedcard) {
            player.send(new OutWishCardInvalidPacket_1.OutWishCardInvalidPacket("Play a card first"));
            return;
        }
        if (this.currentcard instanceof WishUnoCard_1.WishUnoCard || this.currentcard instanceof DrawFourUnoCard_1.DrawFourUnoCard) {
            player.send(new OutWishCardInvalidPacket_1.OutWishCardInvalidPacket("No valid Previus card"));
            return;
        }
        if (color != "red" && color != "blue" && color != "yellow" && color != "green") {
            player.send(new OutWishCardInvalidPacket_1.OutWishCardInvalidPacket("Invalid Color"));
            return;
        }
        this.setForcedColor(color, player);
    };
    Round.prototype.receiveDrawCard = function (packet) {
        var player = packet.getPlayer();
        if (player != this.currentplayer)
            return;
        if (this.currentplayerplayedcard)
            return;
        this.drawCard();
    };
    Round.prototype.asJSON = function () {
        var jsonplayers = [];
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            jsonplayers.push(player.getUUID());
        }
        var jsoninventorys = [];
        this.inventorys.forEach(function (value, key) {
            jsoninventorys.push({ "player": key.asJSON(), "cards": value.getCards().length });
        });
        var jsonleaderboard = [];
        for (var _b = 0, _c = this.leaderboard; _b < _c.length; _b++) {
            var player = _c[_b];
            jsonleaderboard.push(player.getUUID());
        }
        return { "players": jsonplayers,
            "settings": this.settings,
            "inventorys": jsoninventorys,
            "leaderboard": jsonleaderboard,
            "forcedcolor": this.forcedcolor,
            "currentcard": this.currentcard.asJson(),
            "currentplayer": this.currentplayer.getUUID() };
    };
    return Round;
}());
exports.Round = Round;
