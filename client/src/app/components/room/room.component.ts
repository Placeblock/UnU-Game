import { Component } from '@angular/core';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faCogs, faMedal, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { RoomFacade } from 'src/app/facades/room-facade';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  players$: Observable<Player[]>;
  owner$: Observable<Player | null>;
  me$: Observable<Player | null>;

  faEthereum = faEthereum;
  faMedal = faMedal;
  faSignOut = faSignOutAlt;
  faUser = faUser;
  faCogs = faCogs;

  constructor(private roomFacadce: RoomFacade) {
    this.players$ = roomFacadce.getPlayers();
    this.owner$ = roomFacadce.getOwner();
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
