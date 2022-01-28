import { Player } from "../../../player/Player";
import { RoundSettings } from "../../../RoundSettings";
import { InPacket } from "./InPacket";

export class InStartRoundPacket extends InPacket {
    private readonly roundSettings: RoundSettings;
    private readonly player: Player;

    constructor(player: Player,
        startcardamount: number, 
        allowdraw2ondraw4: boolean, 
        allowdraw4ondraw2: boolean, 
        allowdraw4ondraw4: boolean,
        allowwishondraw4: boolean,
        allowdraw4onwish: boolean,
        allowwishonwish: boolean) {
        super();
        this.player = player;
        this.roundSettings = {"startcardamount":startcardamount,
                              "allowdraw2ondraw4":allowdraw2ondraw4, 
                              "allowdraw4ondraw2":allowdraw4ondraw2,
                              "allowdraw4ondraw4":allowdraw4ondraw4,
                              "allowwishondraw4":allowwishondraw4,
                              "allowdraw4onwish":allowdraw4onwish,
                              "allowwishonwish":allowwishonwish};
    }

    public getRoundSettings(): RoundSettings {
        return this.roundSettings;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public static getFromJSON(player: Player, json: {}): InStartRoundPacket {
        if(!("startcardamount" in json) || 
           !("allowdraw2ondraw4" in json) ||
           !("allowdraw4ondraw2" in json) ||
           !("allowdraw4ondraw4" in json) ||
           !("allowwishondraw4" in json) ||
           !("allowdraw4onwish" in json) ||
           !("allowwishonwish" in json)) return null;
        return new InStartRoundPacket(player, 
                                        json["startcardamount"],
                                        json["allowdraw2ondraw4"],
                                        json["allowdraw4ondraw2"],
                                        json["allowdraw4ondraw4"],
                                        json["allowwishondraw4"],
                                        json["allowdraw4onwish"],
                                        json["allowwishonwish"]);
    }
}