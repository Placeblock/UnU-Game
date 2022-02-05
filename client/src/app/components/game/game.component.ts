import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomState } from 'src/app/states/room-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  roundRunning$: Observable<boolean>;

  constructor(private roomState: RoomState) {
    this.roundRunning$ = roomState.isRoundRunning();
  }

}
