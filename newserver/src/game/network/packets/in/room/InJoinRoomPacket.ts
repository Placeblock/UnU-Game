import { Player } from "../../../../player/Player";
import { InPacket } from "../InPacket";

export class InJoinRoomPacket extends InPacket {
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

    public static getFromJSON(player: Player, json: {}): InJoinRoomPacket {
        if(!("uuid" in json)) return null;
        return new InJoinRoomPacket(player, json["uuid"]);
    }

}