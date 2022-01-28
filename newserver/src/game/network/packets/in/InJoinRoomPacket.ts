import { Player } from "../../../player/Player";
import { InPacket } from "./InPacket";

export class InJoinRoomPacket extends InPacket {
    private readonly player: Player;
    private readonly uuid: string;

    constructor(player: Player, uuid: string) {
        super();
        this.player = player;
        this.uuid = uuid;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getUUID(): string {
        return this.uuid;
    }

    public static getFromJSON(player: Player, json: {}): InJoinRoomPacket {
        if(!("uuid" in json)) return null;
        return new InJoinRoomPacket(player, json["uuid"]);
    }

}