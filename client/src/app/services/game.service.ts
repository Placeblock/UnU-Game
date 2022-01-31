import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private curretroom: Room | undefined;
  private player: Player | undefined = undefined;

  constructor() {
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
}
