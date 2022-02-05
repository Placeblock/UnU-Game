import { Color } from "../color.model";
import { Colorable } from "../colorable.model";
import { JSONUnUCard } from "../jsonun-ucard";
import { UnUCard } from "../un-ucard.model";

export class NumberUnUCard extends UnUCard implements Colorable {
    protected weight: number;
    protected readonly number: number;
    protected readonly color: Color;

    constructor(uuid: string, number: number, color: Color) {
        super(uuid);
        this.color = color;
        this.number = number;
        this.weight = color.weight+number;
    }

    static fromJson(json: JSONUnUCard): NumberUnUCard {
        return new NumberUnUCard(json["uuid"], json["number"], Color.fromString(json["color"]))
    }

    getColor(): Color {
        return this.color;
    }

    getNumber(): number {
        return this.number;
    }

    asJson(): {} {
        return {"uuid":this.uuid,"type":"number","color": this.color.variable, "number": this.number};
    }
}
