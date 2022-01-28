import { UnoCard } from "./card/UnoCard";

export class Inventory {
    private cards: UnoCard[] = [];

    public getCards(): UnoCard[] {
        return this.cards;
    }

    public getCardByID(uuid: string): UnoCard | null {
        for(const card of this.cards) {
            if(card.getUUID() == uuid) return card;
        }
        return null;
    }

    public addCard(unoCard: UnoCard) {
        this.cards.push(unoCard);
    }

    public removeCard(unoCard: UnoCard) {
        this.cards.splice(this.cards.indexOf(unoCard), 1);
    }

    public hasCard(unoCard: UnoCard) {
        return this.cards.includes(unoCard);
    }

    public hasCardID(cardid: string) {
        return this.cards.filter((card) => {return card.getUUID() == cardid}).length > 0;
    }

    public size(): number {
        return this.cards.length;
    }

    public asJSON(): {}[] {
        const jsoncards = [];
        for (var card of this.cards) {
            jsoncards.push(card.asJson());
        }
        return jsoncards;
    }
}