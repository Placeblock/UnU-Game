import { WebSocket } from "ws";
import { OutPacket } from "../../network/packets/out/OutPacket";
import { OutInvalidMessagePacket } from "../../network/packets/out/OutInvalidMessage";
import { Player } from "../Player";

export class WebSocketPlayer extends Player {
    private readonly ws: WebSocket;
    private isAlive: boolean = true;

    constructor(ws: WebSocket) {
        super();
        this.ws = ws;

        setInterval(() => {
            if (this.isAlive === false) {
                close();
                return;
            }
            this.isAlive = false;
            this.ws.ping();
        }, 15000);

        ws.on("message", data => {
            var json = JSON.parse(data.toString());
            if (!("action" in json) || !("data" in json)) {
                this.send(new OutInvalidMessagePacket("Provide Action and Data!"));
                return;
            }
            this.receive(json["action"],json["data"]);
        })
        
        ws.on('pong', () => {this.isAlive = true;});

        ws.on("close", data => {
            this.close();
        })
    }

    public send(packet: OutPacket) {
        this.ws.send(packet.asJSON());
    }

    public close() {
        throw new Error("Method not implemented.");
    }
    
}