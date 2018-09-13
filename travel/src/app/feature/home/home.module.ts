import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
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
    ShareModule
  ],
  exports: [
    SearchComponent
  ],
})
export class HomeModule { }
