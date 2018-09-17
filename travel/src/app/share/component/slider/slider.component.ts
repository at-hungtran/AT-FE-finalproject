import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})

export class SliderComponent implements OnInit, OnChanges {
  @Input() listImg;
  url = 'http://localhost:3000/uploads/';
  listImgAfterFetch = [];

  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 0,
    slidesPerView: 1,
};

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['listImg']) {
      this.fetchUrl();
    }
  }

  fetchUrl() {
    if (this.listImg) {
      return this.listImgAfterFetch = this.listImg.map(item => {
        return {
          name: item.name,
          backgroundImg: this.url + item.backgroundImg
        };
      });
    }
    return [];
  }
}
