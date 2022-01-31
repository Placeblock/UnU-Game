import { Player } from "../../../../player/Player";
import { InPacket } from "../InPacket";

export class InChangeNamePacket extends InPacket {
    private readonly player: Player;
    private readonly name: string;

    constructor(player: Player, name: string) {
        super();
        this.player = player;
        this.name = name;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getName(): string {
        return this.name;
    }

    public static getFromJSON(player: Player, json: {}): InChangeNamePacket {
        if(!("name" in json)) return null;
        var name = json["name"].substring(0, 16);
        return new InChangeNamePacket(player, name);
    }

}