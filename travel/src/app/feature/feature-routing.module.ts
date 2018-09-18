import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';

const routes: Routes = [
  { path: '',
    component: FeatureComponent,
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule',
      },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule',
      },
      {
        path: 'site',
        loadChildren: './site/site.module#SiteModule'
      },
      {
        path: 'search',
        loadChildren: './search/search.module#PageSearchModule'
      },
      {
        path: 'articles',
        loadChildren: './article/article.module#ArticlePageModule'
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: []
})

export class FeatureRoutingModule {}
