import { OutPacket } from "../../network/packets/out/OutPacket";
import { Player } from "../Player";

export class BotPlayer extends Player {
    
    public send(packet: OutPacket) {
        throw new Error("Method not implemented.");
    }
    public close() {
        throw new Error("Method not implemented.");
    }
    
}