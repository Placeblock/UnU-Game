import { uuid } from "uuidv4";
import { Round } from "../Round";

export abstract class UnoCard {
    protected readonly uuid: string = uuid();

    abstract isValidNextCard(round: Round, card: UnoCard);

    abstract asJson(): {};

    public getUUID(): string {
        return this.uuid;
    }
}