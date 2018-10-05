import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../share/service/api.service';
import { Article } from '../../share/model/article';
import { END_POINT } from '../../share/service/api.registry';

@Component({
  selector: 'app-article-page',
  templateUrl: './article.component.html'
})

export class ArticlePageComponent implements OnInit {
  articleId;
  article: Article;
  backgroundHeader;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: APIService) {}

  ngOnInit() {
    this.articleId = this.route.snapshot.params['id'];
    this.setArticle();
    this.setTobackgroundHeader();
  }

  setTobackgroundHeader() {
    this.backgroundHeader = {
      backgroundImg: '',
      name: ''
    };
  }

  setArticle() {
    this.apiService.get([END_POINT.articles], this.articleId).subscribe(item => {
      this.article = item;
      console.log(item);
    });
    
  }
}
