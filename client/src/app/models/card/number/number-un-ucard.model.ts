import { Round } from "../../round.model";
import { Color } from "../color.model";
import * as cardcolor from "../color.model";
import { Colorable } from "../colorable.model";
import { UnUCard } from "../un-ucard.model";

export class NumberUnUCard extends UnUCard implements Colorable {
    protected weight: number;
    protected readonly number: number;
    protected readonly color: Color;

    constructor(number: number, color: Color) {
        super();
        this.color = color;
        this.number = number;
        this.weight = cardcolor.getWeight(color)+number;
    }

    getColor(): Color {
        return this.color;
    }

    getNumber(): number {
        return this.number;
    }

    isValidNextCard(round: Round, card: UnUCard): boolean {
        if("color" in card && this.color != (card as any)["color"]) return false;
        if(card instanceof NumberUnUCard && card.number != this.number) return false;
        return true;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"number","color": this.color, "number": this.number};
    }
}
