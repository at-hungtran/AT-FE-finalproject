import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShareModule } from '../../share/share.module';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { PlanComponent } from './plan/plan.component';
import { PictureUserComponent } from './picture-user/picture-user.component';
import { TabComponent } from './plan/tab/tab.component';
import { TabsComponent } from './plan/tabs/tabs.component';

@NgModule({
  declarations: [
    UserComponent,
    PlanComponent,
    PictureUserComponent,
    TabComponent,
    TabsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShareModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
})

export class UserModule {}
