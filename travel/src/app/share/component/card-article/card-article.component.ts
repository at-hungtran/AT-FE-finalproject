import { Component, OnChanges, Input } from '@angular/core';
import { Article } from '../../model/article';

@Component({
  selector: 'app-article',
  templateUrl: './card-article.component.html'
})

export class ArticleComponent implements OnChanges {
  @Input() article: Article;
  imgafetchUrl;
  url = 'http://localhost:3000/uploads/';

  ngOnChanges() {
    this.fetchUrl();
  }

  fetchUrl() {
    this.imgafetchUrl = this.url + this.article.listPictures[0].name;
  }
}
