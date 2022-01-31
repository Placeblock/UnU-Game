import { v4 } from "uuid";
import { Round } from "../round.model";

export abstract class UnUCard {
    protected readonly uuid: string = v4();
    protected abstract readonly weight: number;

    abstract isValidNextCard(round: Round, card: UnUCard): boolean;

    abstract asJson(): {};

    public getUUID(): string {
        return this.uuid;
    }

    public getWeight(): number {
        return this.weight;
    }
}
