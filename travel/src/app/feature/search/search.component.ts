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
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('300ms ease-in-out')),
      transition('hide => show', animate('300ms ease-in'))
    ])
  ]
})

export class PageSearchComponent implements OnInit {
  search;
  listDestinations;
  constructor(private api: APIService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.search = this.route.snapshot.params['str'];
    let arrStr = this.search.split('&');

    if(arrStr.length === 2) {
      if(arrStr[1].indexOf('site') >= 0) {
        let arrStr1 = arrStr[1].split('site');
        let siteId = arrStr1[1];
        const body = {
          name: arrStr[0],
          site: siteId
        }
        this.bindToListDes(body);
      } else {
        let arrStr2 = arrStr[1].split('cate');
        let cateId = arrStr2[1];
        const body = {
          name: arrStr[0],
          category: cateId
        }
        this.bindToListDes(body);
      }
    } else if (arrStr.length === 3) {
      let arrStr1 = arrStr[1].split('site');
      let arrStr2 = arrStr[2].split('cate');
      const body = {
        name: arrStr[0],
        site: arrStr1[1],
        category: arrStr2[1]
      }
      this.bindToListDes(body);
    } else {
      const body = {
        name: arrStr[0]
      }
      this.bindToListDes(body);
    }
  }

  bindToListDes(body) {
    this.api.post([END_POINT.search], body).subscribe(item => {
      this.listDestinations = item;
    })
  }
}
