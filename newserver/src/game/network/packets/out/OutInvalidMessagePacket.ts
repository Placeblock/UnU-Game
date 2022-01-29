import { OutPacket } from "./OutPacket";

export class OutInvalidMessagePacket extends OutPacket {
    action: string = "messageInvalid";
    reason: string;
    oldmessage: {};

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