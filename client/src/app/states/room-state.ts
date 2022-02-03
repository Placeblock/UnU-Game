import { BehaviorSubject, Observable } from "rxjs";
import { Player } from "../models/player.model";

export class RoomState {
    private players$ = new BehaviorSubject<Player[]>([]);
    private owner$ = new BehaviorSubject<Player | null>(null);
    private name$ = new BehaviorSubject<string>("");

    getPlayers(): Observable<Player[]> {
        return this.players$.asObservable();
    }

    getOwner(): Observable<Player | null> {
        return this.owner$.asObservable();
    }

    addPlayer(player: Player) {
        this.players$.next([...this.players$.getValue(), player])
    }

    removePlayer(player: Player) {
        this.players$.next(this.players$.getValue().filter(p => p != player));
    }

    getName(): Observable<string> {
        return this.name$.asObservable();
    }

    setName(name: string) {
        this.name$.next(name);
    }
}
