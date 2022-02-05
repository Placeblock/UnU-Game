import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Color } from "../models/card/color.model";
import { NumberUnUCard } from "../models/card/number/number-un-ucard.model";
import { UnUCard } from "../models/card/un-ucard.model";
import { Inventory } from "../models/inventory.model";
import { Player } from "../models/player";
import { RoundSettings } from "../models/roundsettings";

@Injectable({
    providedIn: 'root'
})
export class RoundState {
    public static readonly defaultsettings = {
        "allowdraw2ondraw4":true,
        "allowdraw4ondraw2":false,
        "allowdraw4ondraw4":true,
        "allowdraw4onwish":true,
        "allowwishondraw4":true,
        "allowwishonwish":true,
        "startcardamount":7
    }
    private settings$ = new BehaviorSubject<RoundSettings>(RoundState.defaultsettings);
    private players$ = new BehaviorSubject<Player[]>([]);
    private currentplayer$ = new BehaviorSubject<Player | null>(null);
    private inventorys$ = new BehaviorSubject<Map<string, BehaviorSubject<Inventory>>>(new Map);
    private currentcard$ = new BehaviorSubject<UnUCard>(new NumberUnUCard(1, Color.BLUE));
    private forcedcolor$ = new BehaviorSubject<Color | null>(null);

    getPlayers(): Observable<Player[]> {
        return this.players$.asObservable();
    }

    setPlayers(players: Player[]) {
        console.log("setPlayers");
        this.players$.next(players);
    }

    addPlayer(player: Player) {
        console.log("addPlayer");
        this.players$.next([...this.players$.getValue(), player]);
    }

    removePlayer(player: Player) {
        console.log("removePlayer");
        this.players$.next(
            this.players$.getValue().filter(value => value.uuid != player.uuid)
        );
    }

    getSettings(): Observable<RoundSettings> {
        return this.settings$.asObservable();
    }

    setSettings(settings: RoundSettings) {
        console.log("setSettings");
        this.settings$.next(settings);
    }

    setCurrentPlayer(player: Player) {
        console.log("setCurrentPlayer");
        this.currentplayer$.next(player);
    }

    getCurrentPlayer(): Observable<Player | null> {
        return this.currentplayer$.asObservable();
    }

    getInventory(player: Player): Observable<Inventory> | null {
        if(!this.inventorys$.getValue().has(player.uuid)) {
            return null;
        }
        console.log(this.inventorys$.getValue().get(player.uuid)?.asObservable());
        return this.inventorys$.getValue().get(player.uuid)?.asObservable()!;
    }

    setInventory(player: Player, inventory: Inventory) {
        console.log("setInventory");
        this.inventorys$.next(this.inventorys$.getValue().set(player.uuid, new BehaviorSubject<Inventory>(inventory)));
    }

    getCurrentCard(): Observable<UnUCard> {
        return this.currentcard$.asObservable();
    }

    setCurrentCard(unucard: UnUCard) {
        console.log("setCurrentCard");
        this.currentcard$.next(unucard);
    }

    getForcedColor(): Observable<Color | null> {
        return this.forcedcolor$.asObservable();
    }

    setForcedColor(color: Color | null) {
        console.log("setForcedColor");
        this.forcedcolor$.next(color);
    }
}
