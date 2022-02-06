import { state, style, trigger } from '@angular/animations';
import { Component, HostBinding, OnDestroy } from '@angular/core';
import { RoundState } from 'src/app/states/round-state.service';

@Component({
  selector: 'app-next-timer',
  templateUrl: './next-timer.component.html',
  styleUrls: ['./next-timer.component.scss']
})
export class NextTimerComponent implements OnDestroy {
  @HostBinding('style.width')
  get width() {
    return this.nextTimerWidth + "%";
  }

  nextTimerWidth = 0;
  nextTimerInterval = setInterval(() => {
    //console.log(Date.now() - this.roundState.nextTimer);
    this.nextTimerWidth = (30000 - (Date.now() - this.roundState.nextTimer)) / 30000 * 100;
  }, 100);

  constructor(private roundState: RoundState) { }

  ngOnDestroy(): void {
    clearInterval(this.nextTimerInterval);
  }

}
