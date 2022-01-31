import { OutPacket } from "./OutPacket";

export class OutInvalidMessagePacket extends OutPacket {
    readonly action: string = "messageInvalid";
    private readonly reason: string;
    private readonly oldmessage: {};

    constructor(reason: string, oldmessage: {}) {
        super();
        this.reason = reason;
        this.oldmessage = oldmessage;
    }

    asJSON(): {} {
        return {"action":this.action,"reason":this.reason,"oldmessage":this.oldmessage};
    }

    public getReason(): string {
        return this.reason;
    }

    public getOldMessage(): {} {
        return this.oldmessage;
    }
}