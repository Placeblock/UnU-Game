import { Component, ContentChild, HostBinding, Input, TemplateRef } from '@angular/core';
import { NumberUnoCard } from 'src/app/models/number-uno-card';
import { SpecialUnoCard } from 'src/app/models/special-uno-card';
import { UnoCard } from 'src/app/models/uno-card';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  SpecialUnoCard = SpecialUnoCard;
  NumberUnoCard = NumberUnoCard;
  
  @ContentChild(TemplateRef) public contentTemplateRef!: TemplateRef<any>;
  
  @HostBinding('style.background-color') 
  public get getBackgroundColor() {
    return this.unocard.color;
  }
  @HostBinding('style.color') @Input() color = "white";
  @Input() unocard: UnoCard = new UnoCard("purple", -10);

  
  @HostBinding('@flip') @Input() side: string = 'front';

  flipCard() {
    this.side = "back";
  }

}
