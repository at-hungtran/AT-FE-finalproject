import { NgModule } from '@angular/core';
import { ArticlePageComponent } from './article.component';
import { CommonModule } from '@angular/common';
import { ArticlePageRoutingModule } from './article-routing.module';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../../share/share.module';

@NgModule({
  declarations: [
    ArticlePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ArticlePageRoutingModule,
    ShareModule
  ],
  exports: [
    ArticlePageComponent
  ],
})
export class ArticlePageModule { }
