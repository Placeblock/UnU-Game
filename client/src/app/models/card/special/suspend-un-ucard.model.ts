import { Color } from "../color.model";
import { Colorable } from "../colorable.model";
import { SpecialUnUCard } from "./special-un-ucard.model";
import { JSONUnUCard } from "../jsonun-ucard";

export class SuspendUnUCard extends SpecialUnUCard implements Colorable {
    protected weight: number;
    protected readonly color: Color;

    constructor(uuid: string, color: Color) {
        super(uuid);
        this.color = color;
        this.weight = color.weight+12;
    }

    getColor(): Color {
        return this.color;
    }

    static fromJson(json: JSONUnUCard): SuspendUnUCard {
        return new SuspendUnUCard(json["uuid"], Color.fromString(json["color"]));
    }

    asJson(): {} {
        return {"uuid":this.uuid,"type":"suspend","color": this.color.variable};
    }
    
}