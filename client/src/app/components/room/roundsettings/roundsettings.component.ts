import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-createround',
  templateUrl: './roundsettings.component.html',
  styleUrls: ['./roundsettings.component.scss']
})
export class RoundSettingsComponent {
  fouronfour = new FormControl(true);
  twoonfour = new FormControl(false);
  fourontwo = new FormControl(false);
  wishonfour = new FormControl(true);
  fouronwish = new FormControl(true);
  wishonwish = new FormControl(false);
  startcards = new FormControl(7);

  constructor(public gameService: GameService) {
    //TODO: REMOVE FORM CONTROLS AND SYNC WITH SETTINGS IN SERVICE
  }

  update() {
    this.gameService.setRoundSettings({
      "startcardamount":this.startcards.value,
      "allowwishonwish":this.wishonwish.value,
      "allowwishondraw4":this.wishonfour.value,
      "allowdraw4onwish":this.fouronwish.value,
      "allowdraw4ondraw4":this.fouronfour.value,
      "allowdraw4ondraw2":this.fourontwo.value,
      "allowdraw2ondraw4":this.twoonfour.value
    });
  }
}
