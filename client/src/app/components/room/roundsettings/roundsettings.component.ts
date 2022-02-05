import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-roundsettings',
  templateUrl: './roundsettings.component.html',
  styleUrls: ['./roundsettings.component.scss']
})
export class RoundSettingsComponent {
  fouronfour = new FormControl(true);
  twoonfour = new FormControl(false);
  fourontwo = new FormControl(true);
  wishonfour = new FormControl(true);
  fouronwish = new FormControl(true);
  wishonwish = new FormControl(true);
  startcards = new FormControl(7);

  constructor(private webSocketService: WebsocketService) {}

  update() {
    this.webSocketService.sendMessage("roundSettings", {"settings":{
      "startcardamount":this.startcards.value,
      "allowwishonwish":this.wishonwish.value,
      "allowwishondraw4":this.wishonfour.value,
      "allowdraw4onwish":this.fouronwish.value,
      "allowdraw4ondraw4":this.fouronfour.value,
      "allowdraw4ondraw2":this.fourontwo.value,
      "allowdraw2ondraw4":this.twoonfour.value
    }});
  }
}
