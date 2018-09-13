import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search-form/search.component';


@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SearchComponent
  ],
})
export class HomeModule { }
