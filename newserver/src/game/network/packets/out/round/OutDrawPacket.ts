import { UnoCard } from "../../../../card/UnoCard";
import { OutPacket } from "../OutPacket";

export class OutDrawPacket extends OutPacket {
    protected readonly action: string = "drawCard";
    private readonly unoCard: UnoCard;

    constructor(unoCard: UnoCard) {
        super();
        this.unoCard = unoCard;
    }

    asJSON(): {} {
        return {"action":this.action,"unocard":this.unoCard.asJson()};
    }

    public getUnoCard(): UnoCard {
        return this.unoCard;
    }
}