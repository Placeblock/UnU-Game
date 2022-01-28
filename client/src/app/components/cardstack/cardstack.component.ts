import { Component } from '@angular/core';
import { CardstackService } from 'src/app/services/cardstack.service';

@Component({
  selector: 'app-cardstack',
  templateUrl: './cardstack.component.html',
  styleUrls: ['./cardstack.component.scss']
})
export class CardstackComponent {

  constructor(public cardStackService: CardstackService) { }

}
