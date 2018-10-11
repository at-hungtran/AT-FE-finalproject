import { Component, OnInit } from '@angular/core';
import { APIService } from '../../share/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { END_POINT } from '../../share/service/api.registry';
import { environment } from '../../../environments/environment';
import { DialogService } from '../../share/service/dialog.service';

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
  listParent = [];

  constructor(private apiService: APIService,
              private route: ActivatedRoute,
              private dialogService: DialogService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.desId = this.route.snapshot.params['id'];
    this.setDestination();
    this.bindToListSite();
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
    return this.imgafetchUrl = environment.img_url + picName;
  }

  bindToListSite() {
    this.apiService.get([END_POINT.sites]).subscribe(item => {
      this.listSite = item;
      this.bindToListParent();
    });
  }

  bindToListParent() {
    this.listParent.push(this.destination.siteId);
    this.findParent(this.destination.siteId);
  }

  findParent(siteId) {
    this.listSite.map((item, index) => {
      if (index === 0) {
        //this.listParent.push(siteId);
      }
      if (siteId === item._id) {
        if (item.parentId) {
          this.listParent.push(item.parentId);
          this.findParent(item.parentId);
        } else {
          if (item._id === this.destination.siteId) {
            this.listParent.push(item._id);
            return 0;
          }
        }
      }
    });
  }

  openDialog(picture) {
    const dislogName = 'dialog-picture';
    this.dialogService.openDialog('', dislogName, picture);
  }
}
