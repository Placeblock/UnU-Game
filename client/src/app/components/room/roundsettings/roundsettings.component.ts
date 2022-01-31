import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

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
}
