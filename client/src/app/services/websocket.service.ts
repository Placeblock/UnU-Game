import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, switchAll, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socket$: WebSocketSubject<{[action: string] : any;}> = webSocket(WS_ENDPOINT);

  sendMessage(action: string,data: any) {
    this.socket$?.next({"action":action,'data':data});
  }
}
