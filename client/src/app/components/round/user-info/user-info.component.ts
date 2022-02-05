import { AfterViewChecked, Component, Input} from '@angular/core';
import { Player } from 'src/app/models/player';
import { RoundState } from 'src/app/states/round-state.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements AfterViewChecked {
  @Input() player!: Player;

  constructor(public roundState: RoundState) {}

  ngAfterViewChecked() {
  }

}
