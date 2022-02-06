import { Component, ContentChild, HostBinding, Input, TemplateRef } from '@angular/core';
import { InvertUnUCard } from 'src/app/models/card/special/invert-un-ucard.model';
import { WishUnUCard } from 'src/app/models/card/special/wish-un-ucard.model';
import { SuspendUnUCard } from 'src/app/models/card/special/suspend-un-ucard.model';
import { Draw4UnUCard } from 'src/app/models/card/special/draw4-un-ucard.model';
import { Draw2UnUCard } from 'src/app/models/card/special/draw2-un-ucard.model';
import { NumberUnUCard } from 'src/app/models/card/number/number-un-ucard.model';
import { UnUCard } from 'src/app/models/card/un-ucard.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faQuestion, faRetweet, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-unocard',
  templateUrl: './unocard.component.html',
  styleUrls: ['./unocard.component.scss'],
  animations: [
    trigger('flip', [
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      state('front', style({
        transform: 'rotateY(0deg)'
      })),
      transition('back <=> front', [
        animate(500)
      ])
    ])
  ]
})
export class UnocardComponent {
  InvertUnUCard = InvertUnUCard;
  WishUnUCard = WishUnUCard;
  Draw4UnUCard = Draw4UnUCard;
  Draw2UnUCard = Draw2UnUCard;
  NumberUnUCard = NumberUnUCard;
  SuspendUnUCard = SuspendUnUCard;

  faTimes = faTimes
  faInvert = faRetweet
  faWish = faQuestion;
  
  @ContentChild(TemplateRef) public contentTemplateRef!: TemplateRef<any>;
  
  @HostBinding('style.background-color') 
  public get getBackgroundColor() {
    if("color" in this.unucard) {
      return (this.unucard as any).getColor().colorcode;
    }else {
      return "black"
    }
  }
  @HostBinding('style.color') @Input() color = "white";
  @HostBinding('style.border-color')
  public get getBorderColor() {
    if(this.unucard instanceof WishUnUCard || this.unucard instanceof Draw4UnUCard) {
      return this.unucard.getChosenColor().colorcode;
    }
    return "white";
  }
  @Input() unucard!: UnUCard;

  
  @HostBinding('@flip') @Input() side: string = 'front';

  flipCard() {
    this.side = "back";
  }

  ngOnInit() {

  }

}
