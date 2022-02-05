import { BehaviorSubject, Observable } from "rxjs";
import { UnUCard } from "./card/un-ucard.model";

export class Inventory {
    private _cards = new BehaviorSubject<UnUCard[]>([]);
    cards$: Observable<UnUCard[]> = this._cards.asObservable();

    private _hoveredcard = new BehaviorSubject<UnUCard | null>(null);
    hoveredcard$: Observable<UnUCard | null> = this._hoveredcard.asObservable();

    get cards(): UnUCard[] {
        return this._cards.getValue();
    }

    set cards(cards: UnUCard[]) {
        this._cards.next(cards);
    }

    addCard(card: UnUCard) {
        this.cards = [...this.cards, card];
    }

    removeCard(card: UnUCard) {
        this.cards = this.cards.filter(value => value.getUUID() != card.getUUID());
    }

    get hoveredCard(): UnUCard | null{
        return this._hoveredcard.getValue();
    }

    set hoveredCard(card: UnUCard | null) {
        this._hoveredcard.next(card);
    }

    sort() {
      this.cards = this.cards.sort((a, b) => {
        if(a.getWeight() == b.getWeight()) return 0;
        return a.getWeight() > b.getWeight() ? 1 : -1
      });
    }

    calculateRotation(index: number): number {
        const cardscount = this.cards.length;
        const betweencardsangle = 60/cardscount;
        const absoluteindexangle = (index+0.5)*betweencardsangle;
        return (absoluteindexangle - 30)
    }

    calculateXTranslate(index: number): number {
        const cardscount = this.cards.length;
        const totalwidth = window.innerWidth/2;
        const betweencardsx = Math.min(totalwidth/cardscount, 30);
        const absolutecardsx = index*betweencardsx;
        return absolutecardsx-betweencardsx*cardscount/2+15;
    }
}
