import { OutPacket } from "../OutPacket";

export class OutWishCardPacket extends OutPacket {
    protected readonly action: string = "wishCard";

    constructor() {
        super();
    }

    public asJSON(): {} {
        return {"action":this.action};
    }
}