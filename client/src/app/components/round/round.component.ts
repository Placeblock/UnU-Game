import { Component } from '@angular/core';
import { Color } from 'src/app/models/card/color.model';
import { NumberUnUCard } from 'src/app/models/card/number/number-un-ucard.model';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RoomState } from 'src/app/states/room-state.service';
import { RoundState } from 'src/app/states/round-state.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent {
  stackCard = new NumberUnUCard("", 0, Color.RED);

  Color = Color;

  constructor(public roundState: RoundState, public roomState: RoomState, private websocketService: WebsocketService) {}

  getRandom(): number {
    return Math.random()*30-15
  }

  drawCard() {
    console.log("drawcard");
    this.websocketService.sendMessage("drawCard", {});
  }

  forceColorSelect(color: Color) {
    this.websocketService.sendMessage("wishColor", {"color":color.variable});
    this.roundState.showforcecolor = false;
  }
}
