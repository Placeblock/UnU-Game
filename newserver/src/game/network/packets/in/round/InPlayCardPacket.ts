import { Player } from "../../../../player/Player";
import { InPacket } from "../InPacket";

export class InPlayCardPacket extends InPacket {
    private readonly player: Player;
    private readonly cardid: string;

    constructor(player: Player, cardid: string) {
        super();
        this.cardid = cardid;
        this.player = player;
    }

    public getCardID(): string {
        return this.cardid;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public static getFromJSON(player: Player, json: {}): InPlayCardPacket {
        if(!("card" in json)) return null;
        if(!("uuid" in json["card"])) return null;
        return new InPlayCardPacket(player, json["card"]["uuid"]);
    }

}