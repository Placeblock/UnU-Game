import { NumberUnoCard } from "./number-uno-card";
import { UnoCard } from "./uno-card";

export class Player {
    private id: string;
    private name: string;
    private cards: UnoCard[] = [];
    private hoveredindex: number = 3;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    getUUID(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
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

    getHoveredIndex(): number {
        return this.hoveredindex;
    }
}
