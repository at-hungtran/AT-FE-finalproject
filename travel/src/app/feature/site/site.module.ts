import { NgModule } from '@angular/core';
import { SiteComponent } from './site.component';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { ShareModule } from '../../share/share.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SiteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SiteRoutingModule,
    ShareModule
  ],
  exports: [
  ],
})
export class SiteModule { }
