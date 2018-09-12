import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './component/header/header.component';
import { CardComponent } from './component/card-destination/card-destination.component';
import { FooterComponent } from './component/footer/footer.component';
import { CardSiteComponent } from './component/card-site/card-site.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    FooterComponent,
    CardSiteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    CardComponent,
    FooterComponent,
    CardSiteComponent,
  ]
})

export class ShareModule {}
