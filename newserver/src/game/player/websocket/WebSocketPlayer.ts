import { WebSocket } from "ws";
import { OutPacket } from "../../network/packets/out/OutPacket";
import { OutInvalidMessagePacket } from "../../network/packets/out/OutInvalidMessagePacket";
import { Player } from "../Player";
import { OutPlayerDataPacket } from "../../network/packets/out/OutPlayerDataPacket";

export class WebSocketPlayer extends Player {
    private ws: WebSocket;
    private isAlive: boolean = true;
    private pingtimer: NodeJS.Timer;

    constructor(ws: WebSocket) {
        super();
        this.ws = ws;

        this.send(new OutPlayerDataPacket(this));

        this.pingtimer = setInterval(() => {
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
                this.send(new OutInvalidMessagePacket("Provide Action and Data!", json));
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
        this.ws.send(JSON.stringify(packet.asJSON()));
    }

    public close() {
        console.log("WS Player Disconnected");
        this.clearUpPlayer();
        this.ws.removeAllListeners();
        clearInterval(this.pingtimer);
        this.pingtimer = undefined;
        this.ws = undefined;
    }
    
}