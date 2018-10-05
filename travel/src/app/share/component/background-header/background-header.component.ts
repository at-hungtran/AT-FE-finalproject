import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Site } from '../../model/site';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header-background',
  templateUrl: './background-header.component.html'
})

export class BackgroundHeaderComponent implements OnInit, OnChanges {
  @Input() site;

  ngOnInit() {
  }

  ngOnChanges() {
    this.fetchUrl();
  }

  fetchUrl() {
    if (this.site.backgroundImg) {
      return environment.img_url + this.site.backgroundImg;
    } else {
      return '../../../assets/images/bg-article.jpg';
    }
  }
}
