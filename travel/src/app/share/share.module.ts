import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './component/header/header.component';
import { CardComponent } from './component/card-destination/card-destination.component';
import { FooterComponent } from './component/footer/footer.component';
import { ArticleComponent } from './component/card-article/card-article.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ArticleComponent,
    CardComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ArticleComponent,
    CardComponent,
    FooterComponent
  ]
})

export class ShareModule {}
