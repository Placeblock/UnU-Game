import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../models/player.model';
import { Room } from '../models/room.model';
import { RoundSettings } from '../models/round-settings.model';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private curretroom: Room | undefined;
  private player: Player | undefined = undefined;
  private authgamename: string = "";
  private roundsettings: RoundSettings = {
    "allowdraw2ondraw4":true,
    "allowdraw4ondraw2":true,
    "allowdraw4ondraw4":true,
    "allowdraw4onwish":false,
    "allowwishondraw4":false,
    "allowwishonwish":false,
    "startcardamount":7
  };

  constructor(public websocketService: WebsocketService, router: Router) {

  }

  getPlayer(): Player{
    if(this.player == undefined) {
      return new Player("undefined","undefined");
    }
    return this.player;
  }

  setPlayer(player: Player) {
    this.player = player;
  }

  getCurrentRoom(): Room | undefined {
    return this.curretroom;
  }

  setCurrentRoom(room: Room) {
    this.curretroom = room;
  }

  setAuthGameName(name: string) {
    this.authgamename = name;
  }

  getAuthGameName(): string {
    return this.authgamename;
  }

  getRoundSettings(): RoundSettings {
    return this.roundsettings;
  }

  setRoundSettings(roundSettings: RoundSettings) {
    this.roundsettings = roundSettings;
    this.websocketService.sendMessage("roundSettings", {"settings":roundSettings});
  }
}
