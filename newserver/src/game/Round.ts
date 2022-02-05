import { NumberUnoCard } from "./card/number/NumberUnoCard";
import { DrawFourUnoCard } from "./card/special/DrawFourUnoCard";
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
import { OutPlayerDrawPacket } from "./network/packets/out/round/OutPlayerDrawPacket";
import { OutPlayerLeftRoundPacket } from "./network/packets/out/round/OutPlayerLeftRoundPacket";
import { OutPlayerPlayCardPacket } from "./network/packets/out/round/OutPlayerPlayCardPacket";
import { OutWishCardInvalidPacket } from "./network/packets/out/round/OutWishCardInvalidPacket";
import { Player } from "./player/Player";
import { Room } from "./Room";
import { RoundSettings } from "./RoundSettings";

export class Round {
    private readonly room: Room;
    private readonly players: Player[] = [];
    private currentplayerplayedcard: boolean = false;
    private currentplayer: Player;
    private currentcard: UnoCard;
    private forcedcolor: string;
    private readonly inventorys: Map<Player, Inventory> = new Map;
    private readonly leaderboard: Player[] = [];
    private settings: RoundSettings;

    constructor(players: Player[], settings: RoundSettings, room: Room) {
        this.room = room;
        this.players = players;
        this.currentplayer = players[Math.floor(Math.random()*players.length)];
        this.settings = settings;
        for (var player of this.players) {
            const cardjsonlist = [];
            this.inventorys.set(player, new Inventory());
            for(var i: number = 0; i < this.settings.startcardamount; i++) {
                var card: UnoCard = UnoCard.getRandomCard();
                cardjsonlist.push(card.asJson());
                this.inventorys.get(player).addCard(card);
            }
            player.send(new OutInventoryDataPacket(player, this.inventorys.get(player)));
        }
        this.currentcard = new NumberUnoCard(UnoCard.randomColor(), 1);
    }

    getForcedColor(): string {
        return this.forcedcolor;
    }

    getPlayers(): Player[] {
        return this.players;
    }

    getPlayersWithCards(): Player[] {
        return this.players.filter((element) => {
            return this.inventorys.get(element).getCards().length > 0;
        })
    }

    getCurrentPlayer(): Player {
        return this.currentplayer;
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

    setForcedColor(color: string, player?: Player) {
        this.forcedcolor = color;
        this.room.sendToAllPlayers(new OutForcedColorPacket(player, color), []);
    }

    playCard(unoCard: UnoCard) {
        this.currentcard = unoCard;
        this.getPlayerInventory(this.currentplayer).removeCard(unoCard);
        this.room.sendToAllPlayers(new OutPlayerPlayCardPacket(this.currentplayer, unoCard), [this.currentplayer]);
        this.currentplayerplayedcard = true;
        if(this.isFinished()) {
            //TODO END ROUND (Add to Leaderboard)
        }
    }

    drawCard() {
        const randomcard = UnoCard.getRandomCard();
        this.getPlayerInventory(this.currentplayer).addCard(randomcard);
        this.room.sendToAllPlayers(new OutPlayerDrawHiddenPacket(this.currentplayer, randomcard), [this.currentplayer]);
        this.currentplayer.send(new OutPlayerDrawPacket(this.currentplayer, randomcard));
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
            this.nextPlayer();
        }
        this.room.sendToAllPlayers(new OutPlayerLeftRoundPacket(player), []);
    }

    nextPlayer() {
        this.currentplayer = this.getNextPlayer(this.currentplayer, true);
        this.currentplayerplayedcard = false;
        this.room.sendToAllPlayers(new OutCurrentPlayerPacket(this.currentplayer), []);
    }

    isFinished(): Player | null {
        const playerwithcards = this.getPlayersWithCards();
        if(playerwithcards.length == 1) {
            return playerwithcards[0];
        }
        return null;
    }

    getNextPlayer(player: Player, hasCards: boolean) {
        if(hasCards) {
            const playerwithcards = this.getPlayersWithCards();
            if(playerwithcards.indexOf(player) == this.players.length) {
                return playerwithcards[0];
            }else {
                return playerwithcards[playerwithcards.indexOf(player)+1];
            }
        }else {
            if(this.players.indexOf(player) == this.players.length) {
                return this.players[0];
            }else {
                return this.players[this.players.indexOf(player)+1];
            }
        }
    }

    public getStartCardAmount(): number {
        return this.settings.startcardamount;
    }

    public getSettings(): RoundSettings {
        return this.settings;
    }

    protected getUnoCardFromListById(uuid: string, list: UnoCard[]): UnoCard | null {
        for(var item of list) {
            if(item.getUUID() == uuid) {
                return item;
            }
        }
        return null;
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
        if(this.currentcard instanceof WishUnoCard ||this.currentcard instanceof DrawFourUnoCard) {
            player.send(new OutWishCardInvalidPacket("No valid Previus card"));
            return;
        }
        if(color != "red" && color != "blue" && color != "yellow" && color != "green") {
            player.send(new OutWishCardInvalidPacket("Invalid Color"));
            return;
        }
        this.setForcedColor(color, player);
    }

    public receiveDrawCard(packet: InDrawCardPacket) {
        const player = packet.getPlayer();
        if(player != this.currentplayer) return;
        if(this.currentplayerplayedcard) return;
        this.drawCard();
    }

    public asJSON(): {} {
        const jsonplayers = [];
        for(let player of this.players) {
            jsonplayers.push(player.getUUID());
        }
        const jsoninventorys = [];
        this.inventorys.forEach((value, key) => {
            jsoninventorys.push({"player":key.asJSON(), "cards":value.getCards().length});
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
                "currentplayer":this.currentplayer.getUUID()};
    }
}