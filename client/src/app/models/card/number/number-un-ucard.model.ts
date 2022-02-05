import { Color } from "../color.model";
import * as cardcolor from "../color.model";
import { Colorable } from "../colorable.model";
import { JSONUnUCard } from "../jsonun-ucard";
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

    static fromJson(json: JSONUnUCard): NumberUnUCard {
        return new NumberUnUCard(json["number"], Color[(json["color"] as keyof typeof Color)])
    }

    getColor(): Color {
        return this.color;
    }

    getNumber(): number {
        return this.number;
    }

    asJson(): {} {
        return {"cardid":this.uuid,"type":"number","color": this.color, "number": this.number};
    }
}
