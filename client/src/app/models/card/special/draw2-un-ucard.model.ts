import { Color } from "../color.model";
import { Colorable } from "../colorable.model";
import { SpecialUnUCard } from "./special-un-ucard.model";
import { JSONUnUCard } from "../jsonun-ucard";

export class Draw2UnUCard extends SpecialUnUCard implements Colorable {
    protected weight: number;
    protected readonly color: Color;

    constructor(uuid: string, color: Color) {
        super(uuid);
        this.color = color;
        this.weight = color.weight+10;
    }    
    
    static fromJson(json: JSONUnUCard): Draw2UnUCard {
        return new Draw2UnUCard(json["uuid"], Color.fromString(json["color"]));
    }

    getColor() {
        return this.color;
    }

    asJson(): {} {
        return {"uuid":this.uuid,"type":"draw2","color": this.color.variable};
    }
    
}