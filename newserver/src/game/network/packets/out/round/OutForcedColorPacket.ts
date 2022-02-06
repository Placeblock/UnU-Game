import { OutPacket } from "../OutPacket";

export class OutForcedColorPacket extends OutPacket {
    protected readonly action: string = "forcedColor";
    private readonly color: string;

    constructor(color: string) {
        super();
        this.color = color;
    }

    asJSON(): {} {
        return {"action":this.action,"color":this.color};
    }

    public getColor(): string {
        return this.color;
    }
}