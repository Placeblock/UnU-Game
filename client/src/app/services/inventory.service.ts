import { Injectable } from '@angular/core';
import { Color } from '../models/color';
import { NumberUnoCard } from '../models/number-uno-card';
import { SpecialUnoCard } from '../models/special-uno-card';
import { UnoCard } from '../models/uno-card';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  cards: UnoCard[] = [];

  addCard(unoCard: UnoCard) {
    this.cards.push(unoCard);
  }

  insertCard(unoCard: UnoCard, index: number) {
    this.cards.splice(index, 0, unoCard);
  }

  removeByIndex(index: number) {
    this.cards.splice(index, 1);
  }

  remove(unoCard: UnoCard) {
    this.cards.splice(this.cards.indexOf(unoCard), 1);
  }

  getCard(index: number): UnoCard {
    return this.cards[index];
  }
 
  getCards(): UnoCard[] {
    return this.cards
  }

  getNumberCards(): NumberUnoCard[] {
    return <NumberUnoCard[]> this.cards.filter((element) => {
      return element instanceof NumberUnoCard;
    });
  }

  getSpecialCards(): SpecialUnoCard[] {
    return <SpecialUnoCard[]> this.cards.filter((element) => {
      return element instanceof SpecialUnoCard;
    });
  }

  sort() {
    this.cards.sort((a, b) => {
      if(a.weight == b.weight) return 0;
      return a.weight > b.weight ? 1 : -1
    });
  }
}
