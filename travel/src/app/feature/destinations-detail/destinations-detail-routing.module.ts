import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationsDetailComponent } from './destinations-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DestinationsDetailComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class DestinationsDetailRoutingModule {}
