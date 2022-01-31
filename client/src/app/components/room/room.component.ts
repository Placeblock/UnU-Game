import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faCogs, faMedal, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  isShowingSettings = false;

  toggleShowingSettings() {
    this.isShowingSettings = !this.isShowingSettings;
  }

  faEthereum = faEthereum;
  faMedal = faMedal;
  faSignOut = faSignOutAlt;
  faUser = faUser;
  faCogs = faCogs;

  constructor(public gameService: GameService) { }

  getPlayerCount(): number {
    const length = this.gameService.getCurrentRoom()?.getPlayers()?.length;
    if(length != undefined) {
      return length;
    }else {
      return 0;
    }
  }

  particlesOptions = {
    "background": {
      "color": {
        "value": "transparent"
      }
    },
    "duration": 0,
    "interactivity": {
      "detectsOn": "window"as const,
      "events": {
        "onHover": {
          "enable": true,
          "mode": "bubble",
          "parallax": {
            "enable": true,
            "force": 100,
            "smooth": 10
          }
        },
        "resize": true
      }
    },
    "particles": {
      "color": {
        "value": "#3838ff"
      },
      "move": {
        "angle": {
          "offset": 10,
          "value": 0
        },
        "direction": "top" as const,
        "enable": true,
        "random": true,
        "speed": 0.8
      },
      "reduceDuplicates": false,
      "size": {
        "value": {
          "min": 1,
          "max": 4
        }
      }
    },
    "zLayers": 100
  }

}
