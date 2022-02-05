import { v4 } from "uuid";
import { Color } from "./color.model";
import { JSONUnUCard } from "./jsonun-ucard";
import { NumberUnUCard } from "./number/number-un-ucard.model";
import { Draw2UnUCard } from "./special/draw2-un-ucard.model";
import { Draw4UnUCard } from "./special/draw4-un-ucard.model";
import { InvertUnUCard } from "./special/invert-un-ucard.model";
import { SuspendUnUCard } from "./special/suspend-un-ucard.model";
import { WishUnUCard } from "./special/wish-un-ucard.model";
export abstract class UnUCard {
    protected readonly uuid: string = v4();
    protected abstract readonly weight: number;

    abstract asJson(): {};

    public getUUID(): string {
        return this.uuid;
    }

    public getWeight(): number {
        return this.weight;
    }

    public test(test: string) {

    }
}
