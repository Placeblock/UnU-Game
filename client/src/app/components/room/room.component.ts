import { Component } from '@angular/core';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faCogs, faMedal, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RoomState } from 'src/app/states/room-state.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {

  faEthereum = faEthereum;
  faMedal = faMedal;
  faSignOut = faSignOutAlt;
  faUser = faUser;
  faCogs = faCogs;

  constructor(public roomState: RoomState, public webSocketService: WebsocketService) {}


  toggleShowSettings() {
    this.roomState.isShowingSettings = !this.roomState.isShowingSettings;
  }

  quitRoom() {
    this.webSocketService.sendMessage("quitRoom", {});
    //TODO: RECEIVE QUIT MESSAGE FROM SERVER AND ROUTE TO LOGIN AND REMOVE ROOM DATA
  }

  startRound() {
    this.webSocketService.sendMessage("startRound", {});
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
