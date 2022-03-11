import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appToogleBtnSwitch]'
})
export class ToogleBtnSwitchDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  open() {
    if (!this.el.nativeElement.classList.contains('open')) {
      this.renderer.addClass(this.el.nativeElement, 'open');
    }
  }

  @HostListener('click', ['$event']) onClick($event) {
    if (this.el.nativeElement && this.el.nativeElement.parentElement && this.el.nativeElement.parentElement.children) {
      for (const item of this.el.nativeElement.parentElement.children) {

        if (this.el.nativeElement !== item) {
          item.classList.remove('open');
        }

      }
      this.open();
    }


  }

}
