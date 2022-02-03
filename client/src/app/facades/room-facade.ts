import { Observable } from "rxjs";
import { Player } from "../models/player.model";
import { RoomState } from "../states/room-state";

export class RoomFacade {

    constructor(private roomState: RoomState) {}

    getPlayers(): Observable<Player[]> {
        return this.roomState.getPlayers();
    }

    getOwner(): Observable<Player | null> {
        return this.roomState.getOwner();
    }

    kickPlayer(player: Player) {
        //TODO: WS Request
    }


}
