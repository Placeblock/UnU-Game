import { Component } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { faSortAmountDownAlt, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { GameService } from 'src/app/services/game.service';
import { UnoCard } from 'src/app/models/uno-card';
import { CardstackService } from 'src/app/services/cardstack.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  faSort = faSortAmountDownAlt;
  faBullhorn = faBullhorn;

  constructor(public inventoryService: InventoryService, public gameService: GameService, public cardStackService: CardstackService) { }

  calculateXTranslate(): number {
    return Math.min(window.innerWidth/this.inventoryService.getCards().length/2, 30);
  }

  getRotation(index: number): number {
    const cardscount = this.inventoryService.getCards().length;
    const betweencardsangle = 60/cardscount;
    const absoluteindexangle = (index+0.5)*betweencardsangle;
    return (absoluteindexangle - 30)
  }

  dropCard(element: HTMLElement, card: UnoCard) {
    if(this.gameService.currentplayer != this.gameService.player) return;
    const cardstack = document.getElementById('cardstack');
    if(cardstack == null) return
    const newx = cardstack.getBoundingClientRect().left;
    const newy = cardstack.getBoundingClientRect().top;
    element.style.cssText = "transform: !important";
    setTimeout(() => {
      element.style.cssText = "transform: translateX("+(newx - element.getBoundingClientRect().left)+"px) translateY("+(newy - element.getBoundingClientRect().top)+"px) !important";
    }, 500)
    setTimeout(() => {
      this.inventoryService.remove(card);
      this.cardStackService.addCard(card);
    }, 1000)
  }
}
