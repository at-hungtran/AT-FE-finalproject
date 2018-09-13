import { NgModule } from '@angular/core';
import { SiteComponent } from './site.component';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { ShareModule } from '../../share/share.module';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './title-site/title-site.component';

@NgModule({
  declarations: [
    SiteComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SiteRoutingModule,
    ShareModule
  ],
  exports: [
    TitleComponent,
  ],
})
export class SiteModule { }
