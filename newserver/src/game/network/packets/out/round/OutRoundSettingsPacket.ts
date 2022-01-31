import { RoundSettings } from "../../../../RoundSettings";
import { OutPacket } from "../OutPacket";

export class OutRoundSettingsPacket extends OutPacket {
    protected readonly action: string = "roundSettings";
    private readonly settings: RoundSettings;

    constructor(settings: RoundSettings) {
        super();
        this.settings = settings;
    }

    public asJSON(): {} {
        return {"action":this.action,"settings":this.settings};
    }

    public getSettings(): RoundSettings {
        return this.settings;
    }
}