import { Room } from "../../../../Room";
import { OutPacket } from "../OutPacket";

export class OutInvalidJoinRoom extends OutPacket {
    protected readonly action: string = "invalidJoinRoom";
    private readonly room: string;
    private readonly reason: string;

    constructor(room: string, reason: string) {
        super();
        this.room = room;
        this.reason = reason;
    }

    asJSON(): {} {
        return {"action":this.action,"room":this.room,"reason":this.reason};
    }

    public getRoom(): string {
        return this.room;
    }

    public getReason(): string {
        return this.reason;
    }
}