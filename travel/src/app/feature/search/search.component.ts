import { Component, OnInit } from '@angular/core';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';
import { APIService } from '../../share/service/api.service';
import { END_POINT } from '../../share/service/api.registry';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-page-search',
  templateUrl: './search.component.html',
})

export class PageSearchComponent implements OnInit {
  search;
  listDestinations;
  listDestinationsRaw;
  listDestinationsDisplay;
  listSites;
  parentId;

  constructor(private api: APIService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.search = this.route.snapshot.params['str'];
    this.setCondition();
  }

  setCondition() {
    const arrStr = this.search.split('&');
    if (arrStr.length === 2) {
      if (arrStr[1].indexOf('site') >= 0) {
        const arrStr1 = arrStr[1].split('site');
        const siteId = arrStr1[1];
        const body = {
          name: arrStr[0],
        };
        this.bindToListSite(body, siteId);
      } else {
        const arrStr2 = arrStr[1].split('cate');
        const cateId = arrStr2[1];
        const body = {
          name: arrStr[0],
          category: cateId
        };
        this.bindToListDes(body);
      }
    } else if (arrStr.length === 3) {
      const arrStr1 = arrStr[1].split('site');
      const arrStr2 = arrStr[2].split('cate');
      const siteId = arrStr1[1];
      const body = {
        name: arrStr[0],
        category: arrStr2[1]
      };
      this.bindToListSite(body, siteId);
    } else {
      const body = {
        name: arrStr[0]
      };
      this.bindToListDes(body, 'nocondition');
    }
  }

  bindToListSite(body, siteId) {
    this.api.get([END_POINT.sites]).subscribe(site => {
      this.listSites = site;
      this.bindToListDestinationRaw(body, siteId);
    });
  }

  bindToListDestinationRaw(body, siteId) {
    this.listDestinationsRaw = [];
    this.api.post([END_POINT.search], body).subscribe(des => {
      this.listDestinationsRaw = des;
      console.log(this.listDestinationsRaw);
      this.bindToListDestinationsDisplay(siteId);
    });
  }

  bindToListDestinationsDisplay(siteId) {
    this.listDestinationsRaw = this.listDestinationsRaw.filter(item => {
      this.findParent(item.siteId);
      return this.parentId === siteId;
    });
    this.listDestinations = this.converDestinationToDisplay(this.listDestinationsRaw);
  }

  findParent(siteId) {
    this.listSites.map((item) => {
      if (siteId === item._id) {
        if (item.parentId) {
          this.findParent(item.parentId);
        } else {
          this.parentId = siteId;
        }
      }
    });
  }

  bindToListDes(body, state?) {
    this.api.post([END_POINT.search], body).subscribe(destinations => {
      if (state === 'nocondition') {
        this.listDestinations = destinations;
      } else {
        this.listDestinations = this.converDestinationToDisplay(destinations);
      }
    });
  }

  converDestinationToDisplay(listDestinations) {
    return listDestinations.map(item => {
      return {
        address: item.address,
        categoryId: item.categoryId,
        categorys: [{
          description: item.categorys.description,
          name: item.categorys.name,
          _id: item.categorys._id,
        }],
        sites: [{
          parentId: item.sites[0].parentId,
          _id: item.sites[0]._id,
          name: item.sites[0].name
        }],
        description: item.description,
        listPictures: item.listPictures,
        name: item.name,
        rating: item.rating,
        siteId: item.siteId,
      };
    });
  }
}
