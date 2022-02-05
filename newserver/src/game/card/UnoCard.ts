import { v4 } from "uuid";
import { Round } from "../Round";
import { NumberUnoCard } from "./number/NumberUnoCard";

export abstract class UnoCard {
    public static readonly colors: string[] = [
        "RED",
        "BLUE",
        "GREEN",
        "YELLOW"
    ];

    protected readonly uuid: string = v4();

    abstract isValidNextCard(round: Round, card: UnoCard);

    abstract asJson(): {};

    abstract getRandom(): UnoCard;

    public getUUID(): string {
        return this.uuid;
    }

    public static randomColor(): string {
        return UnoCard.colors[Math.floor(Math.random()* UnoCard.colors.length)];
    }

    public static getRandomCard() {
        return new NumberUnoCard("BLUE", 0);
    }

}