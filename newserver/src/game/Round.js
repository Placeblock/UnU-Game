"use strict";
exports.__esModule = true;
exports.Round = void 0;
var NumberUnoCard_1 = require("./card/number/NumberUnoCard");
var RandomCard_1 = require("./card/RandomCard");
var DrawFourUnoCard_1 = require("./card/special/DrawFourUnoCard");
var DrawTwoUnoCard_1 = require("./card/special/DrawTwoUnoCard");
var InvertDirectionUnoCard_1 = require("./card/special/InvertDirectionUnoCard");
var SuspendUnoCard_1 = require("./card/special/SuspendUnoCard");
var WishUnoCard_1 = require("./card/special/WishUnoCard");
var Inventory_1 = require("./Inventory");
var OutCurrentPlayerPacket_1 = require("./network/packets/out/round/OutCurrentPlayerPacket");
var OutForcedColorPacket_1 = require("./network/packets/out/round/OutForcedColorPacket");
var OutInventoryDataPacket_1 = require("./network/packets/out/round/OutInventoryDataPacket");
var OutPlayCardInvalidPacket_1 = require("./network/packets/out/round/OutPlayCardInvalidPacket");
var OutPlayerDrawHiddenPacket_1 = require("./network/packets/out/round/OutPlayerDrawHiddenPacket");
var OutDrawPacket_1 = require("./network/packets/out/round/OutDrawPacket");
var OutPlayerLeftRoundPacket_1 = require("./network/packets/out/round/OutPlayerLeftRoundPacket");
var OutPlayerPlayCardPacket_1 = require("./network/packets/out/round/OutPlayerPlayCardPacket");
var OutWishCardInvalidPacket_1 = require("./network/packets/out/round/OutWishCardInvalidPacket");
var OutWishCardPacket_1 = require("./network/packets/out/round/OutWishCardPacket");
var Round = /** @class */ (function () {
    function Round(players, settings, room) {
        this.players = [];
        this.currentplayerplayedcard = false;
        this.currentplayerdrawedcard = false;
        this.inventorys = new Map;
        this.leaderboard = [];
        this.direction = true;
        this.currentdrawamount = 0;
        this.room = room;
        this.players = players;
        this.currentplayer = players[Math.floor(Math.random() * players.length)];
        this.settings = settings;
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            var cardjsonlist = [];
            this.inventorys.set(player, new Inventory_1.Inventory());
            for (var i = 0; i < this.settings.startcardamount; i++) {
                var card = (0, RandomCard_1.randomCard)();
                cardjsonlist.push(card.asJson());
                this.inventorys.get(player).addCard(card);
                this.currentcard = card;
            }
            this.inventorys.get(player).addCard(new WishUnoCard_1.WishUnoCard());
            this.inventorys.get(player).addCard(new DrawFourUnoCard_1.DrawFourUnoCard());
            this.inventorys.get(player).addCard(new DrawFourUnoCard_1.DrawFourUnoCard());
            this.inventorys.get(player).addCard(new DrawFourUnoCard_1.DrawFourUnoCard());
            this.inventorys.get(player).addCard(new DrawTwoUnoCard_1.DrawTwoUnoCard("RED"));
            this.inventorys.get(player).addCard(new DrawTwoUnoCard_1.DrawTwoUnoCard("RED"));
            this.inventorys.get(player).addCard(new DrawTwoUnoCard_1.DrawTwoUnoCard("RED"));
            this.inventorys.get(player).addCard(new DrawTwoUnoCard_1.DrawTwoUnoCard("RED"));
            player.send(new OutInventoryDataPacket_1.OutInventoryDataPacket(player, this.inventorys.get(player)));
        }
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
        this.room.sendToAllPlayers(new OutForcedColorPacket_1.OutForcedColorPacket(color), []);
    };
    Round.prototype.playCard = function (unoCard) {
        this.currentcard = unoCard;
        this.getPlayerInventory(this.currentplayer).removeCard(unoCard);
        this.room.sendToAllPlayers(new OutPlayerPlayCardPacket_1.OutPlayerPlayCardPacket(this.currentplayer, unoCard), []);
        this.currentplayerplayedcard = true;
        if (this.isFinished()) {
            //TODO END ROUND (Add to Leaderboard)
        }
        var nextPlayer = this.getNextPlayer(this.currentplayer, true);
        if (unoCard instanceof NumberUnoCard_1.NumberUnoCard) {
            this.drawCard(this.currentdrawamount);
            this.currentdrawamount = 0;
            this.setForcedColor(undefined);
            this.nextPlayer(nextPlayer);
        }
        else if (unoCard instanceof InvertDirectionUnoCard_1.InvertDirectionUnoCard) {
            this.drawCard(this.currentdrawamount);
            this.currentdrawamount = 0;
            this.direction = !this.direction;
            this.setForcedColor(undefined);
            this.nextPlayer(nextPlayer);
        }
        else if (unoCard instanceof SuspendUnoCard_1.SuspendUnUCard) {
            this.drawCard(this.currentdrawamount);
            this.currentdrawamount = 0;
            nextPlayer = this.getNextPlayer(nextPlayer, true);
            this.setForcedColor(undefined);
            this.nextPlayer(nextPlayer);
        }
        else if (unoCard instanceof DrawTwoUnoCard_1.DrawTwoUnoCard) {
            this.currentdrawamount += 2;
            this.setForcedColor(undefined);
            this.nextPlayer(nextPlayer);
        }
        else if (unoCard instanceof DrawFourUnoCard_1.DrawFourUnoCard) {
            this.currentdrawamount += 4;
            this.currentplayer.send(new OutWishCardPacket_1.OutWishCardPacket());
        }
        else if (unoCard instanceof WishUnoCard_1.WishUnoCard) {
            this.currentplayer.send(new OutWishCardPacket_1.OutWishCardPacket());
        }
    };
    Round.prototype.drawCard = function (amount) {
        if (amount === void 0) { amount = 1; }
        for (var i = 0; i < amount; i++) {
            var randomcard = (0, RandomCard_1.randomCard)();
            this.getPlayerInventory(this.currentplayer).addCard(randomcard);
            this.room.sendToAllPlayers(new OutPlayerDrawHiddenPacket_1.OutPlayerDrawHiddenPacket(this.currentplayer, randomcard), [this.currentplayer]);
            this.currentplayer.send(new OutDrawPacket_1.OutDrawPacket(randomcard));
        }
        this.currentplayerdrawedcard = true;
        for (var _i = 0, _a = this.getPlayerInventory(this.currentplayer).getCards(); _i < _a.length; _i++) {
            var card = _a[_i];
            if (this.currentcard.isValidNextCard(this, card)) {
                return;
            }
        }
        this.nextPlayer(this.getNextPlayer(this.currentplayer, true));
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
            this.nextPlayer(this.getNextPlayer(this.currentplayer, true));
        }
        this.room.sendToAllPlayers(new OutPlayerLeftRoundPacket_1.OutPlayerLeftRoundPacket(player), []);
    };
    Round.prototype.nextPlayer = function (player) {
        this.currentplayerplayedcard = false;
        this.currentplayerdrawedcard = false;
        this.currentplayer = player;
        this.room.sendToAllPlayers(new OutCurrentPlayerPacket_1.OutCurrentPlayerPacket(player), []);
    };
    Round.prototype.isFinished = function () {
        var playerwithcards = this.getPlayersWithCards();
        if (playerwithcards.length == 1) {
            return playerwithcards[0];
        }
        return null;
    };
    Round.prototype.getNextPlayer = function (player, hasCards) {
        var players = this.players;
        if (hasCards) {
            players = this.getPlayersWithCards();
        }
        if (this.direction) {
            if (players.indexOf(player) == players.length - 1) {
                return players[0];
            }
            else {
                return players[players.indexOf(player) + 1];
            }
        }
        else {
            if (players.indexOf(player) == 0) {
                return players[players.length - 1];
            }
            else {
                return players[players.indexOf(player) - 1];
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
            console.log(this.currentcard);
            console.log(unoCard);
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
        if (!(this.currentcard instanceof WishUnoCard_1.WishUnoCard) && !(this.currentcard instanceof DrawFourUnoCard_1.DrawFourUnoCard)) {
            player.send(new OutWishCardInvalidPacket_1.OutWishCardInvalidPacket("No valid Previus card"));
            return;
        }
        if (color != "RED" && color != "BLUE" && color != "YELLOW" && color != "GREEN") {
            player.send(new OutWishCardInvalidPacket_1.OutWishCardInvalidPacket("Invalid Color"));
            return;
        }
        this.setForcedColor(color, player);
        this.nextPlayer(this.getNextPlayer(this.currentplayer, true));
    };
    Round.prototype.receiveDrawCard = function (packet) {
        var player = packet.getPlayer();
        if (player != this.currentplayer)
            return;
        if (this.currentplayerplayedcard)
            return;
        if (this.currentplayerdrawedcard)
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
            var cards = [];
            for (var _i = 0, _a = value.getCards(); _i < _a.length; _i++) {
                var card = _a[_i];
                cards.push(card.getUUID());
            }
            jsoninventorys.push({ "player": key.asJSON(), "cards": cards });
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
            "currentplayer": this.currentplayer.asJSON() };
    };
    return Round;
}());
exports.Round = Round;
