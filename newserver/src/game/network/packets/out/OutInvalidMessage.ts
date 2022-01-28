import { OutPacket } from "./OutPacket";

export class OutInvalidMessagePacket extends OutPacket {
    action: string = "messageInvalid";
    reason: string;

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