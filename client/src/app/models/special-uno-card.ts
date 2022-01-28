import { UnoCard } from "./uno-card";

export class SpecialUnoCard extends UnoCard{
    type: string = "choosecolor";

    constructor(weight: number, color: string, type: string) {
        super(color, weight);
        this.type = type;
    }
}
