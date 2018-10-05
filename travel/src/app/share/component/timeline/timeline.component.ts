import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { APIService } from '../../service/api.service';
import { END_POINT } from '../../service/api.registry';
import { ActivatedRoute } from '@angular/router';
import { CheckUserService } from '../../service/check-user.service';
import { StorageService } from '../../service/storage.service';
import { PlansService } from '../../service/plans.service';
import { environment } from '../../../../environments/environment';

const KEY = 'token';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
})

export class TimeLine implements OnInit {
  Listplans;
  listDestinations;
  listSites;
  user;
  token;
  avatarDefault = '../../../../assets/images/default-avt.jpg';

  constructor(private apiService: APIService,
              private route: ActivatedRoute,
              private checkUserService: CheckUserService,
              private storageService: StorageService,
              private planService: PlansService) {}

  ngOnInit() {
    this.setToken();
    this.setUser();
    this.binToListDestinations();
    this.binToListSite();
    this.planService.isListPlansUpdate.subscribe(value => {
      if (value) {
        this.bindToListPlans();
      }
    });
  }

  bindToListPlans() {
    this.apiService.get([END_POINT.plans], this.user._id).subscribe(plans => {
      this.Listplans = plans;
    });
  }

  binToListDestinations() {
    this.apiService.get([END_POINT.destinations]).subscribe(des => {
      this.listDestinations = des;
    });
  }

  binToListSite() {
    this.apiService.get([END_POINT.sites]).subscribe(sites => {
      this.listSites = sites;
    });
  }

  setToken() {
    this.token = this.storageService.get(KEY);
  }

  setUser() {
    this.apiService.getWithToken([END_POINT.auth, END_POINT.me], this.token)
    .subscribe(user => {
      this.user = user;
      this.bindToListPlans();
    });
  }

  listAddress = [];
  count = 0;
  getFullAddressBySiteId(desId) {
    let fullAddress = '';
    this.listAddress = [];
    this.count = 0;
    let siteId;
    this.listDestinations.map(des => {
      if (des._id === desId) {
        siteId = des.siteId;
      }
    });
    this.findParentList(siteId);

    this.listAddress.map((site, index) => {
      if (index + 1 === this.listAddress.length) {
        fullAddress += site;
      } else {
        fullAddress += site + '-';
      }
    });

    return fullAddress;
  }

  findParentList(siteId) {
    this.listSites.map((item, index) => {
      if (this.count === 0) {
        this.listAddress.push(this.getAddressById(siteId));
        this.count++;
      }
      if (siteId === item._id) {
        if (item.parentId) {
          this.listAddress.push(this.getAddressById(item.parentId));
          this.findParentList(item.parentId);
        } else {
          return 0;
        }
      }
    });
  }

  getAddressById(siteId) {
    const siteName = this.listSites.filter(item =>
      item._id === siteId
    ).map(item => item.name);
    return siteName;
  }

  findPictureByDesId(desId) {
    let destination;
    this.listDestinations.map(des => {
      if (des._id === desId) {
        destination = des;
      }
    });
    return this.fetchUrlPicDes(destination.listPictures[0].name);
  }

  fetchUrlPicDes(pictureName) {
    return environment.img_url + pictureName;
  }

  fetchUrl() {
    if (this.user.avatar) {
      return environment.img_url + this.user.avatar;
    }
    return this.avatarDefault;
  }

  findCategoryById(desId) {
    let category;
    this.listDestinations.map(des => {
      if (des._id === desId) {
        category = des.categorys[0].name;
      }
    });

    return category;
  }

  openForm() {
    this.planService.openForm(true);
  }
}
