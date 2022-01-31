import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerregistryService {
  players: {[key:string]: Player} = {}

  registerPlayer(player: Player) {
    this.players[player.getUUID()] = player;
  }

  unregisterPlayer(uuid: string) {
    delete this.players[uuid];
  }

  getPlayer(uuid: string) {
    return this.players[uuid];
  }
}
