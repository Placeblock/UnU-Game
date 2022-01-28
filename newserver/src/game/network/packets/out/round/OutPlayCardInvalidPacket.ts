import { OutPacket } from "../OutPacket";

export class OutPlayCardInvalidPacket extends OutPacket {
    protected readonly action: string = "playCardInvalid";
    private readonly reason: string;

    constructor(reason: string) {
        super();
        this.reason = reason;
    }

    asJSON(): {} {
        return {"action":this.action,"reason":this.reason};
    }

    public getReason(): string {
        return this.reason;
    }
}