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
    websocketService.subject$.subscribe((data) => {
      console.log(data);
      switch (data["action"]) {
        case "playerData":
          this.setPlayer(new Player(data["player"]["uuid"],data["player"]["name"]));
          break;
        case "joinedRoom":
          if(data["room"]["owner"]["uuid"] == this.getPlayer().getUUID()) {
            this.setCurrentRoom(new Room(this.getPlayer(), data["room"]["name"]));
          }else {
            this.setCurrentRoom(new Room(new Player(data["room"]["owner"]["uuid"],data["room"]["owner"]["name"]), data["room"]["name"]));
          }
          for(const jsonplayer of data["room"]["players"]) {
            if(this.getCurrentRoom()?.getOwner().getUUID() != jsonplayer["uuid"]) {
              if(jsonplayer["uuid"] == this.getPlayer().getUUID()) {
                this.getCurrentRoom()?.addPlayer(this.getPlayer());
              }else {
                this.getCurrentRoom()?.addPlayer(new Player(jsonplayer["uuid"], jsonplayer["name"]));
              }
            }
          }
          router.navigate([data["room"]["name"]]);
          break;
        case "playerLeftRoom":
          this.getCurrentRoom()?.removePlayer(data["player"]["uuid"]);
          break;
        case "playerJoinedRoom":
          this.getCurrentRoom()?.addPlayer(new Player(data["player"]["uuid"],data["player"]["name"]));
          break;
        case "newOwner":
          const player = this.getCurrentRoom()?.getPlayer(data["player"]["uuid"]);
          if(player == undefined) return;
          this.getCurrentRoom()?.setOwner(player);
          break;
        case "roundSettings":
          this.roundsettings = data["settings"];
          break;
        default:
          break;
      }
    });
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
