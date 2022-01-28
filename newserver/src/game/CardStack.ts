import { UnoCard } from "./card/UnoCard";



export class CardStack {
    private static readonly registeredCards: Map<{new (): UnoCard}, number> = new Map;

    public static registerCard(cardType: {new (): UnoCard}, chance: number) {
        this.registeredCards.set(cardType, chance);
    }

    public static unregisterCard(cardType: {new (): UnoCard}) {
        if(!this.registeredCards.has(cardType)) {
            console.warn("Tried to unregister non existing Card");
            return;
        }
        this.registeredCards.delete(cardType);
    }

    public static getRandom(): UnoCard {
        var cardarray: {new (): UnoCard}[] = [];
        this.registeredCards.forEach((value, key) => {
            for(var i = 0; i < value; i++) {
                cardarray.push(key);
            }
        });
        return new cardarray[Math.random()*cardarray.length];
    }
}