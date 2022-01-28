import { Packet } from "../../Packet";

export abstract class OutPacket extends Packet {
    protected abstract readonly action: string;

    abstract asJSON(): {};

    getAction(): string {
        return this.action;
    }
}