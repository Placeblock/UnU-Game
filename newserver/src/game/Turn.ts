import { Player } from "./player/Player";
import { Room } from "./Room";

export class Turn {
    private readonly player: Player;
    private readonly room: Room;
    


    constructor(room: Room, player: Player) {
        this.player = player;
        this.room = room;
    }



}