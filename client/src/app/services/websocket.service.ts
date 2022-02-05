import { forwardRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { Color } from '../models/card/color.model';
import { JSONUnUCard } from '../models/card/jsonun-ucard';
import { NumberUnUCard } from '../models/card/number/number-un-ucard.model';
import { Draw2UnUCard } from '../models/card/special/draw2-un-ucard.model';
import { Draw4UnUCard } from '../models/card/special/draw4-un-ucard.model';
import { InvertUnUCard } from '../models/card/special/invert-un-ucard.model';
import { SuspendUnUCard } from '../models/card/special/suspend-un-ucard.model';
import { WishUnUCard } from '../models/card/special/wish-un-ucard.model';
import { UnUCard } from '../models/card/un-ucard.model';
import { Inventory } from '../models/inventory.model';
import { RoomState } from '../states/room-state.service';
import { RoundState } from '../states/round-state.service';
export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  subject$: WebSocketSubject<{[key: string]: any}> = webSocket(WS_ENDPOINT);

  constructor(router: Router, private roomState: RoomState, private roundState: RoundState) {
    this.subject$.subscribe((data) => {
      console.log(data);
      switch (data["action"]) {
        case "playerData":
          this.roomState.setMe(data["player"]);
          break;
        case "joinedRoom":
          this.roomState.setName(data["room"]["name"]);
          this.roomState.setOwner(data["room"]["owner"]);
          this.roomState.setSettings(data["room"]["settings"]);
          this.roomState.setPlayers(data["room"]["players"]);
          this.roomState.setShowSettings(false);
          router.navigate([data["room"]["name"]]);
          break;
        case "playerLeftRoom":
          this.roomState.removePlayer(data["player"]);
          break;
        case "playerJoinedRoom":
          this.roomState.addPlayer(data["player"]);
          break;
        case "newOwner":
          this.roomState.setOwner(data["player"]);
          break;
        case "roundSettings":
          this.roomState.setSettings(data["settings"]);
          break;
        case "inventoryData":
          const newInventory = new Inventory();
          for(const card of data["inventory"]) {
            const unucard = this.getCardFromJson(card);
            console.log(unucard);
            if(unucard == null) continue;
            newInventory.addCard(unucard);
          }
          this.roundState.setInventory(data["player"], newInventory);
          break;
        case "startRound":
          const unuCard = this.getCardFromJson(data["round"]["currentcard"]);
          if(unuCard == null) return;
          this.roundState.setCurrentCard(unuCard);
          this.roundState.setCurrentPlayer(data["round"]["currentplayer"])
          this.roundState.setForcedColor(null);
          this.roundState.setSettings(data["round"]["settings"]);
          for(const jsoninventory of data["round"]["inventorys"]) {
            const inventory = new Inventory();
            for(var i = 0; i < jsoninventory["cards"]; i++) {
              inventory.addCard(new NumberUnUCard(-1, Color.RED));
            }
            this.roundState.setInventory(jsoninventory["player"], inventory);
            this.roundState.addPlayer(jsoninventory["player"]);
          }
          this.roomState.setRoundRunning(true);
          break;
        default:
          break;
      }
    });
  }

  getCardFromJson(json: JSONUnUCard): UnUCard | null {
    if(!("type" in json)) return null;
    if(!("cardid" in json)) return null;
    switch (json["type"]) {
        case "number":
            return NumberUnUCard.fromJson(json);
        case "draw4":
            return Draw4UnUCard.fromJson(json);
        case "wish":
            return WishUnUCard.fromJson(json);
        case "draw2":
            return Draw2UnUCard.fromJson(json);
        case "invert":
            return InvertUnUCard.fromJson(json);
        case "suspend":
            return SuspendUnUCard.fromJson(json);
        default:
            return null;
    }
}

  sendMessage(action: string, data: {}) {
    this.subject$.next({"action":action,"data":data});
  }
}
