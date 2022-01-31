import { Round } from "../../round.model";
import * as cardcolor from "../color.model";
import {Color} from "../color.model";
import { UnUCard } from "../un-ucard.model";
import { SpecialUnUCard } from "./special-un-ucard.model";

export class InvertUnUCard extends SpecialUnUCard{
    protected weight: number;
    protected readonly color: Color;

    constructor(color: Color) {
        super();
        this.color = color;
        this.weight = cardcolor.getWeight(color)+10;
    }

    isValidNextCard(round: Round, card: UnUCard) {
        if("color" in card && (card as any)["color"] != this.color) return false;
        return true;
    }
    getColor(): Color {
        return this.color;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"invert","color": this.color};
    }
}
