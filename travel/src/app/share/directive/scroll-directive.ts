import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})

export class ScrollDirective {
  lastScrollTop = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  scrolling() {
    const iCurScrollPos  = window.pageYOffset;
    const headerHeight = this.el.nativeElement.clientHeight;
    if (iCurScrollPos > this.lastScrollTop) {
      this.renderer.addClass(this.el.nativeElement, 'hide-nav');
      this.renderer.removeClass(this.el.nativeElement, 'show-nav');
    } else if (iCurScrollPos < this.lastScrollTop) {
      this.renderer.addClass(this.el.nativeElement, 'show-nav');
      this.renderer.removeClass(this.el.nativeElement, 'hide-nav');
    }
    this.lastScrollTop = iCurScrollPos;
  }
}
