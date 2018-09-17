import { Component, Input, OnInit } from '@angular/core';
import { Site } from '../../model/site';

@Component({
  selector: 'app-card-site',
  templateUrl: './card-site.component.html'
})

export class CardSiteComponent implements OnInit {
  @Input() site: Site;
  url = 'http://localhost:3000/uploads/';

  ngOnInit() {}

  fetchUrl() {
    return this.url + this.site.backgroundImg;
  }
}
