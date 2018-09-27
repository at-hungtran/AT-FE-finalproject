import { Component, OnInit } from '@angular/core';
import { APIService } from '../../share/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { END_POINT } from '../../share/service/api.registry';

@Component({
  selector: 'app-destinations-detail',
  templateUrl: './destinations-detail.component.html'
})

export class DestinationsDetailComponent implements OnInit {
  destination;
  desId;
  imgafetchUrl;
  listPicture;
  listSite;

  url = 'http://localhost:3000/uploads/';

  constructor(private apiService: APIService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.desId = this.route.snapshot.params['id'];
    this.setDestination();
  }

  setDestination() {
    this.apiService.get([END_POINT.destinations], this.desId).subscribe(des => {
      this.destination = des[0];
      this.bindToListPic();
    });
  }

  bindToListPic() {
    this.listPicture = this.destination.listPictures
    .map(picName => picName.name);
  }

  fetchUrl(picName) {
    return this.imgafetchUrl = this.url + picName;
  }

  bindToListSite() {
    this.apiService.get([END_POINT.sites]).subscribe(item => {
      this.listSite = item;
    });
  }

  findParent(siteId) {
    this.listSite.map((item) => {
      if (siteId === item._id) {
        if (item.parentId) {
          this.findParent(item.parentId);
        } else {
          if (item._id === this.destination.siteId) {
            //this.isChil = true;
          }
        }
      }
    });
  }
}
