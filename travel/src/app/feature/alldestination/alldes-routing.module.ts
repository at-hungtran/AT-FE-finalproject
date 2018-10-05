import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllDesComponent } from './alldes.component';

const routes: Routes = [
  {
    path: '',
    component: AllDesComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class AllDesRoutingModule {}
