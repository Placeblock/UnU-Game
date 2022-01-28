import { OutPacket } from "../OutPacket";

export class OutWishCardInvalidPacket extends OutPacket {
    protected readonly action: string = "startRound";

    constructor() {
        super();
    }

    public asJSON(): {} {
        return {"action":this.action};
    }
}