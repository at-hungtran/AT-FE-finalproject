import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';

import { TabsComponent } from '../tabs/tabs.component';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { APIService } from '../../../../share/service/api.service';
import { END_POINT } from '../../../../share/service/api.registry';
import { PlansService } from '../../../../share/service/plans.service';
import { DialogService } from '../../../../share/service/dialog.service';

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

export class TabComponent implements OnInit, OnDestroy {
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
  valueDesAddress = [''];
  isFromVisible = true;
  listPlans = [];
  listParent = [];
  listAddress = [];
  isEdit = false;
  suggetVisible = [false];

  @Input() listSite;
  @Input() listCategory;
  @Input() tabtitle;
  url = 'http://localhost:3000/uploads/';

  constructor(private tabs: TabsComponent,
              private fb: FormBuilder,
              private apiService: APIService,
              private plansService: PlansService,
              private dialogService: DialogService) {}

  data = {
    plans: [
      {
        destination: [''],
        startTime: ['', [Validators.required]],
        endTime: ['', [Validators.required]],
        site1: [''],
        site2: [''],
        caterogyId: [''],
        destinationId: [''],
        destiantionsAddress: [''],
        destinationSubget: [{value: '', disabled : true}, Validators.required]
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

  ngOnDestroy() {
    this.tabs.removeTab();
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
        destinationId: plan.destinationId,
        destiantionsAddress: plan.destiantionsAddress,
        destinationSubget: plan.destinationSubget
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
    this.valueDesAddress.push('');
    this.suggetVisible.push(false);
    this.suggetVisible.map(item => item = false);
    const control = <FormArray>this.myForm.controls.plans;
    control.push(
      this.fb.group({
        destination: [''],
        startTime: ['', [Validators.required]],
        endTime: ['', [Validators.required]],
        site1: [''],
        site2: [''],
        caterogyId: [''],
        destinationId: [''],
        destiantionsAddress: [''],
        destinationSubget: [{value: '', disabled : true}, Validators.required]
      })
    );
  }

  submit(myForm) {
    let isValid = true;
    myForm.get('plans').controls.map((form, index) => {
      const destinationsIdValue = this.myForm.controls.plans['controls'][index].value.destinationId;
      if (!destinationsIdValue) {
        isValid = false;
      }
    });
    if (isValid) {
      this.isFromVisible = false;
      if (!this.isEdit) {
        this.plansService.bindToPlans(myForm.value);
      } else {
        const listPlans = this.plansService.getPlans().map(plan => {
          if (plan.date === this.tabtitle) {
            return plan = myForm.value;
          }
          return plan;
        });
        this.plansService.resetListPlans();
        this.plansService.setToPlans(listPlans);
      }
      this.bindListPlans();
      const FormArrayLength = this.plansService.getPlans().length;
      if (FormArrayLength === this.tabs.tabs.length) {
        this.plansService.saveAllSuccess(true);
      }
    } else {
      const message = 'you must choice destination';
      const dialogName = 'login-error';
      this.dialogService.openDialog(message, dialogName);
    }
  }

  bindListPlans() {
    this.listPlans = this.plansService.getPlans()
    .filter(item => {
      if (item.date === this.tabtitle) {
        return item.plans;
      }
    });
    this.listPlans = this.listPlans[0].plans;
  }

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
    this.suggetVisible[this.indexInput] = true;
    let count = 0;
    this.myForm.controls.plans.valueChanges
    .subscribe(value => {
      const start = value[this.indexInput].startTime;
      const end = value[this.indexInput].endTime;

      if (start > end) {
        this.dialogService.openDialog('time end must greter than time start', 'notifi-info');
      } else {
        if (start && end && count === 0) {
          count++;
          this.myForm.controls.plans['controls'][this.indexInput]
          .controls['destinationSubget'].enable();
        }
      }

      this.term[this.indexInput] = value[this.indexInput].destinationSubget;
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

  isFormValid = false;
  destination;
  choice(index, idDes, nameDes, addessDes) {
    const dialogName = 'notifi-info';
    const message = 'create success';
    this.listParent = [];
    this.myForm.controls.plans.value[index].destination = nameDes;
    this.myForm.controls.plans.value[index].destinationId = idDes;
    this.myForm.controls.plans.value[index].destiantionsAddress = addessDes;
    this.valueDes[index] = nameDes;
    this.valueDesId[index] = idDes;
    this.valueDesAddress[index] = addessDes;
    this.isFormValid = true;
    this.suggetVisible[index] = false;
    this.destination = this.listDestinations.filter(item => {
      return item._id === idDes;
    });
    this.dialogService.openDialog('you chose ' + nameDes, dialogName);
    this.listAddress = [];
    this.count = 0;
    this.findParentList(this.destination[0].siteId);
  }

  count = 0;
  findParentList(siteId) {
    this.listSite.map((item, index) => {
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
    const siteName = this.listSite.filter(item =>
      item._id === siteId
    ).map(item => item.name);
    return siteName;
  }

  edit() {
    this.isEdit = true;
    this.isFromVisible = true;
    this.plansService.saveAllSuccess(false);
  }
}
