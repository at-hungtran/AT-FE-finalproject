import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { CloseSearchService } from '../service/close-search.service';

@Directive({
  selector: '[clickClose]'
})

export class CloseSearchDirestive {
  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private closeSearchService: CloseSearchService) {}

  @HostListener('click', ['$event'])
  onclick(event) {
    let className = event.target.className.split(' ')[0];
    if (className !== 'result-item'
        && className !== 'input'
        && className !== 'wrap-input') {
      this.closeSearchService.closeWrapSearch(false);
    }
  }
}
