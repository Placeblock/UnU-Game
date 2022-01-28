import { Player } from "../../../../player/Player";
import { OutPacket } from "../OutPacket";

export class OutForcedColorPacket extends OutPacket {
    protected readonly action: string = "forcedColor";
    private readonly player: Player;
    private readonly color: string;

    constructor(player: Player, color: string) {
        super();
        this.player = player;
        this.color = color;
    }

    asJSON(): {} {
        return {"action":this.action,"playerid":this.player.asJSON(),"color":this.color};
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getColor(): string {
        return this.color;
    }
}