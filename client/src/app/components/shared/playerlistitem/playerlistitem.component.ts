import { Component, Input } from '@angular/core';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faMedal, faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-playerlistitem',
  templateUrl: './playerlistitem.component.html',
  styleUrls: ['./playerlistitem.component.scss']
})
export class PlayerlistitemComponent{
  @Input() name!: string;
  @Input('owner') isOwner!: boolean;
  @Input('me') isMe!: boolean;
  @Input() ranking!: number;


  faEthereum = faEthereum;
  faUser = faUser;
  faMedal = faMedal
}
