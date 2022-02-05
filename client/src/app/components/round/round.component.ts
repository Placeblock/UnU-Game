import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UnUCard } from 'src/app/models/card/un-ucard.model';
import { RoundState } from 'src/app/states/round-state.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent {
  currentcard$: Observable<UnUCard>;

  constructor(roundState: RoundState) {
    this.currentcard$ = roundState.getCurrentCard();
  }

  getRandom(): number {
    return Math.random()*30-15
  }
}
