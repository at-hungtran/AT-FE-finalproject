import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SliderModule } from 'ngx-slider';
import { TruncateModule } from 'ng2-truncate';

import { HeaderComponent } from './component/header/header.component';
import { CardComponent } from './component/card-destination/card-destination.component';
import { FooterComponent } from './component/footer/footer.component';
import { ArticleComponent } from './component/card-article/card-article.component';
import { CardSiteComponent } from './component/card-site/card-site.component';
import { SliderComponent } from './component/slider/slider.component';
import { SwiperModule } from 'angular2-useful-swiper';
import { DetailComponent } from './component/card-detail/card-detail.component';
import { BackgroundHeaderComponent } from './component/background-header/background-header.component';
import { CommentComponent } from './component/comment/comment.component';
import { ScrollDirective } from './directive/scroll-directive';
import { NavigateComponent } from './component/header/navigate/navigate.component';
import { NotifiComponent } from './component/notifi/notifi.component';
import { CloseSearchDirestive } from './directive/click-close-search-directive';
import { TimeLine } from './component/timeline/timeline.component';
import { DiaLogService } from './component/dislog/dialog.component';

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
    BackgroundHeaderComponent,
    CommentComponent,
    NotifiComponent,
    ScrollDirective,
    NavigateComponent,
    CloseSearchDirestive,
    TimeLine,
    DiaLogService
  ],
  imports: [
    CommonModule,
    RouterModule,
    SliderModule,
    SwiperModule,
    TruncateModule,
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
    BackgroundHeaderComponent,
    CommentComponent,
    ScrollDirective,
    CloseSearchDirestive,
    NavigateComponent,
    NotifiComponent,
    TimeLine,
    DiaLogService
  ]
})

export class ShareModule {}
