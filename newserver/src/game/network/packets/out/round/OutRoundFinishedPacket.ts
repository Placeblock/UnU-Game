import { OutPacket } from "../OutPacket";

export class OutRoundFinishedPacket extends OutPacket {
    protected readonly action: string = "finishRound";

    constructor() {
        super();
    }

    public asJSON(): {} {
        return {"action":this.action};
    }
}