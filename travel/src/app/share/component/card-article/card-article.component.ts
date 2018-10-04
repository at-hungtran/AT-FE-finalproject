import { Component, OnChanges, Input } from '@angular/core';
import { Article } from '../../model/article';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './card-article.component.html'
})

export class ArticleComponent implements OnChanges {
  @Input() article: Article;
  imgafetchUrl;

  ngOnChanges() {
    this.fetchUrl();
  }

  fetchUrl() {
    this.imgafetchUrl = environment.img_url + this.article.listPictures[0].name;
  }
}
