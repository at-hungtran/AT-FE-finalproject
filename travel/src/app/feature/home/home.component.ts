import { Component, OnInit } from '@angular/core';
import { APIService } from '../../share/service/api.service';
import { END_POINT } from '../../share/service/api.registry';
import { Site } from '../../share/model/site';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  listSite: Site[];

  constructor(private apiService: APIService) {}

  ngOnInit() {
    //this.bindListSite();
  }

  bindListSite() {
    this.apiService.get([END_POINT.sites]).subscribe((site) => {
      this.listSite = site;
    });
  }
}
