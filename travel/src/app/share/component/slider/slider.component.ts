import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges  } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})

export class SliderComponent implements OnInit, OnChanges {
  @Input() listImg;

  listImgAfterFetch = [];

  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 0,
    slidesPerView: 1,
    parallax: true,
    autoplay: 2500,
    speed: 800,
    autoplayDisableOnInteraction: false,
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
          backgroundImg: environment.img_url + item.backgroundImg
        };
      });
    }
    return [];
  }
}
