import { Color } from "../color.model";
import { JSONUnUCard } from "../jsonun-ucard";
import { SpecialUnUCard } from "./special-un-ucard.model";

export class WishUnUCard extends SpecialUnUCard{
    protected weight: number = 59;
    protected chosencolor: Color = Color.WHITE;

    constructor(uuid: string) {
        super(uuid);
    }

    static fromJson(json: JSONUnUCard): WishUnUCard {
        return new WishUnUCard(json["uuid"]);
    }

    asJson(): {} {
        return {"uuid":this.uuid,"type":"wish"};
    }

    getChosenColor(): Color {
        return this.chosencolor;
    }

    setChosenColor(color: Color) {
        this.chosencolor = color;
    }
    
    
}