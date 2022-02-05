import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { RoomState } from 'src/app/states/room-state.service';
import { RoundState } from 'src/app/states/round-state.service';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent {
  players$: Observable<Player[]>;
  me$: Observable<Player | null>;

  constructor(private roundState: RoundState, private roomState: RoomState) {
    this.players$ = this.roundState.players$;
    this.me$ = this.roomState.me$;
  }

}
