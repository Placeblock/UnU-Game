import { Round } from "../../../../Round";
import { OutPacket } from "../OutPacket";

export class OutStartRoundPacket extends OutPacket {
    protected readonly action: string = "startRound";
    protected readonly round: Round;

    constructor(round: Round) {
        super();
        this.round = round;
    }

    getRound(): Round {
        return this.round;
    }

    public asJSON(): {} {
        return {"action":this.action,"round":this.round.asJSON()};
    }
}