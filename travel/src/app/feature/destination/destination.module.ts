import { NgModule } from '@angular/core';
import { DestinationPageComponent } from './destination.component';
import { CommonModule } from '@angular/common';
import { DestinationPageRoutingModule } from './destination-routing.module';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../../share/share.module';

@NgModule({
  declarations: [
    DestinationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DestinationPageRoutingModule,
    ShareModule
  ],
  exports: [
    DestinationPageComponent
  ],
})
export class DestinationPageModule { }
