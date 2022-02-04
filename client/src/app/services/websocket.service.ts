import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { Player } from '../models/player.model';
import { RoomState } from '../states/room-state';
export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  subject$: WebSocketSubject<{[key: string]: any}> = webSocket(WS_ENDPOINT);

  constructor(router: Router,private roomState: RoomState) {
    this.subject$.subscribe((data) => {
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
          this.roomState.removePlayer(data["player"]["uuid"]);
          break;
        case "playerJoinedRoom":
          this.roomState.addPlayer(new Player(data["player"]["uuid"],data["player"]["name"]));
          break;
        case "newOwner":
          this.roomState.setOwner(data["player"]["uuid"]);
          break;
        case "roundSettings":
          this.roundsettings = data["settings"];
          break;
        default:
          break;
      }
    });
  }

  sendMessage(action: string, data: {}) {
    this.subject$.next({"action":action,"data":data});
  }
}
