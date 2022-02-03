import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss']
})
export class PlayerlistComponent {

  @Input() players!: Player[];
  @Input() owner: Player | undefined = undefined;
  @Input() me: Player | undefined = undefined;
  
}
