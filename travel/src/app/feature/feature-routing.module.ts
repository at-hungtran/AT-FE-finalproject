import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { AuthGuard } from '../auth-guard/auth-guard';

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
        loadChildren: './allsite/allsite.module#AllSiteModule'
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
        path: 'article/:id',
        loadChildren: './article/article.module#ArticlePageModule'
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule'
      },
      {
        path: 'forgot',
        loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule'
      },
      {
        path: 'reset/:token',
        loadChildren: './reset-password/reset-password.module#ResetPasswordModule'
      },
      {
        path: 'destinations',
        loadChildren: './alldestination/alldes.module#AllDesModule'
      },
      {
        path: 'destinations/:id',
        loadChildren: './destinations-detail/destiantions-detail.module#DestinationsDetailModule'
      },
      {
        path: 'user/:id',
        loadChildren: './user/user.module#UserModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})

export class FeatureRoutingModule {}
