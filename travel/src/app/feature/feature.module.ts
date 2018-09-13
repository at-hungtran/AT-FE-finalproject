import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { HomeModule } from './home/home.module';
import { SiteModule } from './site/site.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    FeatureComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeModule,
    SiteModule,
    FeatureRoutingModule,
    ShareModule
  ],
  exports: [
    HomeModule
  ]
})

export class FeatureModule {}
