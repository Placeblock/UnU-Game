import { NumberUnoCard } from "./number/NumberUnoCard";
import { DrawFourUnoCard } from "./special/DrawFourUnoCard";
import { DrawTwoUnoCard } from "./special/DrawTwoUnoCard";
import { InvertDirectionUnoCard } from "./special/InvertDirectionUnoCard";
import { SuspendUnUCard } from "./special/SuspendUnoCard";
import { WishUnoCard } from "./special/WishUnoCard";
import { UnoCard } from "./UnoCard";

export function randomCard(): UnoCard {
    const random: number = Math.random() * 72;
    if(random < 4) {
        return new DrawFourUnoCard();
    }else if(random < 8) {
        return new WishUnoCard();
    }else if(random < 16) {
        return new InvertDirectionUnoCard(UnoCard.randomColor());
    }else if(random < 24) {
        return new DrawTwoUnoCard(UnoCard.randomColor());
    }else if(random < 32) {
        return new SuspendUnUCard(UnoCard.randomColor());
    }else {
        return new NumberUnoCard(UnoCard.randomColor(), Math.floor(Math.random()*9));
    }
}