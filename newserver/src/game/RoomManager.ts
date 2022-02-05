import { Room } from "./Room";

export class RoomManager {

    private static readonly registeredRooms: {[key: string]: Room} = {};

    static registerRoom(room: Room) {
        if(room.getName() in this.registeredRooms) {
            console.warn("Tried to register already registered Room!");
            return;
        }
        this.registeredRooms[room.getName()] = room;
    }

    static unregisterRoom(room: Room) {
        if(!(room.getName() in this.registeredRooms)) {
            console.warn("Tried to unregister non existing Room!");
            return;
        }
        delete this.registeredRooms[room.getName()];
    }

    static getRegisteredRooms(): {[key: string]: Room} {
        return this.registeredRooms;
    }

    static getRoom(name: string): Room | undefined {
        return this.registeredRooms[name];
    }
}