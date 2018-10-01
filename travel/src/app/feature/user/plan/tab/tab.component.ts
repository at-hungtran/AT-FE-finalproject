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
import { PlansService } from '../../../../share/service/plans.service';

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
  listResultDisplay = [];
  successShow = [];
  term = [];
  valueDes = [''];
  valueDesId = [''];
  isFromVisible = true;
  listPlans = [];
  listParent = [];

  @Input() listSite;
  @Input() listCategory;
  @Input() tabtitle;
  url = 'http://localhost:3000/uploads/';

  constructor(private tabs: TabsComponent,
              private fb: FormBuilder,
              private apiService: APIService,
              private plansService: PlansService) {}

  data = {
    plans: [
      {
        destination: [''],
        startTime: [''],
        endTime: [''],
        site1: [''],
        site2: [''],
        caterogyId: [''],
        destinationId: ['']
      }
    ]
  };

  ngOnInit() {
    this.successShow[0] = false;
    this.tabs.addTab(this);
    this.createForm();
    this.bindToListSiteNoParent();
    this.bindToListDestinations();
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
        destination: plan.destination,
        startTime: plan.startTime,
        endTime: plan.endTime,
        site1: plan.site1,
        site2: plan.site2,
        caterogyId: plan.caterogyId,
        destinationId: plan.destinationId
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
    this.valueDes.push('');
    this.valueDesId.push('');
    const control = <FormArray>this.myForm.controls.plans;
    control.push(
      this.fb.group({
        destination: [''],
        startTime: [''],
        endTime: [''],
        site1: [''],
        site2: [''],
        caterogyId: [''],
        destinationId: [''],
      })
    );
  }

  submit(myForm) {
    this.isFromVisible = false;
    this.plansService.bindToPlans(myForm.value);
    this.setListPlans();
  }

  setListPlans() {
    this.listPlans = this.plansService.getPlans()
    .filter(item => {
      if (item.date === this.tabtitle) {
        return item.plans;
      }
    });
    this.listPlans = this.listPlans[0].plans;
  }

  changeVanityId() {}

  bindToListSiteNoParent() {
    this.listSitesNoParent = this.listSite.filter(site => {
      return !site.parentId;
    });
  }

  bindToListDestinations() {
    this.apiService.get([END_POINT.destinations])
    .subscribe(des => {
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
      this.term[this.indexInput] = value[this.indexInput].destination;
      if (this.term[this.indexInput]) {
        this.bindToListResultSearch(value, this.indexInput);
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
    if (this.listResultSearch.length) {
      this.showResult(indexInput);
    } else {
      this.hideResult(indexInput);
    }
    if (value[this.indexInput].destination) {
      this.showResult(indexInput);
    } else {
      this.hideResult(indexInput);
    }
    this.bindToListResultDisplay();
  }

  bindToListResultDisplay() {
    this.listResultDisplay[this.indexInput] = [];
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

  destination;
  choice(index, idDes, nameDes) {
    this.listParent = [];
    this.myForm.controls.plans.value[index].destination = nameDes;
    this.myForm.controls.plans.value[index].destinationId = idDes;
    this.valueDes[index] = nameDes;
    this.valueDesId[index] = idDes;

    this.destination = this.listDestinations.filter(item => {
      return item._id === idDes;
    });

    this.findParentList(this.destination[0].siteId);
  }
  count = 0;
  findParentList(siteId) {
    this.listSite.map((item, index) => {
      if (this.count === 0) {
        this.listParent.push(siteId);
        this.count++;
      }
      if (siteId === item._id) {
        if (item.parentId) {
          this.listParent.push(item.parentId);
          this.findParentList(item.parentId);
        } else {
          return 0;
        }
      }
    });
  }
}
