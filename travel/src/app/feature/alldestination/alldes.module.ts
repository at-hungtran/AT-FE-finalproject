import { NgModule } from '@angular/core';

import { AllDesComponent } from './alldes.component';
import { CommonModule } from '@angular/common';
import { AllDesRoutingModule } from './alldes-routing.module'
import { ShareModule } from '../../share/share.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AllDesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AllDesRoutingModule,
    ShareModule,
    Ng2SearchPipeModule
  ],
  exports: [

  ],
})
export class AllDesModule { }
