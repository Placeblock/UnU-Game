import { InCreateRoomPacket } from "./network/packets/in/InCreateRoomPacket";
import { InStartRoundPacket } from "./network/packets/in/InStartRound";
import { OutPacket } from "./network/packets/out/OutPacket";
import { OutNewOwnerPacket } from "./network/packets/out/room/OutNewOwnerPacket";
import { OutPlayerJoinedRoomPacket } from "./network/packets/out/room/OutPlayerJoinedRoomPacket";
import { OutPlayerLeftRoomPacket } from "./network/packets/out/room/OutPlayerLeftRoomPacket";
import { Player } from "./player/Player";
import { RoomManager } from "./RoomManager";
import { Round } from "./Round";
import { RoundSettings } from "./RoundSettings";

export class Room {
    private uuid: string;
    private readonly players: Player[] = [];
    private owner: Player;
    private currentround: Round;

    constructor(owner: Player) {
        this.owner = owner;
        this.addPlayer(this.owner);
    }

    public getUUID(): string {
        return this.uuid;
    }

    public getPlayers(): Player[] {
        return this.players;
    }

    public addPlayer(player: Player) {
        if(this.players.includes(player)) {
            console.warn("Player is already in this Room");
            return;
        }
        this.players.push(player);
        this.sendToAllPlayers(new OutPlayerJoinedRoomPacket(player), [player]);
    }

    public removePlayer(player: Player) {
        if(!this.players.includes(player)) {
            console.warn("Tried to remove non existing player from Room!");
            return;
        }
        this.players.splice(this.players.indexOf(player));
        this.currentround.removePlayer(player);
        this.sendToAllPlayers(new OutPlayerLeftRoomPacket(player), []);
        if(player == this.owner) {
            this.owner = this.players[0];
            this.sendToAllPlayers(new OutNewOwnerPacket(this.owner), []);
        }
        if(this.players.length == 0) {
            RoomManager.unregisterRoom(this);
        }
    }

    public getCurrentRound():Round {
        return this.currentround;
    }

    public startNewRound(settings: RoundSettings): Round {
        var round: Round = new Round(this.players, settings, this);
        return round;
    }

    public sendToAllPlayers(packet: OutPacket, filterplayers: Player[]) {
        for(var player of this.players) {
            if(filterplayers.includes(player)) continue;
            player.send(packet);
        }
    }

    public receiveStartRound(packet: InStartRoundPacket) {
        if(this.currentround != undefined) return;
        this.currentround = new Round(this.players, packet.getRoundSettings(), this);
    }
}