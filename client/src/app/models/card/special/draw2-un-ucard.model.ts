import { Color } from "../color.model";
import * as cardcolor from "../color.model"
import { Colorable } from "../colorable.model";
import { SpecialUnUCard } from "./special-un-ucard.model";
import { JSONUnUCard } from "../jsonun-ucard";

export class Draw2UnUCard extends SpecialUnUCard implements Colorable {
    protected weight: number;
    protected readonly color: Color;

    constructor(color: Color) {
        super();
        this.color = color;
        this.weight = cardcolor.getWeight(color)+8;
    }    
    
    static fromJson(json: JSONUnUCard): Draw2UnUCard {
        return new Draw2UnUCard(Color[(json["color"] as keyof typeof Color)]);
    }

    getColor() {
        return this.color;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"draw2","color": this.color};
    }
    
}