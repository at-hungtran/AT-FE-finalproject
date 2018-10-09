import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllSiteComponent } from './allsite.component';

const routes: Routes = [
  {
    path: '',
    component: AllSiteComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class AllSiteRoutingModule {}
