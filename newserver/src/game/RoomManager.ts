import { Room } from "./Room";

export class RoomManager {

    private static readonly registeredRooms: {[key: string]: Room} = {};

    static registerRoom(room: Room) {
        if(room.getUUID() in this.registeredRooms) {
            console.warn("Tried to register already registered Room!");
            return;
        }
        this.registeredRooms[room.getUUID()] = room;
    }

    static unregisterRoom(room: Room) {
        if(!(room.getUUID() in this.registeredRooms)) {
            console.warn("Tried to unregister non existing Room!");
            return;
        }
        delete this.registeredRooms[room.getUUID()];
    }

    static getRegisteredRooms(): {[key: string]: Room} {
        return this.registeredRooms;
    }

    static getRoom(uuid: string): Room | null {
        return this.registerRoom[uuid];
    }
}