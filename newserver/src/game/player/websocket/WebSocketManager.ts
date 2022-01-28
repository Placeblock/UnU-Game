import { WebSocket, WebSocketServer } from 'ws';
import { createServer, Server } from "https";
import { readFileSync } from 'fs';
import { UnUServer } from '../../../UnuServer';
import { WebSocketPlayer } from './WebSocketPlayer';


export class WebSocketManager {
    private readonly httpserver: Server;
    private readonly wss: WebSocketServer;
    private readonly unuServer: UnUServer;

    constructor(unuServer: UnUServer) {
        this.unuServer = unuServer;
        this.httpserver = createServer({
            cert: readFileSync('/etc/letsencrypt/live/placeblock.undo.it/privkey.pem'),
            key: readFileSync('/etc/letsencrypt/live/placeblock.undo.it/cert.pem')
        });
        this.wss = new WebSocketServer({"server":this.httpserver});

        this.wss.on("connection", (ws: WebSocket) => {
            var player = new WebSocketPlayer(ws);
            ws["player"] = player;
        });
    }
    
}