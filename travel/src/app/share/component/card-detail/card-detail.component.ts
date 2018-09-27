import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Article } from '../../model/article';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html'
})

export class DetailComponent implements OnInit, OnChanges {
  @Input() article: Article;
  articleHTML;
  ngOnInit() {
  }

  ngOnChanges() {
    this.articleHTML = this.article.content;
  }
}
