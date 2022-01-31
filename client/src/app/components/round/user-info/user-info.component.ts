import { Component, Input} from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { UnUCard } from 'src/app/models/card/un-ucard.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  @Input() player: Player = new Player("undefined", "undefined");

  constructor(public gameService: GameService) { }

  getRotation(index: number): number {
    if(this.player == undefined) return 0;
    const cardscount = this.gameService.getCurrentRoom()?.getCurrentRound()?.getInventory(this.player)?.getCards().length;
    if(cardscount == undefined) return 0;
    const betweencardsangle = 60/cardscount;
    const absoluteindexangle = (index+0.5)*betweencardsangle;
    return (absoluteindexangle - 30)
  }
}
