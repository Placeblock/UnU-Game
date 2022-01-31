import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { Player } from '../models/player.model';
import { Room } from '../models/room.model';
import { AuthService } from './auth.service';
import { GameService } from './game.service';
export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  subject$: WebSocketSubject<{[key: string]: any}> = webSocket(WS_ENDPOINT);

  constructor(router: Router, gameService: GameService, authService: AuthService) {
    this.subject$.subscribe((data)=> {
      console.log(data);
      const action = data["action"];
      switch (action) {
        case "playerData":
          gameService.setPlayer(new Player(data["player"]["uuid"],data["player"]["name"]));
          break;
        case "playerJoinedRoom":
          gameService.getCurrentRoom()?.addPlayer(new Player(data["player"]["uuid"],data["player"]["name"]));
          break;
        case "joinedRoom":
          if(data["room"]["owner"]["uuid"] == gameService.getPlayer().getUUID()) {
            gameService.setCurrentRoom(new Room(gameService.getPlayer(), data["room"]["name"]));
          }else {
            gameService.setCurrentRoom(new Room(new Player(data["room"]["owner"]["uuid"],data["room"]["owner"]["name"]), data["room"]["name"]));
          }
          for(const jsonplayer of data["room"]["players"]) {
            if(gameService.getCurrentRoom()?.getOwner().getUUID() != jsonplayer["uuid"]) {
              if(jsonplayer["uuid"] == gameService.getPlayer().getUUID()) {
                gameService.getCurrentRoom()?.addPlayer(gameService.getPlayer());
              }else {
                gameService.getCurrentRoom()?.addPlayer(new Player(jsonplayer["uuid"], jsonplayer["name"]));
              }
            }
          }
          router.navigate([data["room"]["name"]]);
          break;
        case "playerLeftRoom":
          gameService.getCurrentRoom()?.removePlayer(data["player"]["uuid"]);
          break;
        case "newOwner":
          const player = gameService.getCurrentRoom()?.getPlayer(data["player"]["uuid"]);
          if(player == undefined) return;
          gameService.getCurrentRoom()?.setOwner(player);
          break;
        default:
          break;
      }
    })
  }

  sendMessage(action: string, data: {}) {
    this.subject$.next({"action":action,"data":data});
  }
}
