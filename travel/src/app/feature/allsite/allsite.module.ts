import { NgModule } from '@angular/core';

import { AllSiteComponent } from './allsite.component';
import { CommonModule } from '@angular/common';
import { AllSiteRoutingModule } from './all.site-routing.module'
import { ShareModule } from '../../share/share.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AllSiteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AllSiteRoutingModule,
    ShareModule,
    Ng2SearchPipeModule
  ],
  exports: [

  ],
})
export class AllSiteModule { }
