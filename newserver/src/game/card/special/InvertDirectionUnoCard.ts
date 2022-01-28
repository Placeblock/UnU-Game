import { Round } from "../../Round";
import { Colorable } from "../Colorable";
import { UnoCard } from "../UnoCard";
import { SpecialUnoCard } from "./SpecialUnoCard";

export class InvertDirectionUnoCard extends SpecialUnoCard implements Colorable{
    protected readonly color: string;

    isValidNextCard(round: Round, card: UnoCard) {
        if("color" in card && card["color"] != this.color) return false;
        return true;
    }
    getColor() {
        return this.color;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"invert","color": this.color};
    }
    
}