import { Injectable } from '@angular/core';
import { Color } from '../models/color';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  players: {[id: string]: Player} = {};
  currentplayer: Player | undefined = undefined;
  choosecolor: boolean = false;
  mandatorycolor: Color | null = null;
  player: Player | undefined = undefined;
  gameid: string = "";

  getPlayerById(id: string): Player {
    return this.players[id];
  }

  getPlayer() {
    return this.player;
  }

  getPlayers(): {[id: string]: Player} {
    return this.players;
  }

  getCurrentPlayer(): Player | undefined {
    return this.currentplayer;
  }

  chooseColor() {
    this.choosecolor = true;
  }

  setMandatoryColor(color: Color) {
    this.mandatorycolor = color;
  }

  constructor() {
  }
}
