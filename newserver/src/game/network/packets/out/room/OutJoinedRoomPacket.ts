import { Player } from "../../../../player/Player";
import { Room } from "../../../../Room";
import { OutPacket } from "../OutPacket";

export class OutJoinedRoomPacket extends OutPacket {
    protected readonly action: string = "joinedRoom";
    private readonly room: Room;

    constructor(room: Room) {
        super();
        this.room = room;
    }

    asJSON(): {} {
        return {"action":this.action,"room":this.room.asJSON()};
    }

    public getRoom(): Room {
        return this.room;
    }
}