import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Player } from "../models/player";
import { RoundSettings } from "../models/roundsettings";
import { RoundState } from "./round-state.service";

@Injectable({
    providedIn: 'root'
})
export class RoomState {
    private players$ = new BehaviorSubject<Player[]>([]);
    private me$ = new BehaviorSubject<Player>({"name":"undefined","uuid":"undefined"});
    private owner$ = new BehaviorSubject<Player | null>(null);
    private name$ = new BehaviorSubject<string>("");
    private authName$ = new BehaviorSubject<string>("");
    private isShowingSettings$ = new BehaviorSubject<boolean>(false);
    private settings$ = new BehaviorSubject<RoundSettings>(RoundState.defaultsettings);
    private isRoundRunning$ = new BehaviorSubject<boolean>(false);

    getPlayers(): Observable<Player[]> {
        return this.players$.asObservable();
    }

    setPlayers(players: Player[]) {
        console.log("setPlayers");
        this.players$.next(players);
    }

    getOwner(): Observable<Player | null> {
        return this.owner$.asObservable();
    }

    setOwner(player: Player) {
        console.log("setOwner");
        this.owner$.next(player);
    }

    getMe(): Observable<Player> {
        return this.me$.asObservable();
    }

    setMe(player: Player) {
        console.log("setMe");
        this.me$.next(player);
    }

    addPlayer(player: Player) {
        this.players$.next([...this.players$.getValue(), player])
    }

    removePlayer(player: Player) {
        this.players$.next(this.players$.getValue().filter(p => p.uuid != player.uuid));
    }

    getName(): Observable<string> {
        return this.name$.asObservable();
    }

    getNameValue(): string {
        return this.name$.getValue();
    }

    setName(name: string) {
        console.log("setName");
        this.name$.next(name);
    }
    
    getAuthName(): Observable<string> {
        return this.authName$;
    }

    setAuthName(name: string) {
        console.log("setAuthname");
        this.authName$.next(name);
    }

    getAuthNameValue(): string {
        return this.authName$.getValue();
    }

    getSettings(): Observable<RoundSettings> {
        return this.settings$.asObservable();
    }

    setSettings(settings: RoundSettings) {
        console.log("setSettings");
        this.settings$.next(settings);
    }

    isShowingSettings(): Observable<boolean> {
        return this.isShowingSettings$;
    }

    setShowSettings(show: boolean) {
        console.log("setShowSettings");
        this.isShowingSettings$.next(show);
    }

    toggleShowSettings() {
        console.log("toggleShowSettings");
        this.isShowingSettings$.next(!this.isShowingSettings$.getValue());
    }

    isRoundRunning(): Observable<boolean> {
        return this.isRoundRunning$.asObservable();
    }

    setRoundRunning(running: boolean) {
        console.log("setRoundRunning");
        this.isRoundRunning$.next(running);
    }
}
