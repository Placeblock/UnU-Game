import { Player } from "../../../../player/Player";
import { OutPacket } from "../OutPacket";

export class OutNewOwnerPacket extends OutPacket {
    protected readonly action: string = "newOwner";
    private readonly player: Player;

    constructor(player: Player) {
        super();
        this.player = player;
    }

    asJSON(): {} {
        return {"action":this.action,"uuid":this.player.getUUID()};
    }

    public getPlayer(): Player {
        return this.player;
    }
}