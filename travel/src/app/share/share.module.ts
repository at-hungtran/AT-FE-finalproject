import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SliderModule } from 'ngx-slider';

import { HeaderComponent } from './component/header/header.component';
import { CardComponent } from './component/card-destination/card-destination.component';
import { FooterComponent } from './component/footer/footer.component';
import { ArticleComponent } from './component/card-article/card-article.component';
import { CardSiteComponent } from './component/card-site/card-site.component';
import { SliderComponent } from './component/slider/slider.component';
import { SwiperModule } from 'angular2-useful-swiper';
import { DetailComponent } from './component/card-detail/card-detail.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ArticleComponent,
    CardComponent,
    FooterComponent,
    CardSiteComponent,
    SliderComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SliderModule,
    SwiperModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ArticleComponent,
    CardComponent,
    FooterComponent,
    CardSiteComponent,
    SliderComponent,
    DetailComponent,
  ]
})

export class ShareModule {}
