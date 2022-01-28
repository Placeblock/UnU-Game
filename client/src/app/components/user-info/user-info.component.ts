import { Component, Input} from '@angular/core';
import { UnoCard } from 'src/app/models/uno-card';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  @Input() playerid: string = "";

  constructor(public gameService: GameService) { }

  getRotation(index: number): number {
    const cardscount = this.gameService.getPlayerById(this.playerid).getCards().length;
    const betweencardsangle = 60/cardscount;
    const absoluteindexangle = (index+0.5)*betweencardsangle;
    return (absoluteindexangle - 30)
  }
}
