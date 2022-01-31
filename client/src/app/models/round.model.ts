import { Color } from "./card/color.model";
import { UnUCard } from "./card/un-ucard.model";
import { Inventory } from "./inventory.model";
import { Player } from "./player.model";
import { RoundSettings } from "./round-settings.model";

export class Round {
    private settings: RoundSettings;
    private readonly players: Player[];
    private currentplayer: Player;
    private readonly inventorys: Map<Player, Inventory> = new Map;
    private currentcard: UnUCard;
    private forcedcolor: Color | undefined;

    constructor(players: Player[], startcard: UnUCard, startplayer: Player, settings: RoundSettings) {
        this.players = players;
        this.currentcard = startcard;
        this.currentplayer = startplayer;
        this.settings = settings;
    }

    getPlayers(): Player[] {
        return this.players;
    }

    getCurrentPlayer(): Player {
        return this.currentplayer;
    }

    getInventory(player: Player): Inventory {
        var inventory = this.inventorys.get(player);
        if(inventory == undefined) {
            return new Inventory();
        }
        return inventory;
    }

    getSettings(): RoundSettings {
        return this.settings;
    }

    setForcedColor(color: Color) {
        this.forcedcolor = color;
    }

    getForcedColor(): Color | undefined {
        return this.forcedcolor;
    }

    getCurrentCard(): UnUCard {
        return this.currentcard;
    }

    setCurrentCard(card: UnUCard) {
        this.currentcard = card;
    }
}
