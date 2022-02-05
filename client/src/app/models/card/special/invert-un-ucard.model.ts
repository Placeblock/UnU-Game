import * as cardcolor from "../color.model";
import {Color} from "../color.model";
import { JSONUnUCard } from "../jsonun-ucard";
import { SpecialUnUCard } from "./special-un-ucard.model";

export class InvertUnUCard extends SpecialUnUCard{
    protected weight: number;
    protected readonly color: Color;

    constructor(color: Color) {
        super();
        this.color = color;
        this.weight = cardcolor.getWeight(color)+10;
    }
    getColor(): Color {
        return this.color;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"invert","color": this.color};
    }

    static fromJson(json: JSONUnUCard): InvertUnUCard {
        return new InvertUnUCard(Color[(json["color"] as keyof typeof Color)]);
    }
}
