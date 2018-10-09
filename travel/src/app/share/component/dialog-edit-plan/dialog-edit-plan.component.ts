import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { APIService } from '../../service/api.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { END_POINT } from '../../service/api.registry';
import { DialogService } from '../../service/dialog.service';
import { environment } from '../../../../environments/environment';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';
import { PlansService } from '../../service/plans.service';

@Component({
  selector: 'app-dialog-edit-plan',
  templateUrl: './dialog-edit-plan.component.html',
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

export class DiaLogEditPlanComponent implements OnInit, OnDestroy {
  active: boolean;
  myForm: FormGroup;
  listSitesNoParent;
  listSite2 = [];
  listResultSearch = [];
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
  listParent = [];
  listAddress = [];
  isEdit = false;
  listCategory;
  planId;
  planEdit;
  datePlanEdit;
  isVisibleDialogEdit = false;

  @Input() listPlans;
  @Input() listSites;
  @Input() listDestinations;

  constructor(private fb: FormBuilder,
              private apiService: APIService,
              private planService: PlansService,
              private dialogService: DialogService) {}

  data = {
    plans: []
  };

  ngOnInit() {
    this.bindToListCategory();
    this.setPlanEdit();
    this.bindToListSiteNoParent();
  }

  ngOnDestroy() {
    this.dialogService.setPlanEdit([], '', '');
  }

  createForm() {
    this.myForm = this.fb.group({
      plans: this.fb.array([])
    });
    this.bindData();
    this.setPlans();
  }

  bindData() {
    this.data.plans = this.planEdit.map((plan, index) => {
      this.siteIds.push('');
      this.categoryIds.push('');
      this.siteIds2.push('');
      this.term.push('');
      this.valueDes[index] = plan.destination;
      this.valueDesId[index] = plan.destinationId;
      return {
        destination: [plan.destination],
        startTime: [plan.startTime, [Validators.required]],
        endTime: [plan.endTime, [Validators.required]],
        site1: [''],
        site2: [''],
        caterogyId: [''],
        destinationId: [plan.destinationId],
        destiantionsAddress: [plan.destiantionsAddress],
        destinationSubget: [plan.destination, Validators.required]
      };
    });
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

  bindToListCategory() {
    this.apiService.get([END_POINT.categorys]).subscribe(category => {
      this.listCategory = category;
    });
  }

  setPlanEdit() {
    this.dialogService.plans.subscribe(plans => {
      if (plans.length) {
        this.planEdit = plans;
        this.isVisibleDialogEdit = true;
        this.datePlanEdit = this.dialogService.date;
        this.planId = this.dialogService.planId;
        this.createForm();
      }
    });
  }

  back() {
    this.isVisibleDialogEdit = false;
    this.dialogService.setIdPlan(this.planId);
  }

  bindToListSiteNoParent() {
    this.listSitesNoParent = this.listSites.filter(site => {
      return !site.parentId;
    });
  }

  @HostListener('click', ['$event'])
  onclick(event) {
    const className = 'wrap-dialog-edit-plan';
    if (event.target.className.split(' ')[0] === className) {
      this.isVisibleDialogEdit = false;
    }
  }

  getIndex(index) {
    this.indexInput = index;
    console.log(this.term[index]);
    this.subscribeDestinationsChange();
  }

  subscribeDestinationsChange() {
    let count = 0;
    this.myForm.controls.plans.valueChanges
    .subscribe(value => {
      const start = value[this.indexInput].startTime;
      const end = value[this.indexInput].endTime;

      const message = 'time end must greter than time start';
      const dialogName = 'notifi-info';
      if (start > end) {
        this.dialogService.openDialog(message, dialogName);
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

  showResult(index) {
    this.successShow[index] = true;
  }

  hideResult(index) {
    this.successShow[index] = false;
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
    return environment.img_url + imageName;
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

  SelectSiteOnChange(value, i) {
    this.siteIds.map((item, index) => {
      if (index === i) {
        this.siteIds[index] = value;
      }
    });
    this.bindToListSite2(value);
  }

  bindToListSite2(siteId) {
    this.listSite2 = this.listSites.filter(site => {
      return site.parentId === siteId;
    }, 0);
  }

  isFormValid = false;
  destination;
  choice(index, idDes, nameDes, addessDes) {
    this.listParent = [];
    this.myForm.controls.plans.value[index].destination = nameDes;
    this.myForm.controls.plans.value[index].destinationId = idDes;
    this.myForm.controls.plans.value[index].destiantionsAddress = addessDes;
    this.valueDes[index] = nameDes;
    this.valueDesId[index] = idDes;
    this.valueDesAddress[index] = addessDes;
    this.isFormValid = true;
    this.destination = this.listDestinations.filter(item => {
      return item._id === idDes;
    });

    this.listAddress = [];
    this.count = 0;
    this.findParentList(this.destination[0].siteId);
    this.dialogService.openDialog('you chose ' + nameDes, 'notifi-info');
  }

  count = 0;
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

  success() {
    return this.successShow ? 'show' : 'hide';
  }

  submit(myForm) {
    const dialogName = 'login-success';
    const message = 'update success';
    this.apiService.get([END_POINT.plans]).subscribe(plans => {
      let planAfterEdit = plans.filter(item => {
        return item._id === this.planId;
      });
      planAfterEdit[0].timeline = planAfterEdit[0].timeline.map(item => {
        if (item.date === this.datePlanEdit) {
          item.plans = myForm.value.plans;
        }
        return item;
      });
      const body = {
        timeline: planAfterEdit[0].timeline
      };
      this.apiService.put([END_POINT.plans], planAfterEdit[0]._id, body)
      .subscribe(value => {
        if (value) {
          this.dialogService.openDialog(message, dialogName);
          this.isVisibleDialogEdit = false;
          this.planService.updateListPlans(true);
        }
      });
    });
  }
}
