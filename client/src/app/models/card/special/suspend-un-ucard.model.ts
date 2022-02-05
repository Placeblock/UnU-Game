import { Color } from "../color.model";
import * as cardcolor from "../color.model";
import { Colorable } from "../colorable.model";
import { SpecialUnUCard } from "./special-un-ucard.model";
import { UnUCard } from "../un-ucard.model";
import { JSONUnUCard } from "../jsonun-ucard";

export class SuspendUnUCard extends SpecialUnUCard implements Colorable {
    protected weight: number;
    protected readonly color: Color;

    constructor(color: Color) {
        super();
        this.color = color;
        this.weight = cardcolor.getWeight(color)+9;
    }

    getColor() {
        return this.color;
    }

    static fromJson(json: JSONUnUCard): SuspendUnUCard {
        return new SuspendUnUCard(Color[(json["color"] as keyof typeof Color)]);
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"suspend","color": this.color};
    }
    
}