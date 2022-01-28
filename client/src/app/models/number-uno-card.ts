import { UnoCard } from "./uno-card";

export class NumberUnoCard extends UnoCard{
    number: number = 0;

    constructor(weight: number, color: string, number: number) {
        super(color, weight);
        this.number = number;
    }
}
