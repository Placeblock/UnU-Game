import { Color } from "../color.model";
import { JSONUnUCard } from "../jsonun-ucard";
import { SpecialUnUCard } from "./special-un-ucard.model";

export class Draw4UnUCard extends SpecialUnUCard{
    protected weight: number = 60;
    protected chosencolor: Color = Color.WHITE;

    constructor(uuid: string) {
        super(uuid);
    }

    static fromJson(json: JSONUnUCard): Draw4UnUCard {
        return new Draw4UnUCard(json["uuid"]);
    }

    asJson(): {} {
        return {"uuid":this.uuid,"type":"draw4"};
    }

    getChosenColor(): Color {
        return this.chosencolor;
    }

    setChosenColor(color: Color) {
        this.chosencolor = color;
    }

}