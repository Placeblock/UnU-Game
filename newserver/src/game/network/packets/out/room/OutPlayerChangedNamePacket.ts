import { Player } from "../../../../player/Player";
import { OutPacket } from "../OutPacket";

export class OutPlayerChangedNamePacket extends OutPacket {
    protected readonly action: string = "playerChangedName";
    private readonly player: Player;
    private readonly name: string;

    constructor(player: Player, name: string) {
        super();
        this.player = player;
        this.name = name;
    }

    asJSON(): {} {
        return {"action":this.action,"player":this.player.asJSON(),"name":this.name};
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getName(): string {
        return this.name;
    }
}