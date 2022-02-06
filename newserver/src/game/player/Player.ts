import { v4 } from 'uuid';
import { InChangeNamePacket } from '../network/packets/in/room/InChangeNamePacket';
import { InDrawCardPacket } from '../network/packets/in/round/InDrawCardPacket';
import { InPlayCardPacket } from '../network/packets/in/round/InPlayCardPacket';
import { InStartRoundPacket } from '../network/packets/in/round/InStartRound';
import { InWishColorPacket } from '../network/packets/in/round/InWishColorPacket';
import { OutInvalidMessagePacket } from '../network/packets/out/OutInvalidMessagePacket';
import { OutPacket } from '../network/packets/out/OutPacket';
import { OutPlayerChangedNamePacket } from '../network/packets/out/room/OutPlayerChangedNamePacket';
import { OutPlayerLeftRoomPacket } from '../network/packets/out/room/OutPlayerLeftRoomPacket';
import { OutPlayerLeftRoundPacket } from '../network/packets/out/round/OutPlayerLeftRoundPacket';
import { generateSlug } from "random-word-slugs";
import { Room } from '../Room';
import { InJoinRoomPacket } from '../network/packets/in/room/InJoinRoomPacket';
import { RoomManager } from '../RoomManager';
import { OutInvalidJoinRoom } from '../network/packets/out/room/OutInvalidJoinRoom';
import { InRoundSettingsPacket } from '../network/packets/in/round/InRoundSettingsPacket';
import { InSayUNOPacket } from '../network/packets/in/round/InSayUNOPacket';
import { InEndTurnPacket } from '../network/packets/in/round/InEndTurnPacket';

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
                if(inJoinRoomPacket == null) {
                    this.send(new OutInvalidMessagePacket("Invalid Message!", data));
                }
                const room = RoomManager.getRoom(inJoinRoomPacket.getName());
                if(room == undefined) {
                    this.send(new OutInvalidJoinRoom(inJoinRoomPacket.getName(), "This room doesn't Exist"));
                    return;
                }
                if(room.getPlayers().includes(this)) {
                    this.send(new OutInvalidJoinRoom(room.getName(), "You are already in this Room!"));
                    return;
                }
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
            case "roundSettings":
                const inRoundSettingsPacket = InRoundSettingsPacket.getFromJSON(this, data);
                if(inRoundSettingsPacket == undefined) return;
                this.currentroom.setRoundSettings(inRoundSettingsPacket.getSettings());
                break;
            case "startRound":
                const inStartRoundPacket = InStartRoundPacket.getFromJSON(this, data);
                if(inStartRoundPacket == null) return;
                if(this.currentroom == undefined) return;
                if(this.currentroom.getCurrentRound() != undefined) return;
                this.currentroom.receiveStartRound(inStartRoundPacket);
                break;
            case "setName":
                const inChangeNamePacket = InChangeNamePacket.getFromJSON(this, data);
                if(inChangeNamePacket == null) return;
                this.name = inChangeNamePacket.getName();
                if(this.currentroom == undefined) return;
                this.currentroom.sendToAllPlayers(new OutPlayerChangedNamePacket(this), []);
                break;
            case "playCard":
                const inPlayCardPacket = InPlayCardPacket.getFromJSON(this, data);
                if(inPlayCardPacket == null) return;
                if(this.currentroom == undefined) return;
                if(this.currentroom.getCurrentRound() == undefined) return;
                this.currentroom.getCurrentRound().receivePlayCard(inPlayCardPacket);
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
            case "sayUNU":
                const inSayUnoPacket = InSayUNOPacket.getFromJSON(this, data);
                if(inSayUnoPacket == null) return;
                if(this.currentroom == undefined) return;
                if(this.currentroom.getCurrentRound() == undefined) return;
                this.currentroom.getCurrentRound().receiveSayUno(inSayUnoPacket);
                break;
            case "endTurn":
                const inEndTurnPacket = InEndTurnPacket.getFromJSON(this, data);
                if(inEndTurnPacket == null) return;
                if(this.currentroom == undefined) return;
                if(this.currentroom.getCurrentRound() == undefined) return;
                this.currentroom.getCurrentRound().receiveEndTurn(inEndTurnPacket);
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