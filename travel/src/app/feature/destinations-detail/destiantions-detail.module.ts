import { NgModule } from '@angular/core';
import { DestinationsDetailComponent } from './destinations-detail.component';
import { CommonModule } from '@angular/common';
import { DestinationsDetailRoutingModule } from './destinations-detail-routing.module';
import { ShareModule } from '../../share/share.module';

@NgModule({
  declarations: [
    DestinationsDetailComponent
  ],
  imports: [
    CommonModule,
    DestinationsDetailRoutingModule,
    ShareModule
  ]
})

export class DestinationsDetailModule {}
