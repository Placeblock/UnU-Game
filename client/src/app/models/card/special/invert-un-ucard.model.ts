import {Color} from "../color.model";
import { JSONUnUCard } from "../jsonun-ucard";
import { SpecialUnUCard } from "./special-un-ucard.model";

export class InvertUnUCard extends SpecialUnUCard{
    protected weight: number;
    protected readonly color: Color;

    constructor(uuid: string, color: Color) {
        super(uuid);
        this.color = color;
        this.weight = color.weight+11;
    }

    getColor(): Color {
        return this.color;
    }

    asJson(): {} {
        return {"uuid":this.uuid,"type":"invert","color": this.color.variable};
    }

    static fromJson(json: JSONUnUCard): InvertUnUCard {
        return new InvertUnUCard(json["uuid"], Color.fromString(json["color"]));
    }
}
