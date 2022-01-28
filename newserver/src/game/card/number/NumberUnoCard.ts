import { Round } from "../../Round";
import { Colorable } from "../Colorable";
import { UnoCard } from "../UnoCard";

export class NumberUnoCard extends UnoCard implements Colorable {
    protected readonly number: number;
    protected readonly color: string;

    constructor(color: string, number: number) {
        super();
        this.color = color;
        this.number = number;
    }

    getColor() {
        return this.color;
    }

    getNumber(): number {
        return this.number;
    }

    isValidNextCard(round: Round, card: UnoCard): boolean {
        if("color" in card && this.color != card["color"]) return false;
        if(card instanceof NumberUnoCard && card.number != this.number) return false;
        return true;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"number","color": this.color, "number": this.number};
    }
}