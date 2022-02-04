import { BehaviorSubject, Observable } from "rxjs";
import { Player } from "../models/player.model";
import { RoundSettings } from "../models/round-settings.model";

export class RoomState {
    private players$ = new BehaviorSubject<Player[]>([]);
    private owner$ = new BehaviorSubject<Player | null>(null);
    private name$ = new BehaviorSubject<string>("");
    private isShowingSettings$ = new BehaviorSubject<boolean>(false);
    private settings$ = new BehaviorSubject<RoundSettings>({
        "allowdraw2ondraw4":true,
        "allowdraw4ondraw2":false,
        "allowdraw4ondraw4":true,
        "allowdraw4onwish":true,
        "allowwishondraw4":true,
        "allowwishonwish":true,
        "startcardamount":7
    });

    getPlayers(): Observable<Player[]> {
        return this.players$.asObservable();
    }

    getOwner(): Observable<Player | null> {
        return this.owner$.asObservable();
    }

    setOwner(player: Player) {
        this.owner$.next(player);
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

    getSettings(): Observable<RoundSettings> {
        return this.settings$.asObservable();
    }

    setSettings(settings: RoundSettings) {
        this.settings$.next(settings);
    }

    isShowingSettings(): Observable<boolean> {
        return this.isShowingSettings$;
    }

    toggleShowSettings() {
        this.isShowingSettings$.next(!this.isShowingSettings$.getValue());
    }
}
