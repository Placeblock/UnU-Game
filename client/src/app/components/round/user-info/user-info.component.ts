import { Component, Input} from '@angular/core';
import { Player } from 'src/app/models/player';
import { RoomState } from 'src/app/states/room-state.service';
import { RoundState } from 'src/app/states/round-state.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  @Input() player!: Player;

  constructor(public roundState: RoundState, public roomState: RoomState) {}

}
