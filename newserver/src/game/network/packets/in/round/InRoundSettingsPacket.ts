import { Player } from "../../../../player/Player";
import { InPacket } from "../InPacket";
import { RoundSettings } from "../../../../RoundSettings";

export class InRoundSettingsPacket extends InPacket {
    private readonly player: Player;
    private readonly settings: RoundSettings;

    constructor(player: Player, settings: RoundSettings) {
        super();
        this.settings = settings;
        this.player = player;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getSettings(): RoundSettings {
        return this.settings;
    }

    public static getFromJSON(player: Player, json: {}): InRoundSettingsPacket {
        if(!("settings" in json)) return undefined;
        if(!("startcardamount" in json["settings"])) return undefined;
        if(!("allowdraw2ondraw4" in json["settings"])) return undefined;
        if(!("allowdraw4ondraw2" in json["settings"])) return undefined;
        if(!("allowdraw4ondraw4" in json["settings"])) return undefined;
        if(!("allowwishondraw4" in json["settings"])) return undefined;
        if(!("allowdraw4onwish" in json["settings"])) return undefined;
        if(!("allowwishonwish" in json["settings"])) return undefined;
        return new InRoundSettingsPacket(player, {
            "startcardamount": json["settings"]["startcardamount"],
            "allowdraw2ondraw4": json["settings"]["allowdraw2ondraw4"],
            "allowdraw4ondraw2": json["settings"]["allowdraw4ondraw2"],
            "allowdraw4ondraw4": json["settings"]["allowdraw4ondraw4"],
            "allowwishondraw4": json["settings"]["allowwishondraw4"],
            "allowdraw4onwish": json["settings"]["allowdraw4onwish"],
            "allowwishonwish": json["settings"]["allowwishonwish"]
        });
    }

}