import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Color } from 'src/app/models/card/color.model';
import { NumberUnUCard } from 'src/app/models/card/number/number-un-ucard.model';
import { Draw2UnUCard } from 'src/app/models/card/special/draw2-un-ucard.model';
import { Draw4UnUCard } from 'src/app/models/card/special/draw4-un-ucard.model';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { WebsocketService } from 'src/app/services/websocket.service';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/app/models/player.model';
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
  unucard1 = new Draw4UnUCard();
  unucard2 = new Draw2UnUCard(Color.BLUE);
  unucard3 = new NumberUnUCard(3, Color.RED);

  constructor(public router: Router, public websocketService: WebsocketService, public gameService: GameService, public authService: AuthService) {

  }

  getRotation(index: number): number {
    const betweencardsangle = 20;
    const absoluteindexangle = (index+0.5)*betweencardsangle;
    return (absoluteindexangle - 50)
  }

  login() {
    this.websocketService.sendMessage("setName", {"name": this.name.value});
    if(this.gameService.getPlayer() != undefined) {
      this.gameService.getPlayer()["name"] = this.name.value;
    }
    this.continue();
  }

  continue() {
    if (this.authService.gameid != "") {
      this.websocketService.sendMessage('joinRoom', {"uuid":this.authService.gameid});
      return;
    }else {
      this.websocketService.sendMessage('createRoom', {});
    }
  }
}
