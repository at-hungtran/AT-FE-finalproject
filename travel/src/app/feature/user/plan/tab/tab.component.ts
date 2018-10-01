import { Component, OnInit, Input } from '@angular/core';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';

import { TabsComponent } from '../tabs/tabs.component';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { APIService } from '../../../../share/service/api.service';
import { END_POINT } from '../../../../share/service/api.registry';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
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

export class TabComponent implements OnInit {
  active: boolean;
  color: string;
  colorTitle = '#5e6d81';
  myForm: FormGroup;
  listSitesNoParent;
  listSite2 = [];
  listResultSearch = [];
  listDestinations = [];
  parentId;
  siteIds = [''];
  siteIds2 = [''];
  categoryIds = [''];
  indexInput;
  listResultDisplay = [''];
  successShow = [];
  term = [];

  @Input() listSite;
  @Input() listCategory;
  @Input() tabtitle: string;
  url = 'http://localhost:3000/uploads/';

  constructor(private tabs: TabsComponent,
              private fb: FormBuilder,
              private apiService: APIService) {}

  data = {
    plans: [
      {
        destianton: [''],
        startTime: [''],
        endTime: [''],
        site1: [''],
        site2: [''],
        caterogyId: ['']
      }
    ]
  };

  ngOnInit() {
    this.successShow[0] = false;
    this.tabs.addTab(this);
    this.createForm();
    this.bindToListSiteNoParent();
    this.bindToListDestinations();
    //this.subscribeDestinationsChange();
  }

  SelectSiteOnChange(value, i) {
    this.siteIds.map((item, index) => {
      if (index === i) {
        this.siteIds[index] = value;
      }
    });
    this.bindToListSite2(value);
  }

  bindToListSite2(siteId) {
    this.listSite2 = this.listSite.filter(site => {
      return site.parentId === siteId;
    }, 0);
  }

  SelectCategoryOnChange(value, i) {
    this.categoryIds.map((item, index) => {
      if (index === i) {
        this.categoryIds[index] = value;
      }
    });
  }

  SelectSite2OnChange(value, i) {
    this.siteIds2.map((item, index) => {
      if (index === i) {
        this.siteIds2[index] = value;
      }
    });
  }

  createForm() {
    this.myForm = this.fb.group({
      date: this.tabtitle,
      plans: this.fb.array([])
    });
    this.setPlans();
  }

  setPlans() {
    const control = <FormArray>this.myForm.controls.plans;
    this.data.plans.forEach(plan => {
      control.push(this.fb.group({
        destianton: plan.destianton,
        startTime: plan.startTime,
        endTime: plan.endTime,
        site1: plan.site1,
        site2: plan.site2,
        caterogyId: plan.caterogyId
      }));
    });
  }

  deletePlan(index) {
    if (index > 0) {
      const control = <FormArray>this.myForm.controls.plans;
      control.removeAt(index);
    }
  }

  addNewPlan() {
    this.term.push('');
    this.successShow.push(false);
    this.siteIds.push('');
    this.siteIds2.push('');
    this.categoryIds.push('');
    this.listResultSearch.push('');
    this.listResultDisplay.push('');
    const control = <FormArray>this.myForm.controls.plans;
    control.push(
      this.fb.group({
        destianton: [''],
        startTime: [''],
        endTime: [''],
        site1: [''],
        site2: [''],
        caterogyId: ['']
      })
    );
  }

  submit() {
    console.log(this.myForm.value);
  }

  changeVanityId() {}

  bindToListSiteNoParent() {
    this.listSitesNoParent = this.listSite.filter(site => {
      return !site.parentId;
    });
  }

  bindToListDestinations() {
    this.apiService.get([END_POINT.destinations]).subscribe(des => {
      this.listDestinations = des;
    });
  }

  getIndex(index) {
    this.indexInput = index;
    this.subscribeDestinationsChange();
  }

  subscribeDestinationsChange() {
    this.myForm.controls.plans.valueChanges
    .subscribe(value => {
      this.term[this.indexInput] = value[this.indexInput].destianton;
      if (this.term) {
        this.bindToListResultSearch(value, this.indexInput);
      } else {
        this.listResultSearch[this.indexInput].length = 0;
      }
    });
  }

  bindToListResultSearch(value, indexInput) {
    this.listResultSearch[indexInput] = this.listDestinations
    .filter(item => {
      this.findParent(item.siteId);
      if (this.categoryIds[indexInput] === ''
          && this.siteIds[indexInput] === '') {
        return item;
      } else if (this.categoryIds[indexInput] === ''
                && this.siteIds2[indexInput] === ''
                && this.siteIds[indexInput] !== '') {
        return (this.siteIds[indexInput] === this.parentId);
      } else if (this.categoryIds[indexInput] === ''
                && this.siteIds2[indexInput] !== ''
                && this.siteIds[indexInput] !== '') {
        return (item.siteId === this.siteIds2[indexInput]);
      } else if (this.categoryIds[indexInput] !== ''
                && this.siteIds2[indexInput] !== ''
                && this.siteIds[indexInput] !== '') {
        return (item.siteId === this.siteIds2[indexInput])
                && (item.categoryId === this.categoryIds[indexInput]);
      } else if (this.categoryIds[indexInput] !== ''
                && this.siteIds2[indexInput] === ''
                && this.siteIds[indexInput] !== '') {
        return (item.categoryId === this.categoryIds[indexInput])
                && (this.siteIds[indexInput] === this.parentId);
      } else if (this.categoryIds[indexInput] !== ''
                && this.siteIds[indexInput] === '') {
        return (item.categoryId === this.categoryIds[indexInput]);
      }
    });
    console.log('result', this.listResultSearch);
    if (this.listResultSearch.length) {
      this.showResult(indexInput);
    } else {
      this.hideResult(indexInput);
    }
    if (value[this.indexInput].destianton) {
      this.showResult(indexInput);
    } else {
      this.hideResult(indexInput);
    }
    this.bindToListResultDisplay();
  }

  bindToListResultDisplay() {
    this.listResultSearch.map((item, index) => {
      if (item.length) {
        this.listResultDisplay[index] = item.map(des => {
          const imageName = des.listPictures[0].name;
          return {
            image: this.fetchUrl(imageName),
            name: des.name,
            address: des.address,
            site: des.sites[0].name,
            destinationId: des._id
          };
        });
      }
    });
    console.log('display', this.listResultDisplay);
  }

  fetchUrl(imageName) {
    return this.url + imageName;
  }

  findParent(siteId) {
    this.listSite.map((item) => {
      if (siteId === item._id) {
        if (item.parentId) {
          this.findParent(item.parentId);
        } else {
          this.parentId = siteId;
        }
      }
    });
  }

  success() {
    return this.successShow ? 'show' : 'hide';
  }

  showResult(index) {
    this.successShow[index] = true;
  }

  hideResult(index) {
    this.successShow[index] = false;
  }
}
