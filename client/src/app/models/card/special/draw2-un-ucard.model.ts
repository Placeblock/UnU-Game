import { Round } from "../../round.model";
import { Color } from "../color.model";
import * as cardcolor from "../color.model"
import { Colorable } from "../colorable.model";
import { UnUCard } from "../un-ucard.model";
import { Draw4UnUCard } from "./draw4-un-ucard.model";
import { SpecialUnUCard } from "./special-un-ucard.model";

export class Draw2UnUCard extends SpecialUnUCard implements Colorable {
    protected weight: number;
    protected readonly color: Color;

    constructor(color: Color) {
        super();
        this.color = color;
        this.weight = cardcolor.getWeight(color)+8;
    }

    isValidNextCard(round: Round, card: UnUCard) {
        if(card instanceof Draw4UnUCard && !round.getSettings().allowdraw2ondraw4) return false;
        if("color" in card && (card as any)["color"] != this.color) return false;
        return true;
    }

    getColor() {
        return this.color;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"draw2","color": this.color};
    }
    
}