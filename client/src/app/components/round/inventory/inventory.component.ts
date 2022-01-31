import { Component } from '@angular/core';
import { faSortAmountDownAlt, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { GameService } from 'src/app/services/game.service';
import { UnUCard } from 'src/app/models/card/un-ucard.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  faSort = faSortAmountDownAlt;
  faBullhorn = faBullhorn;

  constructor(public gameService: GameService) { }

  calculateXTranslate(): number {
    const player = this.gameService.getPlayer();
    if(player != undefined) {
      const cardlength = this.gameService.getCurrentRoom()?.getCurrentRound()?.getInventory(player)?.getCards().length;
      if(cardlength == undefined) return 0;
      return  Math.min(window.innerWidth/cardlength/2,30)-cardlength*Math.min(window.innerWidth/cardlength/2, 30)/2;
    }
    return 0;
  }

  getRotation(index: number): number {
    const player = this.gameService.getPlayer();
    if(player == undefined) return 0;
    const cardlength = this.gameService.getCurrentRoom()?.getCurrentRound()?.getInventory(player)?.getCards().length;
    if(cardlength == undefined) return 0;
    const cardscount = cardlength;
    const betweencardsangle = 60/cardscount;
    const absoluteindexangle = (index+0.5)*betweencardsangle;
    return (absoluteindexangle - 30)
  }

  dropCard(element: HTMLElement, card: UnUCard) {
    if(this.gameService.getCurrentRoom()?.getCurrentRound()?.getCurrentPlayer() != this.gameService.getPlayer()) return;
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
    }, 1000)
  }
}
