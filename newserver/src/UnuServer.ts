import { WebSocketManager } from "./game/player/websocket/WebSocketManager";

export class UnUServer {
   websocketManager: WebSocketManager;

   constructor() {
      this.websocketManager = new WebSocketManager(this);
   }
}