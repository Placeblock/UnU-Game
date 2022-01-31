import { v4 } from 'uuid';
import { InChangeNamePacket } from '../network/packets/in/InChangeNamePacket';
import { InDrawCardPacket } from '../network/packets/in/InDrawCardPacket';
import { InPlayCardPacket } from '../network/packets/in/InPlayCardPacket';
import { InStartRoundPacket } from '../network/packets/in/InStartRound';
import { InWishColorPacket } from '../network/packets/in/InWishColorPacket';
import { OutInvalidMessagePacket } from '../network/packets/out/OutInvalidMessagePacket';
import { OutPacket } from '../network/packets/out/OutPacket';
import { OutPlayerChangedNamePacket } from '../network/packets/out/room/OutPlayerChangedNamePacket';
import { OutPlayerLeftRoomPacket } from '../network/packets/out/room/OutPlayerLeftRoomPacket';
import { OutPlayerLeftRoundPacket } from '../network/packets/out/round/OutPlayerLeftRoundPacket';
import { generateSlug } from "random-word-slugs";
import { Room } from '../Room';
import { InJoinRoomPacket } from '../network/packets/in/InJoinRoomPacket';
import { RoomManager } from '../RoomManager';

export abstract class Player {
    protected readonly uuid: string = v4();
    protected name: string = generateSlug(2, {"format":"title",
                                              "partsOfSpeech": ["adjective","noun"],
                                              "categories": {
                                                  adjective: ["color","appearance"],
                                                  noun: ["animals"]
                                              }})
    protected currentroom: Room;

    constructor() {}

    public getUUID(): string {
        return this.uuid;
    }

    public getName(): string {
        return this.name;
    }

    public asJSON(): {} {
        return {"name":this.name, "uuid":this.uuid};
    }

    public getCurrentRoom(): Room {
        return this.currentroom;
    }

    public setCurrentRoom(newroom: Room) {
        this.currentroom = newroom;
    }

    public setName(newname: string) {
        this.name = newname;
    }

    public abstract send(packet: OutPacket);
    
    protected receive(action: string, data: {}) {
        switch (action) {
            case "createRoom":
                if(this.currentroom != undefined) {
                    this.currentroom.removePlayer(this);
                }
                this.currentroom = new Room(this);
                RoomManager.registerRoom(this.currentroom);
                break;
            case "joinRoom":
                const inJoinRoomPacket = InJoinRoomPacket.getFromJSON(this, data);
                if(inJoinRoomPacket == null) return;
                const room = RoomManager.getRoom(inJoinRoomPacket.getName());
                if(room == undefined) return;
                if(this.currentroom != undefined) {
                    this.currentroom.removePlayer(this);
                }
                this.currentroom = room;
                room.addPlayer(this);
                break;
            case "quitRoom":
                if(this.currentroom == undefined) return;
                this.currentroom.removePlayer(this);
                this.send(new OutPlayerLeftRoomPacket(this));
                break;
            case "quitRound":
                if(this.currentroom == undefined) return;
                if(this.currentroom.getCurrentRound() == undefined) return;
                this.currentroom.getCurrentRound().removePlayer(this);
                this.send(new OutPlayerLeftRoundPacket(this));
                break;
            case "setName":
                const inChangeNamePacket = InChangeNamePacket.getFromJSON(this, data);
                if(inChangeNamePacket == null) return;
                this.name = inChangeNamePacket.getName();
                if(this.currentroom == undefined) return;
                this.currentroom.sendToAllPlayers(new OutPlayerChangedNamePacket(this), []);
                break;
            case "drawCard":
                const inDrawCardPacket = InDrawCardPacket.getFromJSON(this, data);
                if(inDrawCardPacket == null) return;
                if(this.currentroom == undefined) return;
                if(this.currentroom.getCurrentRound() == undefined) return;
                this.currentroom.getCurrentRound().receiveDrawCard(inDrawCardPacket);
                break;
            case "wishColor":
                const inWishColorPacket = InWishColorPacket.getFromJSON(this, data);
                if(inWishColorPacket == null) return;
                if(this.currentroom == undefined) return;
                if(this.currentroom.getCurrentRound() == undefined) return;
                this.currentroom.getCurrentRound().receiveWishColor(inWishColorPacket);
                break;
            case "playCard":
                const inPlayCardPacket = InPlayCardPacket.getFromJSON(this, data);
                if(inPlayCardPacket == null) return;
                if(this.currentroom == undefined) return;
                if(this.currentroom.getCurrentRound() == undefined) return;
                this.currentroom.getCurrentRound().receivePlayCard(inPlayCardPacket);
                break;
            case "startRound":
                const inStartRoundPacket = InStartRoundPacket.getFromJSON(this, data);
                if(inStartRoundPacket == null) return;
                if(this.currentroom == undefined) return;
                if(this.currentroom.getCurrentRound() == undefined) return;
                this.currentroom.receiveStartRound(inStartRoundPacket);
                break;
            default:
                this.send(new OutInvalidMessagePacket("Invalid Message", {"action":action,"data":data}));
                break;
        }
    }

    protected clearUpPlayer() {
        if(this.currentroom != undefined) {
            this.currentroom.removePlayer(this);
        }
        this.currentroom == undefined;
    }
    public abstract close();
    
}