import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotfoundComponent } from './share/component/notfound/notfound.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: './feature/feature.module#FeatureModule',
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}) ],
  exports: [ RouterModule ],
})

export class AppRoutingModule {}
