import { Component } from '@angular/core';
import { RoomState } from 'src/app/states/room-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  constructor(public roomState: RoomState) {}
}
