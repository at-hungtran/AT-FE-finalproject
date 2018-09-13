import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSearchComponent } from './search.component';
import { PageSearchModuleRouting } from './search-routing.module';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../../share/share.module';


@NgModule({
  declarations: [
    PageSearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShareModule,
    PageSearchModuleRouting
  ],
  exports: [
    PageSearchComponent
  ],
})
export class PageSearchModule { }
