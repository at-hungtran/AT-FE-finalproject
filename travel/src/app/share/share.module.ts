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
import { DiaLogComponent } from './component/dialog/dialog.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { DiaLogEditPlanComponent } from './component/dialog-edit-plan/dialog-edit-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DiaLogChoiceComponent } from './component/dialog-choice-date/dialog-choice-plan.component';

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
    DiaLogComponent,
    NotfoundComponent,
    DiaLogEditPlanComponent,
    DiaLogChoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SliderModule,
    SwiperModule,
    TruncateModule,
    FormsModule,
    ReactiveFormsModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    Ng2SearchPipeModule
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
    DiaLogComponent,
    NotfoundComponent,
    DiaLogEditPlanComponent,
    DiaLogChoiceComponent
  ]
})

export class ShareModule {}
