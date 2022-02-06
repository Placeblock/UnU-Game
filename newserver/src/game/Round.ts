import { NumberUnoCard } from "./card/number/NumberUnoCard";
import { randomCard } from "./card/RandomCard";
import { DrawFourUnoCard } from "./card/special/DrawFourUnoCard";
import { DrawTwoUnoCard } from "./card/special/DrawTwoUnoCard";
import { InvertDirectionUnoCard } from "./card/special/InvertDirectionUnoCard";
import { SuspendUnUCard } from "./card/special/SuspendUnoCard";
import { WishUnoCard } from "./card/special/WishUnoCard";
import { UnoCard } from "./card/UnoCard";
import { Inventory } from "./Inventory";
import { InDrawCardPacket } from "./network/packets/in/round/InDrawCardPacket";
import { InPlayCardPacket } from "./network/packets/in/round/InPlayCardPacket";
import { InWishColorPacket } from "./network/packets/in/round/InWishColorPacket";
import { OutCurrentPlayerPacket } from "./network/packets/out/round/OutCurrentPlayerPacket";
import { OutForcedColorPacket } from "./network/packets/out/round/OutForcedColorPacket";
import { OutInventoryDataPacket } from "./network/packets/out/round/OutInventoryDataPacket";
import { OutPlayCardInvalidPacket } from "./network/packets/out/round/OutPlayCardInvalidPacket";
import { OutPlayerDrawHiddenPacket } from "./network/packets/out/round/OutPlayerDrawHiddenPacket";
import { OutDrawPacket } from "./network/packets/out/round/OutDrawPacket";
import { OutPlayerLeftRoundPacket } from "./network/packets/out/round/OutPlayerLeftRoundPacket";
import { OutPlayerPlayCardPacket } from "./network/packets/out/round/OutPlayerPlayCardPacket";
import { OutWishCardInvalidPacket } from "./network/packets/out/round/OutWishCardInvalidPacket";
import { Player } from "./player/Player";
import { Room } from "./Room";
import { RoundSettings } from "./RoundSettings";
import { OutWishCardPacket } from "./network/packets/out/round/OutWishCardPacket";
import { InSayUNOPacket } from "./network/packets/in/round/InSayUNOPacket";
import { OutPlayerSayUNUPacket } from "./network/packets/out/round/OutPlayerSayUNUPacket";
import { InEndTurnPacket } from "./network/packets/in/round/InEndTurnPacket";

export class Round {
    private readonly room: Room;
    private readonly players: Player[] = [];
    private currentplayerplayedcard: boolean = false;
    private currentplayerdrawedcard: boolean = false;
    private currentplayer: Player;
    private currentcard: UnoCard;
    private forcedcolor: string;
    private readonly inventorys: Map<Player, Inventory> = new Map;
    private readonly leaderboard: Player[] = [];
    private settings: RoundSettings;
    private direction: boolean = true;
    private currentdrawamount: number = 0;
    private sayUnoTimer: Map<string, NodeJS.Timeout> = new Map;

    constructor(players: Player[], settings: RoundSettings, room: Room) {
        this.room = room;
        this.players = players;
        this.currentplayer = players[Math.floor(Math.random()*players.length)];
        this.settings = settings;
        for (var player of this.players) {
            const cardjsonlist = [];
            this.inventorys.set(player, new Inventory());
            for(var i: number = 0; i < this.settings.startcardamount; i++) {
                var card: UnoCard = randomCard();
                cardjsonlist.push(card.asJson());
                this.inventorys.get(player).addCard(card);
                this.currentcard = card;
            }
            this.inventorys.get(player).addCard(new WishUnoCard());
            this.inventorys.get(player).addCard(new WishUnoCard());
            this.inventorys.get(player).addCard(new WishUnoCard());
            player.send(new OutInventoryDataPacket(player, this.inventorys.get(player)));
        }
    }

    getPlayers(): Player[] {
        return this.players;
    }

    getPlayersWithCards(): Player[] {
        return this.players.filter((element) => {
            return this.inventorys.get(element).getCards().length > 0;
        })
    }

    getPlayerInventory(player: Player): Inventory {
        return this.inventorys.get(player);
    }

