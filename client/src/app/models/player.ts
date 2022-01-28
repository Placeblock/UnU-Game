import { NumberUnoCard } from "./number-uno-card";
import { UnoCard } from "./uno-card";

export class Player {
    id: string;
    name: string;
    cards: UnoCard[] = [];
    hoveredindex: number = 3;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    addCard(card: UnoCard) {
        this.cards.push(card);
    }

    removeCardByIndex(index: number) {
        this.cards.splice(index, 1);
    }

    removeCard(card: UnoCard) {
        this.removeCardByIndex(this.cards.indexOf(card));
    }

    getCards(): UnoCard[] {
        return this.cards;
    }
}
