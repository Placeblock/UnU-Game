import { WebSocketManager } from "./game/player/websocket/WebSocketManager";

export class UnUServer {
   websocketManager: WebSocketManager;

   constructor() {
      console.log("uno");
      this.websocketManager = new WebSocketManager(this);
   }
}