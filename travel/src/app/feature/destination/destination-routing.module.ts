import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DestinationPageComponent } from './destination.component';

const routes: Routes = [
  {
    path: '',
    component: DestinationPageComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class DestinationPageRoutingModule {}
