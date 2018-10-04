import { Component, OnInit } from '@angular/core';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';
import { FormBuilder,
  Validators,
  FormGroup,
  FormControl } from '@angular/forms';
import { APIService } from '../../../share/service/api.service';
import { END_POINT } from '../../../share/service/api.registry';
import { PlansService } from '../../../share/service/plans.service';
import { CheckUserService } from '../../../share/service/check-user.service';
import { StorageService } from '../../../share/service/storage.service';

const KEY = 'token';
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
   animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('200ms ease-in-out')),
      transition('hide => show', animate('200ms ease-in'))
    ])
  ]
})

export class PlanComponent implements OnInit {
  successShow = false;
  formDate: FormGroup;
  startDate;
  endDate;
  listDate = [];
  listCategory;
  listSite;
  isSaveAllVisible;
  Listplans;
  user;
  token;
  isPlansVisible = false;
  isOpenForm = false;

  constructor(private fb: FormBuilder,
              private apiService: APIService,
              private plansService: PlansService,
              private checkUserService: CheckUserService,
              private storageService: StorageService) {}

  ngOnInit() {
    this.createForm();
    this.checkDate();
    this.bindToListCategory();
    this.bindToListSite();
    this.setToken();
    this.setUser();
    this.plansService.isSaveAllVisibleChange
    .subscribe(value => this.isSaveAllVisible = value);
    this.plansService.isFormOpen.subscribe(value => {
      this.isOpenForm = value;
      this.openForm();
    });
  }

  openForm() {
    this.successShow = true;
  }

  get success() {
    return this.successShow ? 'show' : 'hide';
  }

  createForm() {
    this.formDate = this.fb.group({
      start: ['', [Validators.required]],
      end: [{value: '', disabled : true}]
    });
  }

  checkDate() {
    this.formDate.controls.start.valueChanges
    .subscribe(startDate => {
      this.startDate = new Date(startDate);
      this.formDate.controls['end'].enable();
    });

    this.formDate.controls.end.valueChanges
    .subscribe(endDate => {
      this.endDate = endDate;
      this.listDate = [];
      const _endDate = new Date(this.endDate);
      let _startDate = new Date(this.startDate);
      let count = 0;
      while (_startDate < _endDate) {
        if (count === 0) {
          _startDate = new Date(_startDate.setDate(_startDate.getDate()));
        } else {
          _startDate = new Date(_startDate.setDate(_startDate.getDate() + 1));
        }
        const date = `${_startDate.getMonth() + 1}/${_startDate.getDate()}/${_startDate.getFullYear()}`;
        this.listDate.push(date);
        count = 1;
      }
    });
  }

  bindToListCategory() {
    this.apiService.get([END_POINT.categorys]).subscribe(category => {
      this.listCategory = category;
    });
  }

  bindToListSite() {
    this.apiService.get([END_POINT.sites]).subscribe(sites => {
      this.listSite = sites;
    });
  }

  sendToServer() {
    const user = this.checkUserService.getUserInfo();
    const body = {
      userId: user._id,
      plans: this.plansService.getPlans()
    };
    this.apiService.post([END_POINT.plans], body)
    .subscribe(message => {
      console.log(message);
      this.plansService.updateListPlans(true);
    });
  }

  setUser() {
    this.apiService.getWithToken([END_POINT.auth, END_POINT.me], this.token)
    .subscribe(user => {
      this.user = user;
      this.bindToListPlans();
    });
  }

  setToken() {
    this.token = this.storageService.get(KEY);
  }

  bindToListPlans() {
    this.apiService.get([END_POINT.plans], this.user._id).subscribe(plans => {
      this.Listplans = plans;
    });
  }
}
