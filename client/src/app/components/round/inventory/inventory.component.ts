import { Component } from '@angular/core';
import { faSortAmountDownAlt, faBullhorn, faCheck } from '@fortawesome/free-solid-svg-icons';
import { UnUCard } from 'src/app/models/card/un-ucard.model';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RoomState } from 'src/app/states/room-state.service';
import { RoundState } from 'src/app/states/round-state.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  faSort = faSortAmountDownAlt;
  faBullhorn = faBullhorn;
  faCheck = faCheck

  constructor(public roundState: RoundState, public roomState: RoomState, private webSocketService: WebsocketService) {
  }

  sayUnu() {
    this.webSocketService.sendMessage("sayUNU", {});
  }

  endTurn() {
    this.webSocketService.sendMessage("endTurn", {});
  }

  dropCard(element: HTMLElement, card: UnUCard) {
    if(this.roundState.currentplayer?.uuid != this.roomState.me?.uuid) return;
    this.webSocketService.sendMessage("playCard", {"card":card.asJson()});
    /*if(this.gameService.getCurrentRoom()?.getCurrentRound()?.getCurrentPlayer() != this.gameService.getPlayer()) return;
    const cardstack = document.getElementById('cardstack');
    if(cardstack == null) return
    const newx = cardstack.getBoundingClientRect().left;
    const newy = cardstack.getBoundingClientRect().top;
    element.style.cssText = "transform: !important";
    setTimeout(() => {
      element.style.cssText = "transform: translateX("+(newx - element.getBoundingClientRect().left)+"px) translateY("+(newy - element.getBoundingClientRect().top)+"px) !important";
    }, 500)
    setTimeout(() => {
      const player = this.gameService.getPlayer();
      if(player == undefined) return;
      this.gameService.getCurrentRoom()?.getCurrentRound()?.getInventory(player)?.removeCard(card);
      this.gameService.getCurrentRoom()?.getCurrentRound()?.setCurrentCard(card);
    }, 1000)*/
  }
}
