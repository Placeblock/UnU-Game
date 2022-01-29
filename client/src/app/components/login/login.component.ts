import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Color } from 'src/app/models/color';
import { NumberUnoCard } from 'src/app/models/number-uno-card';
import { SpecialUnoCard } from 'src/app/models/special-uno-card';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { WebsocketService } from 'src/app/services/websocket.service';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/app/models/player';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  faHeart = faHeart
  name = new FormControl('');
  unocard1 = new SpecialUnoCard(1, Color.SPECIAL, "add4");
  unocard2 = new SpecialUnoCard(2, Color.BLUE, "add2");
  unocard3 = new NumberUnoCard(3, Color.RED, 5);

  constructor(public router: Router, public websocketService: WebsocketService, public gameService: GameService, public authService: AuthService) {

  }

  getRotation(index: number): number {
    const betweencardsangle = 20;
    const absoluteindexangle = (index+0.5)*betweencardsangle;
    return (absoluteindexangle - 50)
  }

  login() {
    this.websocketService.sendMessage("setName", {"name": this.name.value});
    if(this.gameService.player != undefined) {
      this.gameService.player.setName(this.name.value);
    }
    this.continue();
  }

  continue() {
    if (this.authService.gameid != "") {
      this.websocketService.sendMessage('joinRoom', this.authService.gameid);
      return;
    }else {
      this.websocketService.sendMessage('createRoom', {});
    }
  }
}
