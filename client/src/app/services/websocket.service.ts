import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { Player } from '../models/player';
import { GameService } from './game.service';
export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  subject$: WebSocketSubject<{[key: string]: any}> = webSocket(WS_ENDPOINT);

  constructor(gameService: GameService) {
    this.subject$.subscribe((data)=> {
      const action = data["action"];
      console.log(data);
      switch (action) {
        case "playerData":
          gameService.player = new Player(data["uuid"],data["name"])
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
