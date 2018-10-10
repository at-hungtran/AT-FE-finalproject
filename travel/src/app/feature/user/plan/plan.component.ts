import { Component, OnInit } from '@angular/core';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';
import { FormBuilder,
  Validators,
  FormGroup } from '@angular/forms';
import { APIService } from '../../../share/service/api.service';
import { END_POINT } from '../../../share/service/api.registry';
import { PlansService } from '../../../share/service/plans.service';
import { CheckUserService } from '../../../share/service/check-user.service';
import { StorageService } from '../../../share/service/storage.service';
import { DialogService } from '../../../share/service/dialog.service';

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
  isSaveAllVisible = false;
  Listplans = [];
  user;
  token;
  isPlansVisible = false;
  isOpenForm = false;
  isShowPlan = false;
  isValid = false;
  isResetForm = false;

  constructor(private fb: FormBuilder,
              private apiService: APIService,
              private plansService: PlansService,
              private checkUserService: CheckUserService,
              private storageService: StorageService,
              private dialogService: DialogService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.createForm();
    this.checkDate();
    this.bindToListCategory();
    this.bindToListSite();
    this.setToken();
    this.setUser();

    this.plansService.saveAllSuccess(false);
    this.plansService.openForm(false);

    this.plansService.isSaveAllVisibleChange
    .subscribe(value => {
      this.isSaveAllVisible = value;
    });

    this.plansService.isFormOpen.subscribe(value => {
      this.isOpenForm = value;
      this.isShowPlan = true;
      this.successShow = true;
    });

    this.plansService.isListPlansUpdate.subscribe(value => {
      if (value) {
        this.bindToListPlans();
      }
    });
  }

  openForm() {
    this.isOpenForm = true;
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
      if (startDate) {
        this.startDate = startDate;
        this.formDate.controls['end'].enable();
      }
    });

    this.formDate.controls.end.valueChanges
    .subscribe(endDate => {
      if (endDate) {
        this.endDate = endDate;
        this.isValid = false;
        const _endDate = new Date(this.endDate);
        let _startDate = new Date(this.startDate);

        const startDateConver = `${_startDate.getMonth() + 1}/${_startDate.getDate()}/${_startDate.getFullYear()}`;
        const endDateConver = `${_endDate.getMonth() + 1}/${_endDate.getDate()}/${_endDate.getFullYear()}`;

        if (startDateConver === endDateConver) {
          this.listDate = [];
          _startDate = new Date(_startDate.setDate(_startDate.getDate()));
          const date = `${_startDate.getMonth() + 1}/${_startDate.getDate()}/${_startDate.getFullYear()}`;
          this.listDate.push(date);
        } else if (_startDate > _endDate) {
          this.dialogService.openDialog('date end must greater than date start', 'notifi-info');
        } else {
          this.listDate = [];
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
        }
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
    const dialogName = 'login-success';
    const message = 'create success';
    const user = this.checkUserService.getUserInfo();
    this.plansService.saveAllSuccess(false);
    this.formDate.reset();
    this.formDate.controls['end'].disable();
    const body = {
      userId: user._id,
      plans: this.plansService.getPlans()
    };
    this.apiService.post([END_POINT.plans], body)
    .subscribe(res => {
      if (res) {
        this.dialogService.openDialog(message, dialogName);
        this.plansService.updateListPlans(true);
        this.plansService.resetListPlans();
        this.listDate = [];
        this.endDate = '';
        this.startDate = '';
        this.isShowPlan = false;
      }
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

  closeCreatePlan() {
    this.isOpenForm = false;
    this.listDate.length = 0;
    this.formDate.reset();
  }
}
