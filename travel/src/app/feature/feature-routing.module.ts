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
        path: 'site/:id',
        loadChildren: './site/site.module#SiteModule'
      },
      {
        path: 'search',
        loadChildren: './search/search.module#PageSearchModule'
      },
      {
        path: 'article',
        loadChildren: './article/article.module#ArticlePageModule'
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
