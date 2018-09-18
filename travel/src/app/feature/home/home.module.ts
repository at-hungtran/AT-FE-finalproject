import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SearchComponent } from './search-form/search.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../../share/share.module';


@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    ShareModule,
    HttpClientModule
  ],
  exports: [
    SearchComponent
  ],
})
export class HomeModule { }
