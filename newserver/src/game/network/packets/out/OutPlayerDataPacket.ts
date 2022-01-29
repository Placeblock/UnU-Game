import { Player } from "../../../player/Player";
import { OutPacket } from "./OutPacket";

export class OutPlayerDataPacket extends OutPacket {
    protected readonly action: string = "playerData";
    private readonly player: Player;

    constructor(player: Player) {
        super();
        this.player = player;
    }

    asJSON(): {} {
        return {"action":this.action,"player":this.player.asJSON()};
    }

    public getPlayer(): Player {
        return this.player;
    }
}