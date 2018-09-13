import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
   FeatureComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeModule
  ],
  exports: [
    HomeModule
  ]
})

export class FeatureModule {}
