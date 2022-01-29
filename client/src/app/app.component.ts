import { Component } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor() {
  }
}
