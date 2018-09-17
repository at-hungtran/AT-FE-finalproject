import { Component, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { APIService } from '../../share/service/api.service';
import { END_POINT } from '../../share/service/api.registry';
import { Site } from '../../share/model/site';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit, OnChanges {
  listSite: Site[];
  listBackground;

  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.bindToListSite();
  }

  ngOnChanges() {}

  bindToListSite() {
    this.apiService.get([END_POINT.sites]).subscribe((sites) => {
      this.listSite = sites;
      this.listSite = this.listSite.filter((site, index) =>
        !site.parentId && index <= 4
      );
      this.bindTolistBackGround();
    });
  }

  bindTolistBackGround() {
    this.listBackground = this.listSite.map(item => {
      return {
        name: item.name,
        backgroundImg: item.backgroundImg
      };
    });
  }
}
