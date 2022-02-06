import { Player } from "../../../../player/Player";
import { OutWishCardInvalidPacket } from "../../out/round/OutWishCardInvalidPacket";
import { InPacket } from "../InPacket";

export class InWishColorPacket extends InPacket {
    private readonly player: Player;
    private readonly color: string;

    constructor(player: Player, color: string) {
        super();
        this.color = color;
        this.player = player;
    }

    public getColor(): string {
        return this.color;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public static getFromJSON(player: Player, json: {}): InWishColorPacket {
        if(!("color" in json)) return null;
        if(json["color"] != "RED" && json["color"] != "BLUE" && json["color"] != "YELLOW" && json["color"] != "GREEN") return null;
        return new InWishColorPacket(player, json["color"]);
    }
}