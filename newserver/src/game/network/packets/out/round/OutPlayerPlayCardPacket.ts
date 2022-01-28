import { UnoCard } from "../../../../card/UnoCard";
import { Player } from "../../../../player/Player";
import { OutPacket } from "../OutPacket";

export class OutPlayerPlayCardPacket extends OutPacket {
    protected readonly action: string = "playCard";
    private readonly player: Player;
    private readonly unoCard: UnoCard;

    constructor(player: Player, unoCard: UnoCard) {
        super();
        this.player = player;
        this.unoCard = unoCard;
    }

    asJSON(): {} {
        return {"action":this.action,"player":this.player.asJSON(), "unocard": this.unoCard.asJson()};
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getUnoCard(): UnoCard {
        return this.unoCard;
    }
}