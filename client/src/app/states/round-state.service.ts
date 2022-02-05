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
    private readonly _settings = new BehaviorSubject<RoundSettings>(RoundState.defaultsettings);
    settings$ = this._settings.asObservable();

    private _players = new BehaviorSubject<Player[]>([]);
    players$ = this._players.asObservable();

    private _currentplayer = new BehaviorSubject<Player | null>(null);
    currentplayer$ = this._currentplayer.asObservable();

    private _inventorys = new BehaviorSubject<Map<string, Inventory>>(new Map);
    inventorys$ = this._inventorys.asObservable();

    private _currentcard = new BehaviorSubject<UnUCard>(new NumberUnUCard("", 1, Color.BLUE));
    currentcard$ = this._currentcard.asObservable();

    private _forcedcolor = new BehaviorSubject<Color | null>(null);
    forcedcolor$ = this._forcedcolor.asObservable();

    private _showforcecolorselect = new BehaviorSubject<boolean>(false);
    showforcecolorselect$ = this._showforcecolorselect.asObservable();

    private _drawqueue = new BehaviorSubject<number>(0);
    drawqueue$ = this._drawqueue.asObservable();

    get drawqueue(): number {
        return this._drawqueue.getValue();
    }

    set drawqueue(amount: number) {
        this._drawqueue.next(amount);
    }

    get showforcecolor(): boolean {
        return this._showforcecolorselect.getValue();
    }

    set showforcecolor(show: boolean) {
        this._showforcecolorselect.next(show);
    }

    get players(): Player[] {
        return this._players.getValue();
    }

    set players(players: Player[]) {
        this._players.next(players);
    }

    addPlayer(player: Player) {
        this.players = [...this.players, player];
    }

    removePlayer(player: Player) {
        this.players = this.players.filter(value => value.uuid != player.uuid);
    }

    get settings(): RoundSettings {
        return this._settings.getValue();
    }

    set settings(settings: RoundSettings) {
        this._settings.next(settings);
    }

    get currentplayer(): Player | null {
        return this._currentplayer.getValue();
    }

    set currentplayer(player: Player | null) {
        this._currentplayer.next(player);
    }

    get inventorys(): Map<string, Inventory> {
        return this._inventorys.getValue();
    }

    set inventorys(inventorys: Map<string, Inventory>) {
        this._inventorys.next(inventorys);
    }

    getInventory(player: Player): Inventory | undefined {
        return this._inventorys.getValue().get(player.uuid);
    }

    setInventory(player: Player, inventory: Inventory) {
        this.inventorys = this.inventorys.set(player.uuid, inventory);
    }

    get currentcard(): UnUCard {
        return this._currentcard.getValue();
    }

    set currentcard(card: UnUCard) {
        this._currentcard.next(card);
    }

    get forcedcolor(): Color | null {
        return this._forcedcolor.value;
    }

    set forcedcolor(color: Color | null) {
        this._forcedcolor.next(color);
    }
}
