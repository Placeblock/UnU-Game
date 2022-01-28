import { OutPacket } from "../OutPacket";

export class OutWishCardInvalidPacket extends OutPacket {
    protected readonly action: string = "wishInvalid";
    private readonly reason: string;

    constructor(reason: string) {
        super();
        this.reason = reason;
    }

    public asJSON(): {} {
        return {"action":this.action,"reason":this.reason};
    }

    public getReason(): string {
        return this.reason;
    }
}