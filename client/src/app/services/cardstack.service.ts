import { Injectable } from '@angular/core';
import { UnoCard } from '../models/uno-card';

@Injectable({
  providedIn: 'root'
})
export class CardstackService {
  cards: UnoCard[] = [];

  addCard(card: UnoCard) {
    this.cards.push(card);
    if(this.cards.length > 5) {
      this.cards.splice(0, 1);
    }
  }

  getCards(): UnoCard[] {
    return this.cards;
  }

  constructor() { }
}
