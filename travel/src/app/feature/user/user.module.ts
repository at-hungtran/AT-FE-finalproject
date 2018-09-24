import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ShareModule } from '../../share/share.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    ShareModule
  ],
  exports: [
  ],
})
export class UserModule { }
