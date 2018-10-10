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
    this.bindToListDes();
  }

  bindToListDes() {
    const body = {
      name : this.search
    };
    this.api.post([END_POINT.search], body).subscribe(item => {
      this.listDestinations = item;
    })
  }
}
