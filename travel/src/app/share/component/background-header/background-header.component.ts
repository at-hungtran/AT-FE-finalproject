import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Site } from '../../model/site';

@Component({
  selector: 'app-header-background',
  templateUrl: './background-header.component.html'
})

export class BackgroundHeaderComponent implements OnInit, OnChanges {
  @Input() site: Site;
  url = 'http://localhost:3000/uploads/';

  ngOnInit() {}

  ngOnChanges() {
    this.fetchUrl();
  }

  fetchUrl() {
    if (this.site) {
      return  this.url + this.site.backgroundImg;
    }
  }
}
