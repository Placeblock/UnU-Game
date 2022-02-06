import { Round } from "../../Round";
import { Colorable } from "../Colorable";
import { UnoCard } from "../UnoCard";
import { SpecialUnoCard } from "./SpecialUnoCard";

export class SuspendUnUCard extends SpecialUnoCard implements Colorable{
    protected readonly color: string;

    constructor(color: string) {
        super();
        this.color = color;
    }

    getRandom(): UnoCard {
        return new SuspendUnUCard(UnoCard.randomColor());
    }

    isValidNextCard(round: Round, card: UnoCard) {
        if(card instanceof SuspendUnUCard) return true;
        if("color" in card && card["color"] != this.color) return false;
        return true;
    }

    getColor() {
        return this.color;
    }

    asJson(): {} {
        return {"uuid":this.uuid,"type":"suspend","color": this.color};
    }
    
}