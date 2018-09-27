import { NgModule } from '@angular/core';
import { DestinationsDetailComponent } from './destinations-detail.component';
import { CommonModule } from '@angular/common';
import { DestinationsDetailRoutingModule } from './destinations-detail-routing.module';

@NgModule({
  declarations: [
    DestinationsDetailComponent
  ],
  imports: [
    CommonModule,
    DestinationsDetailRoutingModule
  ]
})

export class DestinationsDetailModule {}