    getLeaderBoard(): Player[] {
        return this.leaderboard;
    }

    addLeaderboardPlayer(player: Player) {
        this.leaderboard.push(player);
    }

    setForcedColor(color: string) {
        this.forcedcolor = color;
        this.room.sendToAllPlayers(new OutForcedColorPacket(color), []);
    }

    getForcedColor(): string {
        return this.forcedcolor;
    }

    playCard(unoCard: UnoCard) {
        this.currentcard = unoCard;
        this.getPlayerInventory(this.currentplayer).removeCard(unoCard);
        this.room.sendToAllPlayers(new OutPlayerPlayCardPacket(this.currentplayer, unoCard), []);
        this.currentplayerplayedcard = true;
        if(this.isFinished()) {
            //TODO END ROUND (Add to Leaderboard)
        }
        if(this.inventorys.get(this.currentplayer).getCards().length == 1) {
            this.sayUnoTimer.set(this.currentplayer.getUUID(), setTimeout((player) => {
                console.log("drawtimer");
                this.drawCard(player, 2);
            }, 10000, this.currentplayer));
        }
        var nextPlayer = this.getNextPlayer(this.currentplayer, true);
        if(unoCard instanceof NumberUnoCard) {
            this.applyDrawQueue()
            this.setForcedColor(undefined);
            this.nextPlayer(nextPlayer);
        }else if(unoCard instanceof InvertDirectionUnoCard) {
            this.applyDrawQueue()
            this.currentdrawamount = 0;
            this.direction = !this.direction;
            this.setForcedColor(undefined);
            this.nextPlayer(nextPlayer);
        }else if(unoCard instanceof SuspendUnUCard) {
            this.applyDrawQueue()
            this.currentdrawamount = 0;
            nextPlayer = this.getNextPlayer(nextPlayer, true);
            this.setForcedColor(undefined);
            this.nextPlayer(nextPlayer);
        }else if(unoCard instanceof DrawTwoUnoCard) {
            this.currentdrawamount += 2;
            this.setForcedColor(undefined);
            this.nextPlayer(nextPlayer);
        }else if(unoCard instanceof DrawFourUnoCard) {
            this.currentdrawamount += 4;
            this.currentplayer.send(new OutWishCardPacket());
        }else if(unoCard instanceof WishUnoCard) {
            this.currentplayer.send(new OutWishCardPacket());
        }
    }

    drawCard(player, amount: number = 1) {
        for(var i = 0; i < amount; i ++) {
            const randomcard = randomCard();
            this.getPlayerInventory(player).addCard(randomcard);
            this.room.sendToAllPlayers(new OutPlayerDrawHiddenPacket(player, randomcard), [player]);
            player.send(new OutDrawPacket(randomcard));
        }
    }

    getValidNextCards(): UnoCard[] {
        const unoCards: UnoCard[] = [];
        for(var card of this.getPlayerInventory(this.currentplayer).getCards()) {
            if(this.currentcard.isValidNextCard(this, card)) {
                unoCards.push(card);
            }
        }
        return unoCards;
    }

    removePlayer(player: Player) {
        this.inventorys.delete(player);
        this.players.splice(this.players.indexOf(player), 1);
        if(this.isFinished()) {
            //TODO: Remove From Leaderboard
            //TODO: End Round
            return;
        }
        if(this.currentplayer == player) {
            const nextPlayer = this.getNextPlayer(this.currentplayer, true);
            if(nextPlayer == null) return;
            this.nextPlayer(nextPlayer);
        }
        this.room.sendToAllPlayers(new OutPlayerLeftRoundPacket(player), []);
    }

    nextPlayer(player: Player) {
        this.currentplayerplayedcard = false;
        this.currentplayerdrawedcard = false;
        this.currentplayer = player;
        this.room.sendToAllPlayers(new OutCurrentPlayerPacket(player), []);
        for(var unoCard of this.getValidNextCards()) {
            if(unoCard instanceof DrawFourUnoCard || unoCard instanceof DrawTwoUnoCard) {
                return;
            }
        }
        this.applyDrawQueue();
        console.log("drawqueue");
    }

    applyDrawQueue() {
        this.drawCard(this.currentplayer, this.currentdrawamount);
        this.currentdrawamount = 0;
    }

