import { Round } from "../../Round";
import { Colorable } from "../Colorable";
import { UnoCard } from "../UnoCard";
import { DrawFourUnoCard } from "./DrawFourUnoCard";
import { SpecialUnoCard } from "./SpecialUnoCard";

export class DrawTwoUnoCard extends SpecialUnoCard implements Colorable {
    protected readonly color: string;

    constructor(color: string) {
        super();
        this.color = color;
    }

    getRandom(): UnoCard {
        return new DrawTwoUnoCard(UnoCard.randomColor());
    }

    isValidNextCard(round: Round, card: UnoCard) {
        if(card instanceof DrawFourUnoCard && !round.getSettings().allowdraw4ondraw2) return false;
        if(card instanceof DrawTwoUnoCard) return true;
        if("color" in card && card["color"] != this.color) return false;
        return true;
    }

    getColor() {
        return this.color;
    }

    asJson(): {} {
        return {"uuid":this.uuid,"type":"draw2","color": this.color};
    }
    
}