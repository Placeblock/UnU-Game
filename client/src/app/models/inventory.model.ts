import { BehaviorSubject, Observable } from "rxjs";
import { UnUCard } from "./card/un-ucard.model";

export class Inventory {
    private readonly cards = new BehaviorSubject<UnUCard[]>([]);
    private hoveredcard: UnUCard | undefined;

    addCard(card: UnUCard) {
        if(this.cards.getValue().includes(card)) return;
        this.cards.next([...this.cards.getValue(), card]);
    }

    removeCard(card: UnUCard) {
        if(!this.cards.getValue().includes(card)) return;
        this.cards.next(this.cards.getValue().filter(value => value.getUUID() != card.getUUID()));
    }

    getCards(): Observable<UnUCard[]> {
        return this.cards.asObservable();
    }

    setHoveredCard(card: UnUCard) {
        this.hoveredcard = card;
    }

    getHoveredCard(): UnUCard | undefined {
        return this.hoveredcard;
    }

    sort() {
      this.cards.next(this.cards.getValue().sort((a, b) => {
        if(a.getWeight() == b.getWeight()) return 0;
        return a.getWeight() > b.getWeight() ? 1 : -1
      }));
    }

    calculateRotation(index: number): number {
        const cardscount = this.cards.getValue().length;
        const betweencardsangle = 60/cardscount;
        const absoluteindexangle = (index+0.5)*betweencardsangle;
        return (absoluteindexangle - 30)
    }
}