    isFinished(): Player | null {
        const playerwithcards = this.getPlayersWithCards();
        if(playerwithcards.length == 1) {
            return playerwithcards[0];
        }
        return null;
    }

    getNextPlayer(player: Player, hasCards: boolean): Player | undefined {
        var players = this.players;
        if(hasCards) {
            players = this.getPlayersWithCards();
        }
        if(this.direction) {
            if(players.indexOf(player) == players.length-1) {
                return players[0];
            }else {
                return players[players.indexOf(player)+1];
            }
        }else {
            if(players.indexOf(player) == 0) {
                return players[players.length-1];
            }else {
                return players[players.indexOf(player)-1];
            }
        }
    }

    public getSettings(): RoundSettings {
        return this.settings;
    }

    public receivePlayCard(packet: InPlayCardPacket) {
        const unoCard = this.inventorys.get(packet.getPlayer()).getCardByID(packet.getCardID());
        const player = packet.getPlayer();
        if(unoCard == null) {
            player.send(new OutPlayCardInvalidPacket("Tried to play card which doesnt exist"));
            return;
        }
        if(!(player == this.currentplayer)) {
            player.send(new OutPlayCardInvalidPacket("Tried to play card of non current player"));
            return;
        }
        if(!this.currentcard.isValidNextCard(this, unoCard)) {
            player.send(new OutPlayCardInvalidPacket("Card not maching with previus"));
            return;
        }
        if(this.currentplayerplayedcard) {
            player.send(new OutPlayCardInvalidPacket("Already played card"));
            return;
        }
        this.playCard(unoCard);
    }

    public receiveWishColor(packet: InWishColorPacket) {
        const player = packet.getPlayer();
        const color = packet.getColor();
        if(player != this.currentplayer) {
            player.send(new OutWishCardInvalidPacket("Its not your turn"));
            return;
        }
        if(!this.currentplayerplayedcard) {
            player.send(new OutWishCardInvalidPacket("Play a card first"));
            return;
        }
        if(!(this.currentcard instanceof WishUnoCard) && !(this.currentcard instanceof DrawFourUnoCard)) {
            player.send(new OutWishCardInvalidPacket("No valid Previus card"));
            return;
        }
        this.setForcedColor(color);
        this.nextPlayer(this.getNextPlayer(this.currentplayer, true));
    }

    public receiveDrawCard(packet: InDrawCardPacket) {
        const player = packet.getPlayer();
        if(player != this.currentplayer) return;
        if(this.currentplayerplayedcard) return;
        if(this.currentplayerdrawedcard) return;
        this.drawCard(player);
        console.log("drawcard");
        this.currentplayerdrawedcard = true;
        if(this.getValidNextCards().length > 0) return;
        this.nextPlayer(this.getNextPlayer(this.currentplayer, true));
    }

    receiveSayUno(packet: InSayUNOPacket) {
        const player = packet.getPlayer();
        clearTimeout(this.sayUnoTimer.get(player.getUUID()));
        this.room.sendToAllPlayers(new OutPlayerSayUNUPacket(player), []);
    }

    receiveEndTurn(packet: InEndTurnPacket) {
        if(packet.getPlayer() != this.currentplayer) return;
        if(!this.currentplayerdrawedcard) return;
        this.nextPlayer(this.getNextPlayer(this.currentplayer, true));
    }

    public asJSON(): {} {
        const jsonplayers = [];
        for(let player of this.players) {
            jsonplayers.push(player.getUUID());
        }
        const jsoninventorys = [];
        this.inventorys.forEach((value, key) => {
            const cards = [];
            for (var card of value.getCards()) {
                cards.push(card.getUUID());
            }
            jsoninventorys.push({"player":key.asJSON(), "cards":cards});
        })
        const jsonleaderboard = [];
        for(let player of this.leaderboard) {
            jsonleaderboard.push(player.getUUID());
        }
        return {"players":jsonplayers,
                "settings":this.settings,
                "inventorys":jsoninventorys,
                "leaderboard":jsonleaderboard,
                "forcedcolor":this.forcedcolor,
                "currentcard":this.currentcard.asJson(),
                "currentplayer":this.currentplayer.asJSON()};
    }
}