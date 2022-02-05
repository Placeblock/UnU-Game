import { NumberUnoCard } from "./number/NumberUnoCard";
import { UnoCard } from "./UnoCard";

export function randomCard(): UnoCard {
    return new NumberUnoCard(UnoCard.randomColor(), Math.floor(Math.random()*9));
}