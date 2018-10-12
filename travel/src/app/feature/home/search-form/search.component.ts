import { Component, OnInit, Input } from '@angular/core';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';

import { APIService } from '../../../share/service/api.service';
import { END_POINT } from '../../../share/service/api.registry';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CloseSearchService } from '../../../share/service/close-search.service';
import { environment } from '../../../../environments/environment';
import { DialogService } from '../../../share/service/dialog.service';
import { Router } from '@angular/router';
import { SearchService } from '../../../share/service/search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
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

export class SearchComponent implements OnInit {
  @Input() listSites;
  @Input() listDestinations;

  listCategorys;
  formSearch: FormGroup;
  categoryId;
  siteId;
  listResultSearch = [];
  listResultDisplay = [];
  parentId;
  listSitesNoParent;
  successShow = false;
  isShowMessage = false;
  term;
  destinationInput;
  valueOb = new Subject<string>();

  constructor(private apiService: APIService,
              private fb: FormBuilder,
              private closeSearchService: CloseSearchService,
              private dialog: DialogService,
              private router: Router,
              private searchService: SearchService) {}

  ngOnInit() {
    this.bindToListCategory();
    this.createForm();
    this.suggestionsSearch();
    this.bindToListSiteNoParent();
    this.closeSearchService.newIsClose.subscribe(value => {
      this.successShow = value;
    });
    this.setTerm();
  }

  get success() {
    return this.successShow ? 'show' : 'hide';
  }

  createForm() {
    this.formSearch = this.fb.group({
      destination: [''],
      site: [''],
      category: [''],
    });
  }

  bindToListCategory() {
    this.apiService.get([END_POINT.categorys]).subscribe(item => {
      this.listCategorys = item;
    });
  }

  search() {
    this.categoryId = this.formSearch.controls.category.value;
    this.siteId = this.formSearch.controls.site.value;
    this.destinationInput = this.formSearch.controls.destination.value;
    if (!this.destinationInput) {
      this.dialog.openDialog('You must enter key word', 'login-error');
    } else {
      if (!this.siteId && !this.categoryId) {
        const str = `search/${this.destinationInput}`;
        this.router.navigate([str]);
      }
      if (this.siteId && !this.categoryId) {
        const str = `search/${this.destinationInput}&site${this.siteId}`;
        this.router.navigate([str]);
      }
      if (!this.siteId && this.categoryId) {
        const str = `search/${this.destinationInput}&cate${this.categoryId}`;
        this.router.navigate([str]);
      }
      if (this.siteId && this.categoryId) {
        const str = `search/${this.destinationInput}&site${this.siteId}&cate${this.categoryId}`;
        this.router.navigate([str]);
      }
    }
  }

  suggestionsSearch() {
    this.formSearch.controls.destination.valueChanges
    .subscribe((value = '') => {
      this.siteId = this.formSearch.controls.site.value;
      this.categoryId = this.formSearch.controls.category.value;
      if (value) {
        this.bindToListResultSearch(value, this.siteId);
      } else {
        this.listResultSearch.length = 0;
      }
      if (this.listResultSearch.length) {
        this.showResult();
      } else {
        this.hideResult();
      }
      if (value) {
        this.showResult();
      } else {
        this.hideResult();
      }
      this.bindToListResultDisplay();
    });
  }

  bindToListResultSearch(value, siteId) {
    this.valueOb.next(value);
    this.searchService.search(this.valueOb, this.categoryId).subscribe(listDestination => {
      this.listResultSearch = listDestination;
      if (this.formSearch.controls.site.value) {
        this.listResultSearch = this.listResultSearch.filter(item => {
          this.findParent(item.siteId);
          return this.formSearch.controls.site.value === this.parentId;
        });
      }
      this.bindToListResultDisplay();
    });
  }

  bindToListResultDisplay() {
    if (this.listResultSearch.length) {
      this.listResultDisplay = this.listResultSearch.map(item => {
        const imageName = item.listPictures[0].name;
        return {
          image: this.fetchUrl(imageName),
          name: item.name,
          address: item.address,
          site: item.sites[0].name,
          destinationId: item._id
        };
      });
    } else {
      this.listResultDisplay.length = 0;
    }
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

  bindToListSiteNoParent() {
    this.listSitesNoParent = this.listSites.filter(site => {
      return !site.parentId;
    });
  }

  setTerm() {
    this.formSearch.controls.destination.valueChanges.subscribe(des => {
      this.term = des;
    });
  }

  fetchUrl(imageName) {
    return environment.img_url + imageName;
  }

  showResult() {
    this.successShow = true;
  }

  hideResult() {
    this.successShow = false;
  }
}
