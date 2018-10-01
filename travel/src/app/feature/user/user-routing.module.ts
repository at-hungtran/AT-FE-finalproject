import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { PlanComponent } from './plan/plan.component';
import { PictureUserComponent } from './picture-user/picture-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'plans' },
      { path: 'plans', component: PlanComponent },
      { path: 'pictures', component: PictureUserComponent },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class UserRoutingModule {}
