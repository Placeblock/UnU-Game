import { Player } from "../../../../player/Player";
import { OutPacket } from "../OutPacket";

export class OutPlayerCardAmountPacket extends OutPacket {
    protected readonly action: string = "cardAmount";
    private readonly player: Player;
    private readonly amount: number;

    constructor(player: Player, amount: number) {
        super();
        this.player = player;
        this.amount = amount;
    }

    asJSON(): {} {
        return {"action":this.action,"player":this.player.asJSON(),"amount":this.amount};
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getAmount(): number {
        return this.amount;
    }
}