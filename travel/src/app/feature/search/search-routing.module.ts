import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageSearchComponent } from './search.component';

const routes: Routes = [
  {
    path: '',
    component: PageSearchComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PageSearchModuleRouting {}
