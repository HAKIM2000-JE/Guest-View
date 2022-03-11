import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appToogleBtn]'
})
export class ToogleBtnDirective  {
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }
  open() {
    if (this.el.nativeElement.classList.contains('open')) {
      this.renderer.removeClass(this.el.nativeElement, 'open');
    } else {
      console.log('element2',this.el.nativeElement)
      this.renderer.addClass(this.el.nativeElement, 'open');
    }
  }
  @HostListener('click') onClick() {
    this.open();
  }
}
