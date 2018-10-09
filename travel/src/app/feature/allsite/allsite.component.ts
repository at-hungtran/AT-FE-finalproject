import { Component, OnInit } from '@angular/core';
import { Site } from '../../share/model/site';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';
import { APIService } from '../../share/service/api.service';
import { END_POINT } from '../../share/service/api.registry';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './allsite.component.html',
  selector: 'app-allsite',
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

export class AllSiteComponent implements OnInit {
  listSites;
  listBackground;
  term;
  formSearch: FormGroup;
  listeSiteSearch;
  state = false;
  constructor(private api: APIService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.bindToListSite();
    this.createForm();
    this.suggetSearch();
  }

  bindToListSite() {
    this.api.get([END_POINT.sites]).subscribe((item) => {
      this.listSites = item;
      this.listeSiteSearch = item;
      this.listSites = this.listSites.filter((site, index) => {
        return site.backgroundImg !== '';
      });
      this.bindTolistBackGround();
    })
  }

  bindTolistBackGround() {
    this.listBackground = this.listSites.map(item => {
      return {
        name: item.name,
        backgroundImg: item.backgroundImg
      };
    });
  }
  
  createForm() {
    this.formSearch = this.fb.group({
      site: [''],
    });
  }

  suggetSearch() {
    this.formSearch.controls.site.valueChanges
    .subscribe((value) => {
      if (value) {
        this.term = value;
        this.state = true;
      } else {
        this.state = false;
      }
    })
  }
}
