import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Destination } from '../../model/destination';
import { APIService } from '../../service/api.service';
import { END_POINT } from '../../service/api.registry';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-card-destination',
  templateUrl: './card-destination.component.html'
})

export class CardComponent implements OnChanges, OnInit {
  indexColor = 0;

  colorRandom: string;
  colorArray = ['#ffd205', '#14b9d5', '#f76570', '#1bbc9b'];

  constructor(private apiService: APIService) {}

  @Input() destination: Destination;
  imgafetchUrl;
  siteId;
  listSiteId = [];
  parentSite;

  ngOnChanges() {
    console.log('card des', this.destination);
    this.siteId = this.destination.siteId;
    this.fetchUrl();
    this.setListSite();
  }

  ngOnInit() {
    this.randomColor();
  }

  fetchUrl() {
    this.imgafetchUrl = environment.img_url + this.destination.listPictures[0].name;
  }

  randomColor() {
    this.indexColor = Math.floor(Math.random() * 4);
  }

  getColor() {
    const color = this.colorArray[this.indexColor];
    return color;
  }

  setListSite() {
    this.apiService.get([END_POINT.sites], this.siteId).subscribe(site => {
      if (site.parentId) {
        this.siteId = site.parentId;
        this.setListSite();
        this.listSiteId.push(this.siteId);
      } else {
        this.setParent(this.listSiteId[this.listSiteId.length - 1]);
      }
    });
  }

  setParent(parentId) {
    this.apiService.get([END_POINT.sites], parentId).subscribe(site => {
      this.parentSite = site;
    });
  }
}
