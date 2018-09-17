import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

import { APIService } from '../../share/service/api.service';
import { END_POINT } from '../../share/service/api.registry';
import { Site } from '../../share/model/site';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html'
})

export class SiteComponent implements OnInit {
  site: Site;
  siteId: String;
  listBackground;

  constructor(private apiService: APIService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.bindToSite();
  }

  bindToSite() {
    this.route.params.subscribe(param => {
      this.siteId = param.id;
      this.apiService.get([END_POINT.sites], this.siteId).subscribe(item => {
        this.site = item;
        this.bindToListBackground();
      });
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
}
