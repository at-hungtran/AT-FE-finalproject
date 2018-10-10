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
          site: siteId
        };
        this.bindToListDes(body);
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
      const body = {
        name: arrStr[0],
        site: arrStr1[1],
        category: arrStr2[1]
      };
      this.bindToListDes(body);
    } else {
      const body = {
        name: arrStr[0]
      };
      this.bindToListDes(body);
    }
  }

  bindToListDes(body) {
    console.log('bind');
    this.api.post([END_POINT.search], body).subscribe(item => {
      this.listDestinations = item;
      console.log('list des', this.listDestinations);
    });
  }
}
