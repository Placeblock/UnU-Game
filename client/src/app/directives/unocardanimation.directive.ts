import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appUnocardanimation]'
})
export class UnocardanimationDirective {
  @Input() newscale = 1;
  @Input() newrotation = 0;
  @Input() newx = 0;
  @Input() newy = 0;

  constructor(private el: ElementRef) {
    const oldx = el.nativeElement.style.getBoundingClientRect().left;
    const oldy = el.nativeElement.style.getBoundingClientRect().top;
    el.nativeElement.style.transform = "translateX("+(this.newx - oldx)+"px) translateY("+(this.newy - oldy)+"px) scale("+this.newscale+") rotate("+this.newrotation+"deg)";
  }

}
