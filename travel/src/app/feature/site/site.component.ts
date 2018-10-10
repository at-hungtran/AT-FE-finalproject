import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

import { APIService } from '../../share/service/api.service';
import { END_POINT } from '../../share/service/api.registry';
import { Site } from '../../share/model/site';
import { Article } from '../../share/model/article';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html'
})

export class SiteComponent implements OnInit {
  site: Site;
  siteId: String;
  listArticle;
  listBackground;
  listDestinations;
  listSiteHaveParent;
  listSite;
  listDestinationsChil;
  isChil = false;

  constructor(private apiService: APIService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.siteId = this.route.snapshot.params['id'];
    this.bindToListDestinations();
  }

  bindToSite() {
    const arraySites = this.listSite.filter(item => item._id === this.siteId);
    this.site = arraySites[0];
    this.bindToListBackground();
    this.bindToListAriclde();
  }

  bindToListAriclde() {
    this.apiService.get([END_POINT.articles]).subscribe(item => {
      this.listArticle = item;
      this.filteListArticle();
      this.sortArticleByRating();
      this.filterTopfour();
    });
  }

  filteListArticle() {
    this.listArticle = this.listArticle.filter(item => {
      return item.siteId === this.siteId;
    });
  }

  bindToListBackground() {
    this.listBackground = this.site.listPicture.map(item => {
      return {
        name: null,
        backgroundImg: item
      };
    });
  }

  bindToListDestinations() {
    this.apiService.get([END_POINT.destinations]).subscribe(item => {
      this.listDestinations = item;
      this.bindToListSite();
    });
  }

  bindToListSite() {
    this.apiService.get([END_POINT.sites]).subscribe(item => {
      this.listSite = item;
      this.bindToSite();
      this.bindToListDestinationsChil(this.listDestinations);
    });
  }

  bindToListDestinationsChil(destinations) {
    this.listDestinationsChil = destinations.filter(item => {
      this.findParent(item.siteId);
      return this.isChil;
    });
    this.sortDesChilByRating();
    this.filterTopThree();
  }

  findParent(siteId) {
    this.isChil = false;
    this.listSite.map((item) => {
      if (siteId === item._id) {
        if (item.parentId) {
          this.findParent(item.parentId);
        } else {
          if (item._id === this.site._id) {
            this.isChil = true;
          }
        }
      }
    });
  }

  sortDesChilByRating() {
    this.listDestinationsChil.sort(this.compare);
  }

  sortArticleByRating() {
    this.listArticle.sort(this.compare);
  }


  filterTopThree() {
    this.listDestinationsChil = this.listDestinationsChil.filter((item, index) => {
      return index < 3;
    });
  }

  filterTopfour() {
    this.listArticle = this.listArticle.filter((item, index) => {
      return index < 4;
    });
  }

  compare(a, b) {
    const ratingA = a.rating;
    const ratingB = b.rating;

    let comparison = 0;
    if (ratingA < ratingB) {
      comparison = 1;
    } else if (ratingA > ratingB) {
      comparison = -1;
    }
    return comparison;
  }
}
