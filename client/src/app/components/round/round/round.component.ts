import { Component } from '@angular/core';
import { Color } from 'src/app/models/card/color.model';
import { NumberUnUCard } from 'src/app/models/card/number/number-un-ucard.model';
import { UnUCard } from 'src/app/models/card/un-ucard.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent {

  constructor(public gameService: GameService) {

  }

  getRandom(): number {
    return Math.random()*30-15
  }

  getCurrentCard(): UnUCard {
    var currentcard = this.gameService.getCurrentRoom()?.getCurrentRound()?.getCurrentCard();
    if(currentcard == undefined) {
      return new NumberUnUCard(-1, Color.BLUE)
    }
    return currentcard;
  }
}
