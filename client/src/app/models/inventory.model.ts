import { UnUCard } from "./card/un-ucard.model";

export class Inventory {
    private readonly cards: UnUCard[] = [];
    private hoveredcard: UnUCard | undefined;

    addCard(card: UnUCard) {
        if(this.cards.includes(card)) return;
        this.cards.push(card);
    }

    removeCard(card: UnUCard) {
        if(!this.cards.includes(card)) return;
        this.cards.splice(this.cards.indexOf(card), 1);
    }

    getCards(): UnUCard[] {
        return this.cards;
    }

    setHoveredCard(card: UnUCard) {
        this.hoveredcard = card;
    }

    getHoveredCard(): UnUCard | undefined {
        return this.hoveredcard;
    }

    sort() {
      this.cards.sort((a, b) => {
        if(a.getWeight() == b.getWeight()) return 0;
        return a.getWeight() > b.getWeight() ? 1 : -1
      });
    }
}
