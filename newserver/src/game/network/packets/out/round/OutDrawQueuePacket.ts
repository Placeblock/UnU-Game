import { OutPacket } from "../OutPacket";

export class OutDrawQueuePacket extends OutPacket {
    protected readonly action: string = "drawQueue";
    private readonly amount: number;

    constructor(amount: number) {
        super();
        this.amount = amount;
    }

    asJSON(): {} {
        return {"action":this.action,"amount":this.amount};
    }

    public getAmount(): number {
        return this.amount;
    }
}