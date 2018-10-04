import { Component, Input, OnInit } from '@angular/core';
import { Site } from '../../model/site';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-card-site',
  templateUrl: './card-site.component.html'
})

export class CardSiteComponent implements OnInit {
  @Input() site: Site;

  ngOnInit() {}

  fetchUrl() {
    return environment.img_url + this.site.backgroundImg;
  }
}
